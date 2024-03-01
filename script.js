function removeCartItem(element) {
  var item = element.closest('.top-cart-item');
  item.remove();

  // Update total price
  updateTotalPrice();
}

function updateTotalPrice() {
  var totalPriceElement = document.getElementById('totalPrice');
  var cartItems = document.querySelectorAll('.top-cart-item');
  var totalPrice = 0;

  cartItems.forEach(function (item) {
    var priceElement = item.querySelector('.top-cart-item-price');
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = parseInt(item.querySelector('.top-cart-item-quantity').innerText.replace('x ', ''));
    totalPrice += price * quantity;
  });

  totalPriceElement.innerText = '$' + totalPrice.toFixed(2);
}


function addToCart(productName, productPrice) {
  // Create a new cart item element
  var cartItem = document.createElement('div');
  cartItem.className = 'top-cart-item';

  // Build the cart item HTML structure
  cartItem.innerHTML = `
    <div class="top-cart-item-image position-relative">
      <span class="position-absolute top-0 start-0 translate-middle bg-danger rounded-circle lh-1 border border-white text-white square square-xs text-center remove-product" onclick="removeCartItem(this)">
        <span class="visually-hidden">Remove Product</span>&times;
      </span>
    </div>
    <div class="top-cart-item-desc">
      <div class="top-cart-item-desc-title">
        <a href="demo-skincare-single.html" class="fw-normal">${productName}</a>
        <span class="top-cart-item-price d-block">$${productPrice.toFixed(2)}</span>
      </div>
      <div class="top-cart-item-quantity">x 1</div>
    </div>
  `;

  // Append the cart item to the top cart
  var topCartItems = document.querySelector('.top-cart-items');
  topCartItems.appendChild(cartItem);

  // Update total price
  updateTotalPrice();
}




