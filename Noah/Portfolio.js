//https://codepen.io/html5andblog/pen/ZLraQY
//https://codepen.io/bradtraversy/pen/xBdyzr
//https://codepen.io/AElkhodary/pen/zYYwBpX
//https://codepen.io/abdulrazakshaikh/pen/aaeBBm

//https://kuon.space/?ref=hackernoon.com#reile
//https://moonfarmer.com
//https://www.titusklein.com/?ref=hackernoon.com

// Option 2 - jQuery Smooth Scrolling
// $('.navbar a').on('click', function (e) {
//   if (this.hash !== '') {
//     e.preventDefault();
//
 //    const hash = this.hash;
//
//     $('html, body')
 //      .animate({
//        scrollTop: $(hash).offset().top
//      },800);
// }
 //});



 var _window = window,Splitting = _window.Splitting,ScrollOut = _window.ScrollOut;
Splitting();
ScrollOut({
  targets: '.word',
  scrollingElement: '.page' });