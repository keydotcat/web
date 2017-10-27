import cmds from './commands'
/* eslint import/no-webpack-loader-syntax: off */
import Worker from 'worker-loader!./worker.js'

class Manager {
  constructor () {
    this.worker = new Worker()
    this.promise_queue = []
    var self = this
    this.worker.onmessage = function (e) {
      if (self.promise_queue < 1) {
        return
      }
      var p = self.promise_queue.shift()
      var payload = e.data
      if (payload.data != null) {
        p.resolve(payload.data)
      } else {
        p.reject(payload)
      }
    }
  }
  newTask (cmd, data) {
    var self = this
    return new Promise(function (resolve, reject) {
      try {
        self.promise_queue.push({ cmd: cmd, resolve: resolve, reject: reject })
        var task = {}
        for (var k in data) {
          task[k] = data[k]
        }
        task.cmd = cmd
        self.worker.postMessage(task)
      } catch (e) {
        console.log('ERROR', e)
      }
    })
  }
  generateUserKey (username, password) {
    return this.newTask(cmds.GEN_KEY, { username: username, password: password })
  }
}

export default new Manager()
