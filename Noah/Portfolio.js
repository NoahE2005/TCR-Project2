//https://stackoverflow.com/questions/44846614/trigger-css-animations-in-javascript
//https://codersblock.com/blog/creating-glow-effects-with-css/

document.getElementById("TextChange").textContent = "he";

function TextChange(text) {
    document.getElementById('BeginText').style.color = "red";
    document.getElementById('BeginText').innerHTML = text;
}


TextChange("hello")
document.getElementById("BeginText").innerHTML = "hello";