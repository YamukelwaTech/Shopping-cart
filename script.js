let shoppingCart = [];

  // Function to add an item to the cart
  function addToCart(name, price) {
    const newItem = {
      name: name,
      price: price
    };

    shoppingCart.push(newItem);
    updateCart();
  }

  // Function to remove an item from the cart
  function removeCartItem(index) {
    shoppingCart.splice(index, 1);
    updateCart();
  }

  // Function to update the cart and total price
  function updateCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    // Clear existing items
    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    // Update cart items
    shoppingCart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("top-cart-item");

      cartItem.innerHTML = `
        <div class="top-cart-item-desc">
          <div class="top-cart-item-desc-title">
            <span class="fw-normal">${item.name}</span>
            <span class="top-cart-item-price d-block">$${item.price.toFixed(2)}</span>
          </div>
          <div class="top-cart-item-quantity">
            <button onclick="removeCartItem(${index})">Remove</button>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);

      // Update total price
      totalPrice += item.price;
    });

    // Update total price element
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

 





