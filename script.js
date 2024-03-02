let cartItemsArray = [];

// Load cart items from sessionStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  let storedCartItems = sessionStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItemsArray = JSON.parse(storedCartItems);
    updateCartDisplay();
  }
});

// Define addToCart in the global scope
function addToCart(itemName, itemPrice) {
  let existingItem = cartItemsArray.find(function (item) {
    return item.name === itemName;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    let newItem = {
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
  let currentItem = cartItemsArray[index];

  // Decrease the quantity if more than 1, otherwise remove the item
  if (currentItem.quantity > 1) {
    currentItem.quantity -= 1;
  } else {
    cartItemsArray.splice(index, 1);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
  updateCartDisplay();
}

function updateCartDisplay() {
  let customTotalPriceElement = document.getElementById("customTotalPrice");

  // Clear existing content in the table body
  customTotalPriceElement.innerHTML = "";

  cartItemsArray.forEach(function (item, index) {
    // Create a new table row for each item
    let row = document.createElement("tr");

    // Create table cells for each column (Product, Unit Price, Quantity, Total)
    let productNameCell = document.createElement("td");
    productNameCell.textContent = item.name;
    row.appendChild(productNameCell);

    let unitPriceCell = document.createElement("td");
    unitPriceCell.textContent = "R" + item.price.toFixed(2);
    row.appendChild(unitPriceCell);

    let quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    row.appendChild(quantityCell);

    let totalCell = document.createElement("td");
    totalCell.textContent = "R" + (item.price * item.quantity).toFixed(2);
    row.appendChild(totalCell);

    // Add a small 'x' for clearing the item
    let clearButtonCell = document.createElement("td");
    let clearButton = document.createElement("span");
    clearButton.innerHTML =
      " <span class='clear-item font-weight-bold text-danger' onclick='clearCartItem(" +
      index +
      ")'>x</span>";
    clearButtonCell.appendChild(clearButton);
    row.appendChild(clearButtonCell);

    // Append the new row to the table body
    customTotalPriceElement.appendChild(row);
  });

  // Calculate and display the total price
  let totalPrice = cartItemsArray.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  // Display the total price in a separate row at the bottom
  let totalRow = document.createElement("tr");
  totalRow.innerHTML =
    "<td colspan='3' class='fw-bold'>Total</td><td class='fw-bold'>R" +
    totalPrice.toFixed(2) +
    "</td><td></td>"; // Empty cell for the 'x' button in the total row
  customTotalPriceElement.appendChild(totalRow);
}
