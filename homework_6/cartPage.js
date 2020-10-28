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
let subtotal = document.getElementById("subtotal");
let tax = document.getElementById("tax");
let total = document.getElementById("total");
let deliveryFeeAmount = 4;
let delivery = true;
let subtotalAmount = 0;

let checkoutButton = document.getElementById("checkoutButton");
checkoutButton.onclick = function(e){
    alert("Yay, good food on the way")
}

function formatNumber(num){
    if(num % 1 == 0)
        return num;
    else
        return num.toFixed(2);
}

function updatePrice(newSubtotal){
    subtotalAmount = newSubtotal;
    subtotal.innerHTML = "$" + newSubtotal;
    tax.innerHTML = "$" + formatNumber(newSubtotal*0.07);
    deliveryFee.innerHTML = "$" + deliveryFeeAmount;
    total.innerHTML = "$" + formatNumber(newSubtotal*1.07 + deliveryFeeAmount);
}

function updateDeliveryButtonColor(){
    if (delivery){
        deliveryButton.style.backgroundColor = "black";
        deliveryButton.style.color= "white";
        deliveryButton.style.cursor = "default";
        pickupButton.style.color= "#a3a3a3d0";
        pickupButton.style.backgroundColor = "#50505050";
        pickupButton.style.cursor = "pointer";
        deliveryFeeAmount = 4;
        updatePrice(subtotalAmount);
    }
    else{
        deliveryButton.style.backgroundColor = "#50505050";
        deliveryButton.style.color= "#a3a3a3d0";
        deliveryButton.style.cursor = "pointer";
        pickupButton.style.color= "white";
        pickupButton.style.backgroundColor = "black";
        pickupButton.style.cursor = "default";
        deliveryFeeAmount = 0;
        updatePrice(subtotalAmount);
    }
};

deliveryButton.onclick = function(e){
    delivery = true;
    updateDeliveryButtonColor();
};

pickupButton.onclick = function(e){
    delivery = false;
    updateDeliveryButtonColor();
};

let checkoutItems = document.getElementById("checkoutItems");
let orderImages = {
    "Original" : "Images/original.jpg",
    "Original Gluten Free" : "Images/originalGF.jpg",
    "Blackberry" : "Images/blackberry.jpg",
    "Caramel Pecan" : "Images/caramelpecan.jpg",
    "Pumpkin Spice" : "Images/pumpkinspice.jpg",
    "Walnut" : "Images/walnut.jpg"
};

let orderPrices = {
    "Original" : 3,
    "Original Gluten Free" : 3,
    "Blackberry" : 4,
    "Caramel Pecan" : 3,
    "Pumpkin Spice" : 3,
    "Walnut" : 5
};

let itemNames = ["Original" , "Original Gluten Free" , "Blackberry" , "Caramel Pecan" , "Pumpkin Spice" , "Walnut"];
let glazingNames = ["None" , "Sugar Milk" , "Vanilla Milk" , "Double Chocolate"];

for (var i=0; i<itemNames.length; i++){
    for (var j=0; j<glazingNames.length; j++){
        let keyString = itemNames[i] + "_" + glazingNames[j];
        let amount = sessionStorage.getItem(keyString)
        if (amount != null){
            createOrder(itemNames[i], glazingNames[j], parseInt(amount));
        }
    }
}

function createOrder(name, glazing, quantity){
    let orders = document.createElement("div");
    orders.className = "orders";

    let image= document.createElement("img");
    image.setAttribute("src", orderImages[name])
    orders.appendChild(image);

    let col1 = document.createElement("div");
    col1.className = "orderColumn1";
    let orderName = document.createElement("p");
    orderName.className = "orderName";
    orderName.innerHTML = name;
    col1.appendChild(orderName);
    let orderDetailsGlazing = document.createElement("p");
    orderDetailsGlazing.className = "orderDetailsName";
    orderDetailsGlazing.innerHTML = "Glazing";
    col1.appendChild(orderDetailsGlazing);
    let orderDetailsQuantity = document.createElement("p");
    orderDetailsQuantity.className = "orderDetailsName";
    orderDetailsQuantity.innerHTML = "Quantity";
    col1.appendChild(orderDetailsQuantity);
    orders.appendChild(col1);

    let col2 = document.createElement("div");
    col2.className = "orderColumn2";
    col2.appendChild(document.createElement("p"));
    let orderDetailsGlazingType = document.createElement("p");
    orderDetailsGlazingType.className = "orderDetails";
    orderDetailsGlazingType.innerHTML = glazing;
    col2.appendChild(orderDetailsGlazingType);
    let orderDetailsAmount = document.createElement("p");
    orderDetailsAmount.className = "orderDetails";
    orderDetailsAmount.innerHTML = quantity;
    col2.appendChild(orderDetailsAmount);
    orders.appendChild(col2);

    let col3 = document.createElement("div");
    col3.className = "orderColumn3";
    let orderPrice = document.createElement("p");
    orderPrice.className = "orderPrice";
    orderPrice.innerHTML = "$" + (orderPrices[name]*quantity);
    col3.appendChild(orderPrice);
    col3.appendChild(document.createElement("p"));
    col3.appendChild(document.createElement("p"));
    let removeButton = document.createElement("p");
    removeButton.className = "removeButton";
    removeButton.innerHTML = "remove";
    removeButton.style.cursor = "pointer";
    removeButton.onclick = function(e){
        sessionStorage.removeItem(name + "_" + glazing)
        checkoutItems.removeChild(orders);
        numCart -= quantity;
        sessionStorage.setItem("numCart", numCart)
        if (numCart != 0)
            cartText.innerHTML = "Cart (" + numCart + ")";
        else 
            cartText.innerHTML = "Cart";
        subtotalAmount -= (orderPrices[name]*quantity);
        updatePrice(subtotalAmount);
    }
    col3.appendChild(removeButton);
    orders.appendChild(col3);

    checkoutItems.appendChild(orders);
    subtotalAmount+=(orderPrices[name]*quantity);
    updatePrice(subtotalAmount);
}