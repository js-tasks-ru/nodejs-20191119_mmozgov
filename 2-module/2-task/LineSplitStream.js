const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.data = '';
  }

  _transform(chunk, encoding, callback) {
    this.data += chunk;
    let list = this.data.split(/\n/);
    this.data = list.pop();
    for (let i = 0; i < list.length; i++) {
      this.push(list[i]);
    }
    callback(null)
  }

  _flush(callback) {
    if (this.data) { this.push(this.data) }
    callback(null);
  }
}

module.exports = LineSplitStream;
