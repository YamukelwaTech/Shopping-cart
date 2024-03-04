let cartItemsArray = [];

document.addEventListener("DOMContentLoaded", function () {
  let storedCartItems = sessionStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItemsArray = JSON.parse(storedCartItems);
    updateCartDisplay();
  }
});

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

  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

  updateCartDisplay();
}

function clearCartItem(index) {
  let currentItem = cartItemsArray[index];

  if (currentItem.quantity > 1) {
    currentItem.quantity -= 1;
  } else {
    cartItemsArray.splice(index, 1);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
  updateCartDisplay();
}

function decreaseQuantity(index) {
  let currentItem = cartItemsArray[index];

  if (currentItem.quantity > 1) {
    currentItem.quantity -= 1;
  } else {
    cartItemsArray.splice(index, 1);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
  updateCartDisplay();
}

function increaseQuantity(index) {
  let currentItem = cartItemsArray[index];
  currentItem.quantity += 1;

  sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
  updateCartDisplay();
}

function updateCartDisplay() {
  let customTotalPriceElement = document.getElementById("customTotalPrice");
  customTotalPriceElement.innerHTML = "";

  cartItemsArray.forEach(function (item, index) {
    let row = document.createElement("tr");

    let productNameCell = document.createElement("td");
    productNameCell.textContent = item.name;
    row.appendChild(productNameCell);

    let unitPriceCell = document.createElement("td");
    unitPriceCell.textContent = "R" + item.price.toFixed(2);
    row.appendChild(unitPriceCell);

    let quantityCell = document.createElement("td");
    quantityCell.classList.add("quantity-cell");

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

    quantityCell.appendChild(decreaseButton);
    quantityCell.appendChild(quantityText);
    quantityCell.appendChild(increaseButton);

    row.appendChild(quantityCell);

    let totalCell = document.createElement("td");
    totalCell.textContent = "R" + (item.price * item.quantity).toFixed(2);
    row.appendChild(totalCell);

    let clearButtonCell = document.createElement("td");
    let clearButton = document.createElement("span");
    clearButton.innerHTML =
      " <span class='clear-item font-weight-bold text-danger' onclick='clearCartItem(" +
      index +
      ")'>x</span>";
    clearButtonCell.appendChild(clearButton);
    row.appendChild(clearButtonCell);

    customTotalPriceElement.appendChild(row);
  });

  let subtotal = cartItemsArray.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  let taxRate = 0.25;
  let tax = subtotal * taxRate;
  let totalPrice = subtotal + tax;

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

