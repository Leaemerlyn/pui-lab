let buttons = document.getElementsByClassName("btn");
let buttonAnimations = []
let buttonMap = {}

for (var i=0; i<buttons.length; i++){
    buttonAnimations[i] = anime({
        targets: buttons[i],
        keyframes:
        [
            {
                scaleX: 1.15,
                scaleY: 0.8,
                skewY: '3deg',
            },
    
            {
                scaleX: 1,
                scaleY: 1,
                skewY: '0deg',
            },
    
            {
                scaleX: 0.925,
                scaleY: 1.1,
                skewY: '-2deg',
            },
    
            {
                scaleX: 1,
                scaleY: 1,
                skewY: '0deg',
            }
        ],
        duration: 275,
        easing: 'linear',
        autoplay: false
    })

    buttonMap[buttons[i]] = buttonAnimations[i]

    buttons[i].onmouseenter = function(e){
        buttonMap[this].play();
        let color = "hsl(" + Math.floor(Math.random()*360) + ", 35%, 63%)"
        this.style.backgroundColor = color;
        this.style.color = "white";
        this.style.borderColor = color;

    }

    buttons[i].onmouseleave = function(e){
        console.log("hi")
        this.style.backgroundColor = "";
        this.style.color = "";
        this.style.borderColor = "";
    }
}


