"use strict";

var CryptoCmd = require("./crypto_commands.js" );

class CryptoMgr {
	constructor() {
		this.wkr = new Worker( gCryptoWorkerFile );
		this.promise_queue = [];
		var self = this;
		this.wkr.onmessage = function(e) {
			console.log( "GOT MSG", e );
			if( self.promise_queue < 1 ) {
				console.log( "GOT CRAP", e );
				return;
			}
			var p = self.promise_queue.shift();
			var payload = e.data;
			if( payload.data != null ) {
				p.resolve(payload.data);
			} else {
				p.reject(payload);
			}
		}
	}

	newTask( cmd, data ){
		var self = this;
		return new Promise( function(resolveFunc,rejectFunc) {
			try {
				self.promise_queue.push( { cmd: cmd, resolve: resolveFunc, reject: rejectFunc } );

				var task = {};
				for( var k in data ) {
					task[k] = data[k];
				}
				task.cmd = cmd;
				self.wkr.postMessage( task );
			} catch (e) {
				console.log( "ERROR", e );
			}
		});

	}

	generateUserKey(password) {
		return this.newTask( CryptoCmd.GEN_KEY, { password: password } );
	}

	hashLoginPassword(username, password) {
		return this.newTask( CryptoCmd.HASH_PASS, { username: username, password: password } );
	}

	setKeys(password, store_token, keys){
		return this.newTask( CryptoCmd.SET_KEY, { password: password, store_token: store_token, keys: keys } )
	}

	generateProjectKey(admins) {
		return this.newTask( CryptoCmd.GEN_PROJECT_KEY, { admins: admins } )
	}

	cipherKeysForUser(ciphered_keys,public_key) {
		return this.newTask( CryptoCmd.CIPHER_KEYS_FOR_USER, { keys: ciphered_keys, public_key: public_key } )
	}

	loadKeysFromStore(store_token, store_data) {
		return this.newTask( CryptoCmd.LOAD_KEY_FROM_STORE, { token: store_token, data: store_data } )
	}

	md5Hash(data) {
		return this.newTask( CryptoCmd.MD5_HASH, { data: data } );
	}

	newPassword(username, new_pass) {
		return this.newTask( CryptoCmd.PASS_CHANGE, { username: username, password: new_pass } );
	}

	exportKeys(username) {
		return this.newTask( CryptoCmd.EXPORT, { username: username } );
	}
}

var cryptoMgr = new CryptoMgr()
window.CryptoMgr = cryptoMgr;

module.exports = cryptoMgr;

