export function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  
  export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  export function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.product.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
  
    saveCart(cart);
  }
  
  export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
  }
  
  export function clearCart() {
    localStorage.removeItem('cart');
  }
  
  export function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  }
  
  export function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
  