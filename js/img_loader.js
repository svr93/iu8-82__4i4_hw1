function openImg() {
  'use strict';

  img = new Image();

  img.onload = function() {
    initialImgCtx.drawImage(this, 0, 0, this.width, this.height,
                                  0, 0, cnvWidth, cnvHeight);
  };

  img.src = this.value; // this == fileDialog
}
