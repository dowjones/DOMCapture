var debug = require('debug')('DOMCapture.app');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var capture = require('./resources/capture.js');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

capture.app(app);

app.get('/_health', function (req, res) {
    res.send('I am alive!!!');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    debug("Running development environment");
    app.use(function(err, req, res, next) {
        res.status(err.status || 403);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;