(function() {

  /* to do:
    1) add window as a cross for alternative processing;
    2) add alternative processing without transparency channel;
    3) add skeletonize processing;
    4) display processing time;
  */

  'use strict';

  var RED = 0;
  var GREEN = 1;
  var BLUE = 2;
  var ALPHA = 3;

  var imgData = null;
  var imgArr = null;

  var windowArr = null;
  var windowArrLen = null;
  var centerElem = null;
  var shift = null;

  var initialTime = null;

  var pixelsComponentsInFullRows = null;
  var pos = null;

  window.processImg = function(windowSize) {
    initialTime = new Date();

    windowArr = new Array(windowSize);
    windowArrLen = windowSize;
    centerElem = windowArrLen / 2 | 0;

    imgData = initialImgCtx.getImageData(0, 0, cnvWidth, cnvHeight);
    imgArr = imgData.data;

    shift = Math.sqrt(windowArrLen) / 2 | 0;

    var upH = cnvHeight - shift;
    var upW = cnvWidth - shift;

    for (var row = shift; row < upH; ++row) {

      pixelsComponentsInFullRows = row * cnvWidth * 4;

      for (var col = shift; col < upW; ++col) {

        pos = pixelsComponentsInFullRows + col * 4;

        processComponent(row, col, RED);
        processComponent(row, col, GREEN);
        processComponent(row, col, BLUE);
        processComponent(row, col, ALPHA);
      }
    }

    processedImgCtx.putImageData(imgData, 0, 0);
    timeBlock.innerHTML = new Date() - initialTime;
  };

  function processComponent(row, col, k) {
    var count = 0;

    for (var i = row - shift; i <= row + shift; ++i) {
      for (var j = col - shift; j <= col + shift; ++j) {

        windowArr[count++] = imgArr[(i * cnvWidth + j) * 4 + k];
      }
    }

    windowArr.sort(sortFunc);

    imgArr[pos + k] = windowArr[centerElem];
  }

  function sortFunc(a, b) {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  }

}());
