import cmds from './commands'
import nacl from 'tweetnacl'
import util from 'tweetnacl-util'

function merge (a, b) {
  var c = new Uint8Array(a.length + b.length)
  c.set(a)
  c.set(b, a.length)
  return c
}

function keyPassword (keys, password) {
  var bPass = util.decodeUTF8(password)
  return nacl.hash(merge(keys.sign.publicKey, bPass)).substring(0, nacl.secretbox.keyLength)
}

function loginPassword (username, password) {
  var bUser = util.decodeUTF8(username)
  var bPass = util.decodeUTF8(password)
  return util.encodeBase64(nacl.hash(merge(bUser, bPass)))
}

// signPub + sign( cipherPub ) + sign( nonce + secretbox( signPriv + cipherPriv ) )
function closeKeysAndPack (keys, bKey) {
  var nonce = nacl.getRandomBytes(nacl.secretbox.nonceLength)
  var closedPrivate = merge(nonce, nacl.secretbox(merge(keys.sign.secretKey, keys.cipher.secretKey), nonce, bKey))
  var signedClosedPrivate = nacl.sin(closedPrivate, keys.sign.secretKey)
  var stub = merge(nacl.sign(keys.cipher.publicKey, keys.sign.secretKey), signedClosedPrivate)
  return util.encodeBase64(stub)
}

// publickKeys is signPub + sign( cipherPub )
// secretKeys is sign( nonce + secretbox( signPriv + cipherPriv ) )
function unpackAndOpenKeys (srvKeys, password) {
  var keys = {
    sign: {
      publicKey: srvKeys.publicKeys.slice(0, nacl.sign.publicKeyLength)
    },
    cipher: {}
  }
  keys.cipher.publicKey = nacl.sign.open(srvKeys.publicKeys.slice(nacl.sign.publicKeyLength), keys.sign.publicKey)
  if (keys.cipher.publicKey === null) {
    return null
  }
  var verified = nacl.sign.open(srvKeys.secretKeys, keys.sign.publicKey)
  if (verified === null) {
    return null
  }
  keys.cipher.publicKey = verified.slice(0, nacl.box.publicKeyLength)
  var bKey = keyPassword(keys, password)
  var nonce = verified.slice(0, nacl.secretbox.nonceLength)
  var opened = nacl.secretbox.open(verified.slice(nacl.secretbox.nonceLength), nonce, bKey)
  if (opened == null) {
    return null
  }
  keys.sign.secretKey = opened.slice(0, nacl.sign.secretKeyLength)
  keys.cipher.secretKey = opened.slice(nacl.sign.secretKeyLength)
  if (keys.cipher.secretKey.length !== nacl.box.secretKeyLength) {
    return null
  }
  return keys
}

function unpackPublicKeys (publicStub) {
  var keys = {
    sign: publicStub.slice(0, nacl.sign.publicKeyLength)
  }
  keys.cipher = nacl.sign.open(publicStub.slice(nacl.sign.publicKeyLength), keys.sign)
  if (keys.cipher === null) {
    return null
  }
  return keys
}

function unpackAndOpenVaultKeys (vCKeys, userKeys) {
  var vKeys = {
    sign: { publicKey: vCKeys.publicKeys.slice(0, nacl.sign.publicKeyLength) },
    cipher: {}
  }
  vKeys.cipher.publicKey = nacl.sign.open(vCKeys.publicKeys.slice(nacl.sign.publicKeyLength), vKeys.sign.publicKey)
  if (vKeys.cipher.publicKey === null) {
    return null
  }
  var verified = nacl.sign.open(vCKeys.secretKeys, vKeys.sign.publicKey)
  if (verified === null) {
    return null
  }
  var nonce = verified.slice(0, nacl.secretbox.nonceLength)
  var opened = nacl.box.open(verified.slice(nacl.secretbox.nonceLength), nonce, vKeys.cipher.publicKey, userKeys.cipher.secretKey)
  if (opened == null) {
    return null
  }
  vKeys.sign.secretKey = opened.slice(0, nacl.sign.secretKeyLength)
  vKeys.cipher.secretKey = opened.slice(nacl.sign.secretKeyLength)
  if (vKeys.cipher.secretKey.length !== nacl.box.secretKeyLength) {
    return null
  }
  return vKeys
}

class CryptoWorker {
  constructor () {
    this.keys = { sign: {}, cipher: {} }
  }
  generateUserKeys (username, password) {
    this.keys.sign = nacl.sign.keyPair()
    this.keys.cipher = nacl.box.keyPair()
    var bKey = keyPassword(this.keys, password)
    return {
      data: {
        keys: closeKeysAndPack(this.keys, bKey),
        password: loginPassword(username, password)
      }
    }
  }
  hashLoginPassword (username, password) {
    return { data: loginPassword(username, password) }
  }
  setKeysFromServer (password, storeToken, srvKeys) {
    this.keys = unpackAndOpenKeys(srvKeys, password)
    if (this.keys == null) {
      return { error: 'cannot_open_keys' }
    }
    var bToken = util.decodeUTF8(storeToken).slice(0, nacl.secretbox.keyLength)
    return { data: closeKeysAndPack(this.keys, bToken) }
  }
  setKeysFromStore (storedKeys, storeToken) {
    var bKeys = util.decodeBase64(storedKeys)
    var sep = nacl.sign.publicKeyLength + nacl.sign.signatureLength + nacl.box.publicKeyLength
    var keys = {
      publicKeys: bKeys.slice(0, sep),
      secretKeys: bKeys.slice(sep)
    }
    var bToken = util.decodeUTF8(storeToken).slice(0, nacl.secretbox.keyLength)
    this.keys = unpackAndOpenKeys(keys, bToken)
    if (this.keys == null) {
      return { error: 'cannot_open_keys' }
    }
    return { data: true }
  }
  generateVaultKeys (admins) {
    var vaultKeys = { sign: {}, cipher: {} }
    vaultKeys.sign = nacl.sign.keyPair()
    vaultKeys.cipher = nacl.box.keyPair()
    var secretStub = merge(vaultKeys.sign.secretKey, vaultKeys.cipher.secretKey)
    var signedCipherPubKey = nacl.sign(vaultKeys.cipher.publicKey, nacl.sign.secretKey)
    var data = {
      publicKey: util.encodeBase64(nacl.sign(merge(vaultKeys.sign.publicKey, signedCipherPubKey), this.keys.sign.secretKey)),
      keys: {}
    }
    for (var uname in admins) {
      var pubKeys = unpackPublicKeys(admins[uname])
      var nonce = nacl.getRandomBytes(nacl.box.nonceLength)
      var closed = nacl.box(secretStub, nonce, pubKeys.cipher, vaultKeys.cipher.publicKey)
      data.keys[uname] = util.encodeBase64(nacl.sign(merge(nonce, closed)))
    }
    return { data: data }
  }
  cipherKeysForUser (vaultClosedKeys, userPubKeys) {
    var pubKeys = unpackPublicKeys(userPubKeys)
    var data = {}
    for (var vid in vaultClosedKeys) {
      var vaultKeys = unpackAndOpenVaultKeys(vaultClosedKeys[vid], this.keys)
      var secretStub = merge(vaultKeys.sign.secretKey, vaultKeys.cipher.secretKey)
      var nonce = nacl.getRandomBytes(nacl.box.nonceLength)
      var closed = nacl.box(secretStub, nonce, pubKeys.cipher, vaultKeys.cipher.publicKey)
      data[vid] = util.encodeBase64(nacl.sign(merge(nonce, closed)))
    }
    return {data: data}
  }
  passwordChange (password) {
    var bKey = keyPassword(this.keys, password)
    return { data: closeKeysAndPack(this.keys, bKey) }
  }
}
var runner = new CryptoWorker()

self.addEventListener('message', function (e) {
  try {
    var data = e.data
    switch (data.cmd) {
      case cmds.GEN_KEY:
        self.postMessage(runner.generateUserKeys(data.username, data.password))
        break
      case cmds.HASH_PASS:
        self.postMessage(runner.hashLoginPassword(data.username, data.password))
        break
      case cmds.LOAD_KEY_FROM_SERVER:
        self.postMessage(runner.setKeysFromServer(data.password, data.storeToken, data.srvKeys))
        break
      case cmds.LOAD_KEY_FROM_STORE:
        self.postMessage(runner.setKeysFromStore(data.storedKeys, data.storeToken))
        break
      case cmds.GEN_VAULT_KEY:
        self.postMessage(runner.generateVaultKeys(data.admins))
        break
      case cmds.CIPHER_KEYS_FOR_USER:
        self.postMessage(runner.cipherKeysForUser(data.vaultKeys, data.userPublicKeys))
        break
      case cmds.PASSWORD_CHANGE:
        self.postMessage(runner.passwordChange(data.password))
        break
      default:
        self.postMessage({ error: 'Unknown command ' + data.cmd })
    }
  } catch (e) {
    console.log('Worker error. Stack:', e.stack)
    self.postMessage({ cmd: data.cmd, error: e.toString() })
  }
})
