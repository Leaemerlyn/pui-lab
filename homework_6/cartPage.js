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
        pickupButton.style.backgroundColor = "#464646";
        deliveryFeeAmount = 4;
        deliveryFee.innerHTML = "$" + deliveryFeeAmount;
    }
    else{
        deliveryButton.style.backgroundColor = "#464646";
        pickupButton.style.backgroundColor = "black";
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