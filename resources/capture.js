var restpress = require('restpress');
var spawn = require('child_process').spawn;
var tmp = require('tmp');
var fs = require('fs');
var path = require('path');

// Resource actions
var actions = {
  "dom" : { 
    "route" : '/dom',
    "method" : 'post'
  },
};

var phantomjsPath = path.resolve(__dirname, '../node_modules/phantomjs/bin');
var casperjsPath = path.resolve(__dirname, '../node_modules/casperjs/bin');

process.env.PATH = process.env.PATH + ':' + phantomjsPath;
process.env.PATH = process.env.PATH + ':' + casperjsPath;

var capture = new restpress('capture', actions);

capture.dom(function(req, res) {
  tmp.file({
            prefix: 'capture-', 
            postfix: '.png'
          },
          function _tmpCreated(err, path, fd, cleanupCallback) {
            if (err) {
              return res.json(err);
            }

            var w = fs.createWriteStream(path);
            var format = (req.body.format || 'PNG').toUpperCase();
            var quality = req.body.quality || 100;
            var wait = req.body.wait || 1500;
            var cmdParams = [__dirname + '/caspercmd.js',
                        '--url=' + req.body.url,
                        '--width=' + req.body.width,
                        '--height=' + req.body.height,
                        '--dom=' + req.body.dom,
                        '--wait=' + wait,
                        '--filename=' + path,
                        '--format=' + format,
                        '--quality=' + quality]; 
            var ls = spawn(__dirname + '/../node_modules/casperjs/bin/casperjs',
                           cmdParams);
            ls.on('close', function(code) {
              var stat = fs.statSync(path);

              res.writeHead(200, {
                'Content-Type': 'image/' + format.toLowerCase(),
                'Content-Length': stat.size
              });
              var r = fs.createReadStream(path);
              r.pipe(res);

              // Tmp file not needed anymore
              cleanupCallback();
            });
          }
        );
});

module.exports = capture;