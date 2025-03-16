// Book Haven Cart & Checkout JavaScript

// Sample data - replace with your actual data source or API calls
const sampleBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
      image: "https://via.placeholder.com/100x150",
      quantity: 1
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 14.99,
      image: "https://via.placeholder.com/100x150",
      quantity: 2
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
      image: "https://via.placeholder.com/100x150",
      quantity: 1
    }
  ];
  
  // DOM Elements
  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalElement = document.querySelector('.subtotal');
  const taxElement = document.querySelector('.tax');
  const totalElement = document.querySelector('.total-amount');
  const checkoutTotalElement = document.querySelector('.checkout-total');
  const cartCountElement = document.querySelector('.cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');
  const continueShoppingBtn = document.getElementById('continue-shopping');
  const backToCartBtn = document.getElementById('back-to-cart');
  const cartContainer = document.querySelector('.cart-container');
  const checkoutContainer = document.querySelector('.checkout-container');
  const orderItemsContainer = document.querySelector('.order-items');
  const checkoutForm = document.getElementById('checkout-form');
  
  // Cart data
  let cartItems = [];
  const TAX_RATE = 0.08; // 8% tax
  const SHIPPING_COST = 4.99;
  
  // Initialize cart
  function initCart() {
    // In a real application, get cart from localStorage or API
    cartItems = [...sampleBooks]; // Using sample data for demonstration
    updateCartDisplay();
  }
  
  // Update cart display
  function updateCartDisplay() {
    // Update cart count
    cartCountElement.textContent = cartItems.length;
  
    // If cart is empty
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <button id="shop-now-btn" class="primary-btn">Shop Now</button>
        </div>
      `;
      
      document.getElementById('shop-now-btn').addEventListener('click', () => {
        window.location.href = 'books.html';
      });
      
      // Disable checkout button
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = '0.5';
      
      // Update summary
      updateOrderSummary();
      return;
    }
    
    // Enable checkout button
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = '1';
    
    // Render cart items
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="item-details">
          <div>
            <h3 class="item-title">${item.title}</h3>
            <p class="item-author">by ${item.author}</p>
            <p class="item-price">$${item.price.toFixed(2)}</p>
          </div>
          <div class="item-actions">
            <div class="quantity-control">
              <button class="quantity-btn decrease" data-id="${item.id}">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
              <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
      btn.addEventListener('click', () => decreaseQuantity(btn.dataset.id));
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
      btn.addEventListener('click', () => increaseQuantity(btn.dataset.id));
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', () => updateQuantity(input.dataset.id, parseInt(input.value)));
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeItem(btn.dataset.id));
    });
    
    // Update order summary
    updateOrderSummary();
  }
  
  // Update order summary
  function updateOrderSummary() {
    // Calculate subtotal
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate tax
    const tax = subtotal * TAX_RATE;
    
    // Calculate total
    const total = subtotal + tax + SHIPPING_COST;
    
    // Update DOM
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
    
    // Also update checkout total if it exists
    if (checkoutTotalElement) {
      checkoutTotalElement.textContent = `$${total.toFixed(2)}`;
    }
  }
  
  // Quantity functions
  function decreaseQuantity(itemId) {
    const item = cartItems.find(item => item.id == itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
      updateCartDisplay();
      saveCart();
    }
  }
  
  function increaseQuantity(itemId) {
    const item = cartItems.find(item => item.id == itemId);
    if (item) {
      item.quantity++;
      updateCartDisplay();
      saveCart();
    }
  }
  
  function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) newQuantity = 1;
    
    const item = cartItems.find(item => item.id == itemId);
    if (item) {
      item.quantity = newQuantity;
      updateCartDisplay();
      saveCart();
    }
  }
  
  function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id != itemId);
    updateCartDisplay();
    saveCart();
  }
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('bookHavenCart', JSON.stringify(cartItems));
  }
  
  // Load cart from localStorage
  function loadCart() {
    const savedCart = localStorage.getItem('bookHavenCart');
    if (savedCart) {
      cartItems = JSON.parse(savedCart);
    }
  }
  
  // Initialize checkout view
  function initCheckout() {
    // Populate order items
    orderItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
      const orderItemElement = document.createElement('div');
      orderItemElement.classList.add('order-item');
      orderItemElement.innerHTML = `
        <div class="order-item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="order-item-details">
          <h4 class="order-item-title">${item.title}</h4>
          <p class="order-item-author">by ${item.author}</p>
          <p class="order-item-price">$${item.price.toFixed(2)}</p>
          <p class="order-item-quantity">Quantity: ${item.quantity}</p>
        </div>
      `;
      orderItemsContainer.appendChild(orderItemElement);
    });
    
    // Update checkout total
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING_COST;
    checkoutTotalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  // Event listeners
  window.addEventListener('DOMContentLoaded', () => {
    // Try to load cart from localStorage first
    loadCart();
    
    // If cart is empty, initialize with sample data
    if (cartItems.length === 0) {
      initCart();
    } else {
      updateCartDisplay();
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
      cartContainer.style.display = 'none';
      checkoutContainer.style.display = 'block';
      initCheckout();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Continue shopping button
    continueShoppingBtn.addEventListener('click', () => {
      window.location.href = 'books.html';
    });
    
    // Back to cart button
    backToCartBtn.addEventListener('click', () => {
      checkoutContainer.style.display = 'none';
      cartContainer.style.display = 'flex';
    });
    
    // Checkout form submission
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real application, you would send the form data to your server
      alert('Order placed successfully!');
      
      // Clear cart
      cartItems = [];
      saveCart();
      
      // Redirect to confirmation page
      // window.location.href = 'confirmation.html';
      
      // For demo purposes, just redirect to home
      window.location.href = 'index.html';
    });
  });
  
  // Input validation for card fields
  document.getElementById('card-number').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d]/g, '');
    if (this.value.length > 16) {
      this.value = this.value.slice(0, 16);
    }
  });
  
  document.getElementById('expiry').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d]/g, '').replace(/^(\d{2})(\d{0,2}).*/, "$1/$2").trim();
  });
  
  document.getElementById('cvv').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d]/g, '');
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4);
    }
  });