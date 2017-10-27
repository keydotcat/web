import cmds from './commands'
import nacl from 'tweetnacl'
import util from 'tweetnacl-util'

class CryptoWorker {
  constructor () {
    this.keys = { sign: {}, cipher: {} }
  }
  generateUserKeys (username, password) {
    console.log(nacl)
    this.keys.sign = nacl.sign.keyPair()
    this.keys.cipher = nacl.box.keyPair()
    return { data: util.encodeBase64(this.keys.sign.publicKey) }
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
      default:
        self.postMessage({ error: 'Unknown command ' + data.cmd })
    }
  } catch (e) {
    console.log('Worker error. Stack:', e.stack)
    self.postMessage({ cmd: data.cmd, error: e.toString() })
  }
})
