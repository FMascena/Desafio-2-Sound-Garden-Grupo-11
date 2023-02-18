// Banner rotativo de fundo com imagens referentes á eventos

var imgArray = ["img/banner-1.png", "img/banner-2.png", 'img/banner-3.png']
var curIndex = 0
var imgDuration = 3000

function slideShow() {
  document.getElementById('banner').src = imgArray[curIndex]
  curIndex++
  if (curIndex == imgArray.length) {
    curIndex = 0
  }
  setTimeout('slideShow()', imgDuration)
}
slideShow()