
import nacl from 'tweetnacljs'

var EXPORTKEYDATASUFFIX = "b1dade301beb7e1a6973f9938792007b";

function CryptoWorker() {
	this.keys = {}
};

function u8a2hex(u8a) { 
  return Array.prototype.map.call(u8a, x => ('00' + x.toString(16)).slice(-2)).join('');
}

function merge(a,b) {
  var res = new UInt8Array(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c
}

function packUserKeys(keys,pass) {
  var nonce = nacl.randomBytes( nacl.secretbox.nonceLength )
  var ciphered = nacl.secretbox( merge( keys.sign.privateKey, keys.cipher.privateKey ), nonce, secretKey )
  var signedMsg = nacl.sign( merge( cipher.publicKey, ciphered ), keys.sign.privateKey )
	self.postMessage( { data: u8a2b64( merge( sign.publcKey, signedMsg ) ) };
}

function unpackPublicKeys(b64s) {
  var pubKeys = b642u8a(b64s)
  return [ pubKeys.slice(0,nacl.sign.publicKeyLength), pubKeys.slice(nacl.sign.publicKeyLength) ]
}

function unpackPrivateKeys(b64s, secretKey) {
  var blob = b642u8a(b64s)
  var nonce = blob.slice(0,nacl.secretbox.nonceLength)
  var privs = nacl.secretbox.open(blob.slice(nacl.secretbox.nonceLength),nonce,secretKey)
  return [ privs.slice(0,nacl.sign.privateKeyLength), privs.slice(nacl.sign.privateKeyLength) ]
}

CryptoWorker.prototype.hashKeyPassword = function(password) {
	return nacl.hash(password+":key").slice(0,nacl.secretbox.keyLength)
}

CryptoWorker.prototype.generateUserKey = function(username, password, end){
  this.keys.sign = nacl.sign.keyPair()
  this.keys.cipher = nacl.box.keyPair()
	var secretKey = this.hashKeyPassword(password)
	return { data: packUserKeys( this.keys, secretKey ) }
};

CryptoWorker.prototype.hashLoginPassword = function(username,password) {
	return { data: u8a2hex(password + ":" + username + ":login") }
};

CryptoWorker.prototype.setUserKey = function(password, storeToken, keys) {
	var secretKey = this.hashKeyPassword(password);
  this.keys = { sign: {}, cipher: {} }
  var pub = unpackPublicKeys( keys.publicKeys )
  this.keys.sign.publicKey = pub[0]
  this.keys.cipher.publicKey = pub[1]
  var privs = unpackPrivateKeys( keys.privateKeys, secretKey )  
  this.keys.sign.privateKey =  privs[0]
  this.keys.cipher.privateKey = privs[1]
	return { data: packUserKeys( this.keys, storeToken.slice(0,nacl.secretbox.keyLength) }
}

CryptoWorker.prototype.loadUserKeyFromStore = function ( token, storeData ) {
	var secretKey = token.slice(0,nacl.secretbox.keyLength);
  this.keys = { sign: {}, cipher: {} }
  var blob = b642u8a( storeData )
  this.keys.sign.publcKey = blob.slice(0,nacl.sign.publicKeyLength)
  blob = blob.slice(nacl.sign.publicKeyLength)
  blob = nacl.sign.open( blob, this.keys.sign.publicKey )
  this.keys.cipher.publicKey = blob.slice(0,nacl.box.publicKeyLength)
  blob = blob.slice(nacl.box.publicKeyLength)
  var privs = unpackPrivateKeys( keys.privateKeys, secretKey )  
  this.keys.sign.privateKey =  privs[0]
  this.keys.cipher.privateKey = privs[1]
	return { data: true };
}

CryptoWorker.prototype.generateVaultKey = function( admins ) {
  var keys = {
    sign: nacl.sign.keyPair()
    cipher: nacl.box.keyPair()
  }
	var pubKey = u8a2b64( nacl.sign( merge( keys.sign.publicKey, keys.cipher.publicKey ) ), this.keys.sign.privateKey )
  var privKeys = merge( keys.sign.privateKey, keys.cipher.privateKey )
	var userKeys = {};
	for( uid in admins ) {
		var userPubKey = admins[uid].slice(nacl.sign.publicKeyLength);
    var nonce = nacl.randomBytes( nacl.box.nonceLength )
		var ciphered = nacl.box(privKeys,nonce,userPubKey,keys.cipher.privateKey)
		userKeys[uid] = u8a2b64( nacl.sign( merge( nonce, ciphered ), keys.sign.privateKey ) )
	}
	return { data: { public: pubKey, keys; userKeys } };
}

CryptoWorker.prototype.cipherVaultKeysForUser = function( vaultKeys, userPublicKey ){
	var userPubKey = b642u8a( userPublicKey ).slice(nacl.sign.publicKey)
	var userVaultKeys = {};
	for( var vid in vaultKeys ) {
    var vaultPubKey = vaultKeys[kid].publicKey.slice(nacl.sign.publicKeyLength);
    var ciphered = vaultKeys[kid].privateKeys;
    var nonce = ciphered.slice(0,nacl.box.nonceLength )
    ciphered = ciphered.slice(nacl.box.nonceLength)
    var vaultPrivKeys = nacl.box.open(ciphered,nonce,vaultPubKey,this.keys.cipher.privateKey)
    //TODO: Here: check who's who public and private keys are needed
    var nonce = nacl.randomBytes( nacl.box.nonceLength )
		var ciphered = nacl.box(vaultPrivKeys,nonce,userPubKey,vaultPrivKeys.slice(nacl.sign.privateKeyLength))
		userVaultKeys[uid] = u8a2b64( nacl.sign( merge( nonce, ciphered ), vaultPrivKeys.slice(0,nacl.sign.privateKeyLength))a)
	};
	return { data : userVaultKeys };
};

CryptoWorker.prototype.md5Hash = function( data ){
	return { data: "" };
};

//HERE

CryptoWorker.prototype.generateKeyStub = function( h_pass ) {
	var clear_armor = this.key.armor();
	var c_key = self.openpgp.key.readArmored( clear_armor ).keys[0];
	c_key.encrypt( h_pass );
	return JSON.stringify({ 
		public : c_key.toPublic().armor(),
		private: c_key.armor()
	});
}


CryptoWorker.prototype.passwordChange = function( username, new_pass ) {
	var h_pass = this.hashKeyPassword(new_pass);
	if ( !this.keys ) {
		return { error: "No keys loaded in the crypto worker" };
	}
	var stub = this.generateKeyStub(h_pass);
	var signed_keys = packByteStrings([stub, this.keys.sign.sign(stub)]);
	return { data : {
			keysign: signed_keys,
			hashedPass: this.hashLoginPassword( username, new_pass ).data,
		} };
}

CryptoWorker.prototype.exportKeys = function( username ) {
	var h_pass = this.hashKeyPassword(username + EXPORTKEYDATASUFFIX );
	return { data: this.generateKeyStub( h_pass ) }
}

var cryptoWk = new CryptoWorker();

self.addEventListener('message', function(e) {
	console.log( "GOT MESSAGE IN WORKER", e.data );
	try {
		var data = e.data;
		switch( data.cmd ) {
			case CryptoCmd.GEN_KEY:
				cryptoWk.generateUserKey( data.username, data.password );
				break;
			case CryptoCmd.HASH_PASS:
				self.postMessage( cryptoWk.hashLoginPassword( data.username, data.password ) );
				break;
			case CryptoCmd.SET_KEY:
				self.postMessage( cryptoWk.setUserKey( data.password, data.store_token, data.keys ) );
				break;
			case CryptoCmd.LOAD_KEY_FROM_STORE:
				self.postMessage( cryptoWk.loadUserKeyFromStore( data.token, data.data ) );
				break;
			case CryptoCmd.GEN_PROJECT_KEY:
				self.postMessage( cryptoWk.generateProjectKey( data.admins ) );
				break;
			case CryptoCmd.CIPHER_KEYS_FOR_USER:
				self.postMessage( cryptoWk.cipherKeysForUser( data.keys, data.public_key ) );
				break;
			case CryptoCmd.MD5_HASH:
				self.postMessage( cryptoWk.md5Hash( data.data ) );
				break;
			case CryptoCmd.PASS_CHANGE:
				self.postMessage( cryptoWk.passwordChange( data.username, data.password ) );
				break;
			case CryptoCmd.EXPORT:
				self.postMessage( cryptoWk.exportKeys( data.username ) );
				break;
			default:
				self.postMessage( { error: "Unknown command " + data.cmd } );
		}
	} catch (e) {
		console.log( "Worker error. Stack:", e.stack );
		self.postMessage( { cmd: data.cmd, error: e.toString() } )
		 
	}
});
