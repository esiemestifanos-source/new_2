// ======================================================
// GEARSOULS - SHOP FUNCTIONALITY
// PayPal Integration Only - No Shopify
// ======================================================

// ======================================================
// PRODUCT DATA
// ======================================================

const products = [
  {
    id: 1,
    name: 'BEST TANK-TOP',
    price: 25.00,
    category: 'tops',
    image: 'img/006.png',
    paypalLink: 'https://www.paypal.com/ncp/payment/BMWW2HB5R3DJL',
    description: 'Dropped shoulders, heavyweight cotton. The ultimate streetwear tank.',
    badge: '✦ NEW DROP'
  },
  {
    id: 2,
    name: 'TANK-TOP Blue',
    price: 25.99,
    category: 'tops',
    image: 'img/001.png',
    paypalLink: 'https://www.paypal.com/ncp/payment/NCNBALDPDNTXS',
    description: 'Best tank-top in Dublin. Premium quality with bold gear skull graphic.',
    badge: '✦ LIMITED COLOR'
  }
];

// ======================================================
// STATE
// ======================================================

let currentFilter = 'all';
let currentSort = 'featured';
let productsLoaded = false;

// ======================================================
// DOM REFERENCES
// ======================================================

const container = document.getElementById('shopify-products');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const notification = document.getElementById('shopNotification');
const notificationMsg = document.getElementById('notificationMessage');

// ======================================================
// NOTIFICATION SYSTEM
// ======================================================

function showNotification(message, isError = false) {
  if (notification && notificationMsg) {
    notificationMsg.textContent = message;
    notification.classList.add('show');
    
    if (isError) {
      notification.style.background = '#ff4444';
      notification.style.color = '#ffffff';
    } else {
      notification.style.background = '#c9b698';
      notification.style.color = '#1a1a1a';
    }
    
    clearTimeout(window.notificationTimer);
    window.notificationTimer = setTimeout(() => {
      notification.classList.remove('show');
    }, 2500);
  }
}

window.showNotification = showNotification;

// ======================================================
// RENDER PRODUCTS
// ======================================================

function renderProducts(productsToRender) {
  if (!container) return;
  
  container.innerHTML = productsToRender.map(product => `
    <div class="custom-product-card" 
         data-product-id="${product.id}" 
         data-product-name="${product.name}" 
         data-product-price="${product.price}" 
         data-category="${product.category}" 
         data-order="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category.toUpperCase()} · STREETWEAR</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">€${product.price.toFixed(2)} <small>EUR</small></span>
          <a href="${product.paypalLink}" target="_blank" class="paypal-btn-shop">
            <i class="fab fa-paypal"></i> BUY NOW
          </a>
        </div>
      </div>
    </div>
  `).join('');
  
  // Attach PayPal button tracking
  document.querySelectorAll('.paypal-btn-shop').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const card = this.closest('.custom-product-card');
      const productName = card?.querySelector('.product-name')?.textContent || 'product';
      showNotification(`Redirecting to PayPal for ${productName.trim()}...`);
    });
  });
  
  productsLoaded = true;
}

// ======================================================
// FILTER PRODUCTS
// ======================================================

function filterProducts(category) {
  currentFilter = category;
  
  let filtered = products;
  
  if (category !== 'all') {
    filtered = products.filter(p => p.category === category);
  }
  
  // Apply current sort
  filtered = sortProductArray(filtered, currentSort);
  
  renderProducts(filtered);
  
  if (category === 'all') {
    showNotification('Showing: All Products');
  } else {
    showNotification(`Showing: ${filtered.length} products in ${category.toUpperCase()}`);
  }
}

window.filterProducts = filterProducts;

// ======================================================
// SORT PRODUCTS
// ======================================================

function sortProductArray(productsArray, sortType) {
  const sorted = [...productsArray];
  
  switch(sortType) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      showNotification('Sorted: Price (Low to High)');
      break;
      
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      showNotification('Sorted: Price (High to Low)');
      break;
      
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      showNotification('Sorted: Name (A to Z)');
      break;
      
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      showNotification('Sorted: Name (Z to A)');
      break;
      
    case 'featured':
    default:
      sorted.sort((a, b) => a.id - b.id);
      showNotification('Sorted: Featured');
      break;
  }
  
  return sorted;
}

function sortProducts(sortType) {
  currentSort = sortType;
  
  let filtered = products;
  if (currentFilter !== 'all') {
    filtered = products.filter(p => p.category === currentFilter);
  }
  
  const sorted = sortProductArray(filtered, sortType);
  renderProducts(sorted);
}

window.sortProducts = sortProducts;

// ======================================================
// LOAD MORE
// ======================================================

function loadMoreProducts() {
  showNotification('More products coming soon! Stay tuned.', true);
}

// ======================================================
// INITIALIZE CONTROLS
// ======================================================

function initControls() {
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterProducts(this.dataset.filter);
    });
  });
  
  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      sortProducts(this.value);
    });
  }
  
  // Load more
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreProducts);
  }
}

// ======================================================
// INITIALIZE
// ======================================================

function initShop() {
  // Render initial products
  renderProducts(products);
  
  // Initialize controls
  initControls();
  
  // Brand navigation
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('Returning to home...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });
  }
  
  console.log('🛍️ GEARSOULS Shop — PayPal Integration Ready');
}

// ======================================================
// DOM CONTENT LOADED
// ======================================================

document.addEventListener('DOMContentLoaded', initShop);

// ======================================================
// EXPOSE FUNCTIONS GLOBALLY
// ======================================================

window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.showNotification = showNotification;
window.loadMoreProducts = loadMoreProducts;