const url = require('url');
const http = require('http');
const path = require('path');
const { createReadStream, existsSync } = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  const readFile = createReadStream(filepath);

  switch (req.method) {
    case 'GET':
      readFile.on('error', err => {
        let nesting = req.url.split('/');
        if (err.code === 'ENOENT') {
          if (nesting.length > 2) {
            res.statusCode = 400;
            res.write('Bad request');
            res.end();
          } else if (!existsSync(filepath)) {
            res.statusCode = 404;
            res.write('File not found');
            res.end();
          }

        } else {
          res.statusCode = 500;
          res.write('Internal Server Error');
          res.end();
        }
      })

          readFile.pipe(res).on('error', err => {
            res.statusCode = 500;
            console.log(`Write error ${err.message}`);
          });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
