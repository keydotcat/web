var CryptoCmd = {
	GEN_KEY: "generate_key",
	HASH_PASS: "hash_password",
	SET_KEY: "set_key",
	LOAD_KEY_FROM_STORE: "set_key_from_store",
	GEN_PROJECT_KEY: "generate_project_key",
	CIPHER_KEYS_FOR_USER: "cipher_keys_for_user",
	MD5_HASH: "md5_hash",
	PASS_CHANGE: "pass_change",
	EXPORT: "export"
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = CryptoCmd;
} else {
	//HACK for openpgp in a web worker
 var window = self;
 delete FileReaderSync;
}
