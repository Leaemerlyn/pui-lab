window.setInterval(updateBubbles, 16);

let bubbleFrames = 45;
let currentBubbleFrames = 0;

let bubbles= [];
function makeBubble(){
    bubbles.push(new Bubble());
}

function updateBubbles(){
    currentBubbleFrames ++;
    for (var i=0; i<bubbles.length; i++){
        pushBubble(bubbles[i])
    }
    if (currentBubbleFrames >= bubbleFrames){
        makeBubble();
        currentBubbleFrames = 0;
    }
    for (var i=0; i<bubbles.length; i++){
        bubbles[i].update();
    }
}

function pushBubble(bubble){
    let xOffset = bubble.getX() - mouseX;
    let yOffset = bubble.getY() - mouseY;
    let squareDist = xOffset**2 + yOffset**2;
    let dist = Math.sqrt(squareDist);
    xOffset = xOffset/dist;
    yOffset = yOffset/dist;
    if (dist < 500){
        bubble.xPush = xOffset * 200/dist;
        bubble.yPush = yOffset *200/dist;
    }
    else{
        bubble.xPush = 0;
        bubble.yPush = 0;
    }
}

function cssAdd( input, sum ){
    return (parseInt(input) + sum).toString() + "px";
}

let mouseX = 0;
let mouseY = 0;

document.body.onmousemove = function(e){
    mouseX = e.clientX + document.documentElement.scrollLeft;
    mouseY = e.clientY + document.documentElement.scrollTop;
}

class Bubble{
    constructor(){
        this.element = document.createElement("span");
        this.element.className = "circle";
        this.realLeft = Math.random()*window.screen.width;
        this.element.style.left = (Math.floor(this.realLeft)).toString() + "px";
        this.speed = 0.4 + Math.random()*0.8;
        this.horizontalSpeed = (Math.random()*2-1) *0.35;
        document.body.appendChild(this.element);
        this.fadeSpeed = 0.008;
        this.alpha = 0.3;
        let size = Math.floor(15+ Math.random()*50);
        this.realTop = -size;
        this.top = this.realTop.toString() + "px";
        this.element.style.height = size.toString() + "px";
        this.element.style.width = size.toString() + "px";
        this.wobbleMagnitude = Math.random()*10 + 5;
        this.wobbleFrequency = Math.random()*1.2 + 0.5;
        this.time = 0;
        this.lastSinOffset = 0;
        this.xPush = 0;
        this.yPush = 0;
    }

    update(){
        this.realTop += this.speed + this.yPush;
        this.realLeft += this.horizontalSpeed + this.xPush;
        this.time += 0.016;
        this.realLeft -= this.lastSinOffset;
        this.lastSinOffset = Math.sin(this.time * this.wobbleFrequency)*this.wobbleMagnitude;
        this.realLeft += this.lastSinOffset;
        //this.element.style.top = cssAdd(this.element.style.top, this.speed);
        this.element.style.top = Math.floor(this.realTop).toString() + "px";
        this.element.style.left = Math.floor(this.realLeft).toString() + "px";
        let oldTop = parseInt(window.getComputedStyle(this.element).top);
        this.element.style.top = Math.min(parseInt(window.getComputedStyle(this.element).top), 
            document.body.clientHeight- parseInt(window.getComputedStyle(this.element).height)).toString() + "px";
        this.element.style.left = Math.min(parseInt(window.getComputedStyle(this.element).left), 
            document.body.clientWidth- parseInt(window.getComputedStyle(this.element).width)).toString() + "px";
        if (oldTop != parseInt(window.getComputedStyle(this.element).top)){
            this.alpha -= this.fadeSpeed;
            this.element.style.backgroundColor = "rgba(255,255,255," + this.alpha + ")";
            if (this.alpha <= 0){
                this.remove();
            }
        }
    }

    remove(){
        for(var i = 0; i < bubbles.length; i++){
            if(bubbles[i] == this ){
                bubbles.splice(i,1);
                document.body.removeChild(this.element);
            }
        }
    }

    getX(){
        return parseInt(window.getComputedStyle(this.element).left)+ parseInt(window.getComputedStyle(this.element).width)/2;
    }

    getY(){
        return parseInt(window.getComputedStyle(this.element).top)+ parseInt(window.getComputedStyle(this.element).height)/2;
    }
}

makeBubble();