// Array to store items in the shopping cart
let cartItemsArray = [];

// Event listener to run the script after the HTML document is completely loaded
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve cart items from session storage
  let storedCartItems = sessionStorage.getItem("cartItems");

  // Check if there are stored cart items
  if (storedCartItems) {
    // Parse stored cart items and update the cart array
    cartItemsArray = JSON.parse(storedCartItems);

    // Update the cart display
    updateCartDisplay();
  }
});

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
  // Check if the item is already in the cart
  let existingItem = cartItemsArray.find(function (item) {
    return item.name === itemName;
  });

  // If the item exists, increment its quantity; otherwise, add a new item
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

  // Update session storage with the modified cart array
  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

  // Update the cart display
  updateCartDisplay();
}

// Function to clear or decrease the quantity of an item in the cart
function clearCartItem(index) {
  let currentItem = cartItemsArray[index];

  // If the quantity is greater than 1, decrease it; otherwise, remove the item
  if (currentItem.quantity > 1) {
    currentItem.quantity -= 1;
  } else {
    cartItemsArray.splice(index, 1);
  }

  // Update session storage with the modified cart array
  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

  // Update the cart display
  updateCartDisplay();
}

// Function to decrease the quantity of an item in the cart
function decreaseQuantity(index) {
  let currentItem = cartItemsArray[index];

  // If the quantity is greater than 1, decrease it; otherwise, remove the item
  if (currentItem.quantity > 1) {
    currentItem.quantity -= 1;
  } else {
    cartItemsArray.splice(index, 1);
  }

  // Update session storage with the modified cart array
  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

  // Update the cart display
  updateCartDisplay();
}

// Function to increase the quantity of an item in the cart
function increaseQuantity(index) {
  let currentItem = cartItemsArray[index];

  // Increment the quantity of the selected item
  currentItem.quantity += 1;

  // Update session storage with the modified cart array
  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

  // Update the cart display
  updateCartDisplay();
}

// Function to update the cart display in the HTML
function updateCartDisplay() {
  // Get the HTML element to display the cart
  let customTotalPriceElement = document.getElementById("customTotalPrice");

  // Clear existing content in the cart display
  customTotalPriceElement.innerHTML = "";

  // Iterate over each item in the cart and create a table row for it
  cartItemsArray.forEach(function (item, index) {
    // Create a table row
    let row = document.createElement("tr");

    // Create cells for product name, unit price, quantity, total, and a clear button
    let productNameCell = document.createElement("td");
    productNameCell.textContent = item.name;
    row.appendChild(productNameCell);

    let unitPriceCell = document.createElement("td");
    unitPriceCell.textContent = "R" + item.price.toFixed(2);
    row.appendChild(unitPriceCell);

    let quantityCell = document.createElement("td");
    quantityCell.classList.add("quantity-cell");

    // Create buttons for decreasing and increasing quantity
    let decreaseButton = document.createElement("span");
    decreaseButton.textContent = "-";
    decreaseButton.classList.add("quantity-button");
    decreaseButton.addEventListener("click", function () {
      decreaseQuantity(index);
    });

    let quantityText = document.createElement("span");
    quantityText.textContent = item.quantity;
    quantityText.classList.add("quantity-text");

    let increaseButton = document.createElement("span");
    increaseButton.textContent = "+";
    increaseButton.classList.add("quantity-button");
    increaseButton.addEventListener("click", function () {
      increaseQuantity(index);
    });

    // Append buttons and quantity text to the quantity cell
    quantityCell.appendChild(decreaseButton);
    quantityCell.appendChild(quantityText);
    quantityCell.appendChild(increaseButton);

    // Append cells to the row
    row.appendChild(quantityCell);

    let totalCell = document.createElement("td");
    totalCell.textContent = "R" + (item.price * item.quantity).toFixed(2);
    row.appendChild(totalCell);

    // Create a cell for the clear button
    let clearButtonCell = document.createElement("td");
    let clearButton = document.createElement("span");
    // Use inline HTML with an onclick event for the clear button
    clearButton.innerHTML =
      " <span class='clear-item font-weight-bold text-danger' onclick='clearCartItem(" +
      index +
      ")'>x</span>";
    clearButtonCell.appendChild(clearButton);
    row.appendChild(clearButtonCell);

    // Append the row to the cart display
    customTotalPriceElement.appendChild(row);
  });

  // Calculate and display subtotal, tax, and total
  let subtotal = cartItemsArray.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  let taxRate = 0.25;
  let tax = subtotal * taxRate;
  let totalPrice = subtotal + tax;

  // Create rows for subtotal, tax, and total, and append them to the cart display
  let subtotalRow = document.createElement("tr");
  subtotalRow.innerHTML =
    "<td colspan='3' class='fw-bold'>Subtotal</td><td class='fw-bold'>R" +
    subtotal.toFixed(2) +
    "</td><td></td>";
  customTotalPriceElement.appendChild(subtotalRow);

  let taxRow = document.createElement("tr");
  taxRow.innerHTML =
    "<td colspan='3' class='fw-bold'>Tax (25%)</td><td class='fw-bold'>R" +
    tax.toFixed(2) +
    "</td><td></td>";
  customTotalPriceElement.appendChild(taxRow);

  let totalRow = document.createElement("tr");
  totalRow.innerHTML =
    "<td colspan='3' class='fw-bold'>Total (Including 25% Tax)</td><td class='fw-bold'>R" +
    totalPrice.toFixed(2) +
    "</td><td></td>";
  customTotalPriceElement.appendChild(totalRow);
}
