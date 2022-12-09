//https://stackoverflow.com/questions/44846614/trigger-css-animations-in-javascript
//https://codersblock.com/blog/creating-glow-effects-with-css/


function TextChange(text) {
    document.getElementById("BeginText").style.animation = "Begintext 5s 5s forward";
    document.getElementById("BeginText").innerHTML = text;
}

function EindText() {
    document.getElementsByClassName("PortfolioBubble").style.animation = "box-shadow-color 10s infinite linear";
}
EindText()

TextChange(Hallo)
document.getElementById("BeginText").innerHTML = "hello";