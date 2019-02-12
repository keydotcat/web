import cmds from './commands'
import KeyMgr from '@/commonjs/crypto/key_mgr'

var runner = new KeyMgr()

self.addEventListener('message', async function(e) {
  try {
    var data = e.data
    switch (data.cmd) {
      case cmds.GEN_KEY:
        self.postMessage(await runner.generateUserKeys(data.username, data.password))
        break
      case cmds.HASH_PASS:
        self.postMessage(await runner.hashLoginPassword(data.username, data.password))
        break
      case cmds.LOAD_KEY_FROM_SERVER:
        self.postMessage(await runner.setKeysFromServer(data.password, data.storeToken, data.srvKeys))
        break
      case cmds.LOAD_KEY_FROM_STORE:
        self.postMessage(await runner.setKeysFromStore(data.storedKeys, data.storeToken))
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
      case cmds.SERIALIZE_AND_CLOSE:
        self.postMessage(runner.serializeAndClose(data.vaultKeys, data.obj))
        break
      case cmds.OPEN_AND_DESERIALIZE:
        self.postMessage(runner.openAndDeserialize(data.vaultKeys, data.data))
        break
      case cmds.OPEN_AND_DESERIALIZE_BULK:
        self.postMessage(runner.openAndDeserializeBulk(data.vsa))
        break
      case cmds.CLOSE_KEYS_WITH_PASSWORD:
        self.postMessage(await runner.closeKeysWithPassword(data.username, data.password))
        break
      default:
        self.postMessage({ error: 'Unknown command ' + data.cmd })
    }
  } catch (e) {
    console.log('Worker error. Stack:', e.stack)
    self.postMessage({ cmd: data.cmd, error: e.toString() })
  }
})
