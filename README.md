# DOMCapture

Service to capture dom element in a web page as an image using [phantomjs](http://phantomjs.org/) headless browser.

Setup
-----

1. Download (& unzip) or clone this repo.
2. Run `npm install` to install dependent libraries, including phantomjs.
3. Run `npm start` to run the server.

Service Endpoint
----------------
```
POST /capture/dom/
```
Parameters

|Name|Description|Example Value|
|----|-----------|------------|
|**url** |The url of the web page| http://bl.ocks.org/mbostock/4063269 |
|**width** |View port width| 960 |
|**height** |View port height| 960 |
|**dom** |DOM selector| iframe |
|*format* |Image format| png (Default) \| jpg |
|*quality* |image quality, from 1 to 100| 100 (Default) |
|*wait* |Milliseconds to wait for page render| 1500 (Default) |


#### Sample cURL request ####
```
curl -o capture.png -H "Content-Type: application/json" -X POST -d '{"url" : "http://eyeseast.github.io/visible-data/2013/08/28/responsive-charts-with-d3/","width" : 375,"height": 667,"dom" : "svg"}' http://127.0.0.1:3000/capture/dom
```

Usecases
--------
* Capture SVGs as PNGs to render on older browsers.
* Capture live graphics at regular intervals and generate animated gifs.

![U.S. 2014 Midterm Elections](http://graphics.wsj.com/midterm-election-2014-animations/video/house.gif)

* Generate twitter cards.

License
-------

[MIT](LICENSE)