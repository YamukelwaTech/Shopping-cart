let cart = [];
let totalCost = 0;

function addToCart() {
  const quantity = parseInt(document.getElementById('quantity').value);
  if (quantity > 0) {
    // Add your product details here
    const productPrice = 10.00;
    const itemTotal = quantity * productPrice;

    cart.push({ quantity, itemTotal });
    totalCost += itemTotal;

    updateCartDisplay();
  }
}

function clearCart() {
  cart = [];
  totalCost = 0;
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContents = document.getElementById('cartContents');
  const totalCostElement = document.getElementById('totalCost');

  cartContents.innerHTML = '';
  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${item.quantity} x Product: $${item.itemTotal.toFixed(2)}`;
    cartContents.appendChild(itemDiv);
  });

  totalCostElement.textContent = totalCost.toFixed(2);
}
