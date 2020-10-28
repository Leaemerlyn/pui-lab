let ingredientsList = ["None","powdered sugar, vegan butter, plain almond milk", "powdered sugar, vegan butter, plain almond milk, vanilla extract", "powdered sugar, chocolate chips, plain almond milk, vegan butter"];
let ingredient = document.getElementById("ingredients");
let none = "";
if (ingredient != null) 
    none= ingredient.innerHTML;

let priceText = document.getElementById("price");
let pricePerUnit = parseInt(priceText.innerHTML.substring(1))

let cartText = document.getElementById("cart");
let storedNumCart = sessionStorage.getItem("numCart");
let numCart = 0;
if (storedNumCart != null) 
    numCart= parseInt(storedNumCart);
if (numCart != 0)
    cartText.innerHTML = "Cart (" + numCart + ")";
let quantityList = [1, 3, 6, 12];
let glazingList = ["None" , "Sugar Milk", "Vanilla Milk" , "Double Chocolate"]

let glazingDropdown = document.getElementById("glazingOption");
glazingDropdown.onchange = function (e) {
  e.preventDefault();
  ingredient.innerHTML = none + " <br><br><b>Glazing Ingredients:</b> " + ingredientsList[glazingDropdown.selectedIndex];
};

let quantityDropdown = document.getElementById("quantityOption");
quantityDropdown.onchange = function(e){
    priceText.innerHTML= "$" + pricePerUnit * quantityList[quantityDropdown.selectedIndex];
}

let addToCart = document.getElementById("addToCart");
let itemName = document.getElementById("itemName");
addToCart.onclick = function(e) {
    e.preventDefault();
    let quantity = quantityList[quantityDropdown.selectedIndex];
    numCart += quantity;
    cartText.innerHTML = "Cart (" + numCart + ")";
    sessionStorage.setItem("numCart", numCart.toString());

    let name = itemName.innerHTML;
    let glazing = glazingList[glazingDropdown.selectedIndex];
    let keyString = name + "_" + glazing;
    let previousAmount = sessionStorage.getItem(keyString);
    if (previousAmount != null) {
        quantity += parseInt(previousAmount)
    }
    
    sessionStorage.setItem(keyString, quantity);

};


