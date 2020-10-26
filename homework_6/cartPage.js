let cartText = document.getElementById("cart");
let storedNumCart = sessionStorage.getItem("numCart");
let numCart = 0;
if (storedNumCart != null) 
    numCart= parseInt(storedNumCart);
if (numCart != 0)
    cartText.innerHTML = "Cart (" + numCart + ")";

let deliveryButton = document.getElementById("delivery");
let pickupButton = document.getElementById("pickup");
let deliveryFee = document.getElementById("deliveryFee");
let deliveryFeeAmount = 4;
let delivery = true;
function updateDeliveryButtonColor(){
    if (delivery){
        deliveryButton.style.backgroundColor = "black";
        deliveryButton.style.color= "white";
        deliveryButton.style.cursor = "default";
        pickupButton.style.color= "#a3a3a3d0";
        pickupButton.style.backgroundColor = "#50505050";
        pickupButton.style.cursor = "pointer";
        deliveryFeeAmount = 4;
        deliveryFee.innerHTML = "$" + deliveryFeeAmount;
    }
    else{
        deliveryButton.style.backgroundColor = "#50505050";
        deliveryButton.style.color= "#a3a3a3d0";
        deliveryButton.style.cursor = "pointer";
        pickupButton.style.color= "white";
        pickupButton.style.backgroundColor = "black";
        pickupButton.style.cursor = "default";
        deliveryFeeAmount = 0;
        deliveryFee.innerHTML = "$" + deliveryFeeAmount;
    }
}

deliveryButton.onclick = function(e){
    delivery = true;
    updateDeliveryButtonColor();
}

pickupButton.onclick = function(e){
    delivery = false;
    updateDeliveryButtonColor();
}