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

  var isSW = null;

  var windowArr = null;
  var windowArrLen = null;
  var centerElem = null;
  var shift = null;

  var initialTime = null;

  var pixelsComponentsInFullRows = null;
  var pos = null;

  window.processImg = function(isSquareWindow, windowSize) {
    initialTime = new Date();

    isSW = +isSquareWindow;

    windowArr = new Array(windowSize);
    windowArrLen = windowSize;
    centerElem = windowArrLen / 2 | 0;

    imgData = initialImgCtx.getImageData(0, 0, cnvWidth, cnvHeight);
    imgArr = imgData.data;

    shift = isSW ? Math.sqrt(windowArrLen) / 2 | 0 :
                   (windowArrLen - 1) / 4;

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

    var method = isSW ? 'square window' : 'cross window';

    timeBlock.innerHTML = 'Время обработки с использованием ' + method + ': ' +
    (new Date() - initialTime);

  };

  function processComponent(row, col, k) {
    var count = 0;

    if (isSW) {

      for (var i = row - shift; i <= row + shift; ++i) {
        for (var j = col - shift; j <= col + shift; ++j) {

          windowArr[count++] = imgArr[(i * cnvWidth + j) * 4 + k];
        }
      }

    } else {

      for (var i = row - shift; i <= row + shift; ++i) {
          windowArr[count++] = imgArr[(i * cnvWidth + col) * 4 + k];
      }
      for (var j = col - shift; j < col; ++j) {
          windowArr[count++] = imgArr[(row * cnvWidth + j) * 4 + k];
      }
      for (var j = col + 1; j <= col + shift; ++j) {
          windowArr[count++] = imgArr[(row * cnvWidth + j) * 4 + k];
      }

    }

    imgArr[pos + k] = getNthStat(windowArr, windowArrLen, centerElem);
  }

  function sortFunc(a, b) {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  }

}());
