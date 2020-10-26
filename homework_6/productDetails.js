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
addToCart.onclick = function(e) {
    e.preventDefault();
    numCart += quantityList[quantityDropdown.selectedIndex];
    cartText.innerHTML = "Cart (" + numCart + ")";
    sessionStorage.setItem("numCart", numCart.toString());
};


