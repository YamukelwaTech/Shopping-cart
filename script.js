var cartItemsArray = [];

// Load cart items from sessionStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  var storedCartItems = sessionStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItemsArray = JSON.parse(storedCartItems);
    updateCartDisplay();
  }
});

// Define addToCart in the global scope
function addToCart(itemName, itemPrice) {
  var existingItem = cartItemsArray.find(function (item) {
    return item.name === itemName;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    var newItem = {
      name: itemName,
      price: itemPrice,
      quantity: 1,
    };
    cartItemsArray.push(newItem);
  }

  // Save updated cart items to sessionStorage
  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

  updateCartDisplay();
}

function clearCartItem(index) {
  var currentItem = cartItemsArray[index];

  // Decrease the quantity if more than 1, otherwise remove the item
  if (currentItem.quantity > 1) {
    currentItem.quantity -= 1;
  } else {
    cartItemsArray.splice(index, 1);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
  updateCartDisplay();  // Moved this line here
}

function updateCartDisplay() {
  var cartItemsElement = document.getElementById("cartItems");
  var totalPriceElement = document.getElementById("totalPrice");

  cartItemsElement.innerHTML = "";

  cartItemsArray.forEach(function (item, index) {
    var itemElement = document.createElement("div");

    // Display item details
    itemElement.innerHTML =
      "<p>" +
      item.name +
      " - Qty: " +
      item.quantity +
      " - R" +
      (item.price * item.quantity).toFixed(2) +
      "</p>";

    // Add a small 'x' for clearing the item
    var clearButton = document.createElement("span");
    clearButton.innerHTML =
      " <span class='clear-item font-weight-bold text-danger' onclick='clearCartItem(" +
      index +
      ")'>x</span>";

    itemElement.appendChild(clearButton);

    // Add a line break or horizontal rule between items (excluding the last one)
    if (index < cartItemsArray.length - 1) {
      // You can choose either line break or horizontal rule
      // itemElement.innerHTML += '<br>';
      itemElement.innerHTML += "<hr>";
    }

    cartItemsElement.appendChild(itemElement);
  });

  var totalPrice = cartItemsArray.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);
  totalPriceElement.textContent = "R" + totalPrice.toFixed(2);
}
