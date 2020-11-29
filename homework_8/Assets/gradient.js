window.setInterval(changeColor, 50);

let baseHue = 209;

function changeColor(){
    baseHue +=1;
    document.body.style.background = "linear-gradient(to bottom, hsl(" + 
    (baseHue%360) + ", 40%, 39%), hsl(" + ((baseHue+30)%360) + ", 100%, 17%), hsl(" + ((baseHue+60)%360) + ", 100%, 7%))";
    document.body.style.backgroundAttachment = "fixed";
}