const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.dataRead = 0;
  }

  _transform(chunk, encoding, callback) {
    this.dataRead += chunk.length;

    if (this.dataRead <= this.limit) {
      this.push(chunk);
      callback(null);
    } else {
      callback(new LimitExceededError);
    }
  }
}

module.exports = LimitSizeStream;
