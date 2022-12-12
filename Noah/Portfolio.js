//https://stackoverflow.com/questions/44846614/trigger-css-animations-in-javascript
//https://codersblock.com/blog/creating-glow-effects-with-css/


function TextChange(text) {
    document.getElementById("BeginText").innerText = text;
}


TextChange("Hallo")

var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
  