var casper = require('casper').create();
var utils = require('utils');

var url = casper.cli.get('url');
var dom = casper.cli.get('dom');
var width = casper.cli.get('width');
var height = casper.cli.get('height');
var outFile = casper.cli.get('filename');
var wait = (casper.cli.has('wait')) ? casper.cli.get('wait') : 1500;
var format = (casper.cli.has('format')) ? casper.cli.get('format') : 'png';
var quality = (casper.cli.has('quality')) ? casper.cli.get('quality') : 100;


casper.start(url,
            function() {
                casper.viewport(width, height);
				casper.wait(wait);
                if (this.exists(dom)) {
					casper.then(function() {
					this.captureSelector(outFile, 
										dom,
										{
											format: format,
											quality: quality
										}
										);
					});
                }
            });

casper.run();
