
var cartItemsArray = [];

// Define addToCart in the global scope
function addToCart(itemName, itemPrice) {
  var existingItem = cartItemsArray.find(function(item) {
    return item.name === itemName;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    var newItem = {
      name: itemName,
      price: itemPrice,
      quantity: 1
    };
    cartItemsArray.push(newItem);
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  var cartItemsElement = document.getElementById('cartItems');
  var totalPriceElement = document.getElementById('totalPrice');

  cartItemsElement.innerHTML = '';

  cartItemsArray.forEach(function (item) {
    var itemElement = document.createElement('div');
    itemElement.innerHTML = '<p>' + item.name + ' - Qty: ' + item.quantity + ' - R' + (item.price * item.quantity).toFixed(2) + '</p>';
    cartItemsElement.appendChild(itemElement);
  });

  var totalPrice = cartItemsArray.reduce(function (total, item) {
    return total + (item.price * item.quantity);
  }, 0);
  totalPriceElement.textContent = 'R' + totalPrice.toFixed(2);
}

