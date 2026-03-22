// ======================================================
// GEARSOULS - COMPLETE SHOP FUNCTIONALITY
// Full working sorting, filtering, product linking, and canvas background
// ======================================================

// Product ID mapping for highlighting and sorting
const productIdMap = {
  '10743198351624': '#product-1',
  '10760158773512': '#product-2',
  '10761169862920': '#product-component-1771470615559',
  '10761230024968': '#product-component-1771472196044',
  '10761255387400': '#product-component-1771472237564'
};

// Complete product data for sorting and filtering
const productData = {
  '10743198351624': { 
    name: 'SKULL GEAR EMBLEM', 
    price: 29.99, 
    category: 'accessories',
    order: 1
  },
  '10760158773512': { 
    name: 'CLASSIC LOGO TEE', 
    price: 49.99, 
    category: 'tops',
    order: 2
  },
  '10761169862920': { 
    name: 'SIGNATURE SKULL HOODIE', 
    price: 89.99, 
    category: 'outerwear',
    order: 3
  },
  '10761230024968': { 
    name: 'URBAN PUFFER JACKET', 
    price: 149.99, 
    category: 'outerwear',
    order: 4
  },
  '10761255387400': { 
    name: 'ESSENTIAL LOGO SET', 
    price: 79.99, 
    category: 'tops',
    order: 5
  }
};

// Global variables
let productsLoaded = false;
let originalOrder = [];
let currentFilter = 'all';
let currentSort = 'featured';

// ==================== NOTIFICATION FUNCTION ====================
window.showNotification = function(message, type = 'success') {
  let notification = document.querySelector('.shop-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'shop-notification';
    notification.innerHTML = '<i class="fas fa-check"></i><span id="notificationMessage"></span>';
    document.body.appendChild(notification);
  }
  
  const icon = notification.querySelector('i');
  const messageSpan = document.getElementById('notificationMessage');
  
  if (type === 'error') {
    icon.className = 'fas fa-exclamation-circle';
    notification.style.background = '#ff4444';
    notification.style.borderColor = '#ff4444';
    notification.style.color = '#ffffff';
  } else {
    icon.className = 'fas fa-check';
    notification.style.background = '#c9b698';
    notification.style.borderColor = '#c9b698';
    notification.style.color = '#1a1a1a';
  }
  
  if (messageSpan) messageSpan.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2500);
};

// ==================== SORTING FUNCTION ====================
function sortProducts(sortType) {
  const container = document.getElementById('shopify-products');
  if (!container || !productsLoaded) {
    showNotification('Products are still loading...', 'error');
    return;
  }
  
  const products = Array.from(container.children);
  if (products.length === 0) return;
  
  // Add loading state
  container.classList.add('sorting');
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.classList.add('loading');
  
  setTimeout(() => {
    let sortedProducts = [...products];
    
    switch(sortType) {
      case 'price-asc':
        sortedProducts.sort((a, b) => {
          const priceA = productData[a.getAttribute('data-product-id')]?.price || 999;
          const priceB = productData[b.getAttribute('data-product-id')]?.price || 999;
          return priceA - priceB;
        });
        showNotification('Sorted: Price (Low to High)');
        break;
        
      case 'price-desc':
        sortedProducts.sort((a, b) => {
          const priceA = productData[a.getAttribute('data-product-id')]?.price || 0;
          const priceB = productData[b.getAttribute('data-product-id')]?.price || 0;
          return priceB - priceA;
        });
        showNotification('Sorted: Price (High to Low)');
        break;
        
      case 'name-asc':
        sortedProducts.sort((a, b) => {
          const nameA = productData[a.getAttribute('data-product-id')]?.name || '';
          const nameB = productData[b.getAttribute('data-product-id')]?.name || '';
          return nameA.localeCompare(nameB);
        });
        showNotification('Sorted: Name (A to Z)');
        break;
        
      case 'name-desc':
        sortedProducts.sort((a, b) => {
          const nameA = productData[a.getAttribute('data-product-id')]?.name || '';
          const nameB = productData[b.getAttribute('data-product-id')]?.name || '';
          return nameB.localeCompare(nameA);
        });
        showNotification('Sorted: Name (Z to A)');
        break;
        
      case 'featured':
      default:
        sortedProducts = [...originalOrder];
        showNotification('Sorted: Featured');
        break;
    }
    
    // Reorder DOM elements
    sortedProducts.forEach(product => {
      container.appendChild(product);
    });
    
    currentSort = sortType;
    
    // Remove loading state
    container.classList.remove('sorting');
    if (sortSelect) sortSelect.classList.remove('loading');
    
  }, 150);
}

// ==================== FILTER FUNCTION ====================
function filterProducts(category) {
  const container = document.getElementById('shopify-products');
  if (!container || !productsLoaded) {
    showNotification('Products are still loading...', 'error');
    return;
  }
  
  const products = Array.from(container.children);
  currentFilter = category;
  
  if (category === 'all') {
    products.forEach(product => {
      product.style.display = '';
    });
    showNotification('Showing: All Products');
  } else {
    let visibleCount = 0;
    products.forEach(product => {
      const productId = product.getAttribute('data-product-id');
      const productCategory = productData[productId]?.category;
      
      if (productCategory === category) {
        product.style.display = '';
        visibleCount++;
      } else {
        product.style.display = 'none';
      }
    });
    showNotification(`Showing: ${visibleCount} products in ${category.toUpperCase()}`);
  }
}

// ==================== CHECK URL HASH FOR PRODUCT HIGHLIGHT ====================
function checkForProductHighlight() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#product-')) {
    const productId = hash.replace('#product-', '');
    const targetSelector = productIdMap[productId];
    
    if (targetSelector) {
      setTimeout(() => {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetElement.classList.add('product-highlight');
          showNotification(`Loading: ${productData[productId]?.name || 'Product'}`);
          
          setTimeout(() => {
            targetElement.classList.remove('product-highlight');
          }, 2000);
        }
      }, 1500);
    }
  }
}

// ==================== CANVAS BACKGROUND WITH MOUSE REPELLING ====================
function initCanvasBackground() {
  const canvas = document.getElementById('shopCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let time = 0;
  let mouseX = -1000, mouseY = -1000;
  let mouseInCanvas = false;
  let particles = [];
  
  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseInCanvas = true;
  });
  
  canvas.addEventListener('mouseleave', () => {
    mouseInCanvas = false;
    mouseX = -1000;
    mouseY = -1000;
  });
  
  function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    particles = [];
    const particleCount = Math.floor(width * height / 10000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        originalSpeedX: (Math.random() - 0.5) * 0.2,
        originalSpeedY: (Math.random() - 0.5) * 0.2,
        color: `rgba(0, ${Math.floor(Math.random() * 155 + 100)}, 255, ${Math.random() * 0.3 + 0.2})`
      });
    }
  }
  
  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#001a1a');
    gradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Gentle flowing waves
    time += 0.002;
    
    for (let layer = 0; layer < 3; layer++) {
      const opacity = 0.03 - (layer * 0.01);
      const speed = 0.5 + (layer * 0.3);
      const amplitude = 30 + (layer * 15);
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
      ctx.lineWidth = 2 - layer * 0.5;
      
      for (let x = 0; x < width; x += 30) {
        const y = height / 2 + 
                  Math.sin(x * 0.005 + time * speed) * amplitude + 
                  Math.cos(x * 0.003 + time * 0.7) * (amplitude * 0.5);
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 0, 255, ${opacity * 0.7})`;
      
      for (let x = 0; x < width; x += 30) {
        const y = height / 3 + 
                  Math.cos(x * 0.004 + time * (speed + 0.2)) * (amplitude * 0.8) + 
                  Math.sin(x * 0.002 + time * 0.5) * (amplitude * 0.3);
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    // Draw and update particles with mouse repelling
    particles.forEach(p => {
      if (mouseInCanvas) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;
        
        if (distance < repelRadius) {
          const force = (repelRadius - distance) / repelRadius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 3;
          p.y += Math.sin(angle) * force * 3;
          p.x += (Math.random() - 0.5) * force * 2;
          p.y += (Math.random() - 0.5) * force * 2;
          ctx.fillStyle = `rgba(255, 100, 255, ${Math.random() * 0.5 + 0.3})`;
        } else {
          p.x += p.speedX;
          p.y += p.speedY;
          ctx.fillStyle = p.color;
        }
      } else {
        p.x += p.speedX;
        p.y += p.speedY;
        ctx.fillStyle = p.color;
      }
      
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw mouse glow effect
    if (mouseInCanvas) {
      ctx.beginPath();
      const gradientGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
      gradientGlow.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
      gradientGlow.addColorStop(0.5, 'rgba(255, 0, 255, 0.05)');
      gradientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = gradientGlow;
      ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    requestAnimationFrame(animateCanvas);
  }
  
  initCanvas();
  animateCanvas();
  window.addEventListener('resize', initCanvas);
}

// ==================== ENHANCED LOGO ANIMATION ====================
function initLogoAnimation() {
  const brand = document.querySelector('.brand');
  const brandLogo = document.querySelector('.brand-logo');
  const brandText = document.querySelector('.brand-text');
  
  if (brand) {
    brand.addEventListener('mouseenter', function() {
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1.12) rotate(360deg)';
        brandLogo.style.borderColor = '#ffffff';
        brandLogo.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
        brandLogo.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      }
      
      if (brandText) {
        brandText.style.color = '#c9b698';
        brandText.style.letterSpacing = '4px';
        brandText.style.textShadow = '0 0 10px rgba(201, 182, 152, 0.5)';
        brandText.style.transition = 'all 0.4s ease';
      }
    });
    
    brand.addEventListener('mouseleave', function() {
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1) rotate(0)';
        brandLogo.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        brandLogo.style.boxShadow = 'none';
      }
      
      if (brandText) {
        brandText.style.color = '#ffffff';
        brandText.style.letterSpacing = '2px';
        brandText.style.textShadow = 'none';
      }
    });
  }
}

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      
      const icon = this.querySelector('i');
      if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        const icon = document.querySelector('.menu-toggle i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
}

// ==================== SCROLL TO TOP ====================
function initScrollTop() {
  const scrollTop = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  });
  
  if (scrollTop) {
    scrollTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==================== SHOPIFY BUTTON OBSERVER ====================
function initShopifyObserver() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        const shopifyBtn = document.querySelector('.shopify-buy__btn');
        if (shopifyBtn && !shopifyBtn.hasAttribute('data-listener')) {
          shopifyBtn.setAttribute('data-listener', 'true');
          shopifyBtn.classList.add('cyber-shopify-btn');
          shopifyBtn.addEventListener('click', function(e) {
            setTimeout(() => {
              showNotification('Product added to cart', 'success');
            }, 300);
          });
        }
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// ==================== INITIALIZE SHOPIFY PRODUCTS AND SORTING ====================
function initShopifyProducts() {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) ShopifyBuyInit();
    else loadScript();
  } else loadScript();

  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.head || document.body).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'shgx4k-wb.myshopify.com',
      storefrontAccessToken: '68f1ddeff53ca07083b438c92837d296',
    });

    ShopifyBuy.UI.onReady(client).then(function(ui) {
      // Product 1
      ui.createComponent("product", {
        id: "10743198351624",
        node: document.getElementById("product-1"),
        moneyFormat: "€{{amount_with_comma_separator}}",
        options: { 
          product: { 
            text: { button: "ADD TO CART" },
            styles: {
              button: {
                "background-color": "transparent",
                "color": "#1a1a1a",
                "border-radius": "0",
                "font-family": "inherit",
                "letter-spacing": "3px",
                "font-size": "12px"
              }
            }
          } 
        }
      });

      // Product 2
      ui.createComponent("product", {
        id: "10760158773512",
        node: document.getElementById("product-2"),
        moneyFormat: "€{{amount_with_comma_separator}}",
        options: { 
          product: { 
            text: { button: "ADD TO CART" },
            styles: {
              button: {
                "background-color": "transparent",
                "color": "#1a1a1a",
                "border-radius": "0",
                "font-family": "inherit",
                "letter-spacing": "3px",
                "font-size": "12px"
              }
            }
          } 
        }
      });

      // Product 3
      ui.createComponent("product", {
        id: "10761169862920",
        node: document.getElementById("product-component-1771470615559"),
        moneyFormat: "€{{amount_with_comma_separator}}",
        options: { 
          product: { 
            text: { button: "ADD TO CART" },
            styles: {
              button: {
                "background-color": "transparent",
                "color": "#1a1a1a",
                "border-radius": "0",
                "font-family": "inherit",
                "letter-spacing": "3px",
                "font-size": "12px"
              }
            }
          } 
        }
      });

      // Product 4
      ui.createComponent("product", {
        id: "10761230024968",
        node: document.getElementById("product-component-1771472196044"),
        moneyFormat: "€{{amount_with_comma_separator}}",
        options: { 
          product: { 
            text: { button: "ADD TO CART" },
            styles: {
              button: {
                "background-color": "transparent",
                "color": "#1a1a1a",
                "border-radius": "0",
                "font-family": "inherit",
                "letter-spacing": "3px",
                "font-size": "12px"
              }
            }
          } 
        }
      });

      // Product 5
      ui.createComponent("product", {
        id: "10761255387400",
        node: document.getElementById("product-component-1771472237564"),
        moneyFormat: "€{{amount_with_comma_separator}}",
        options: { 
          product: { 
            text: { button: "ADD TO CART" },
            styles: {
              button: {
                "background-color": "transparent",
                "color": "#1a1a1a",
                "border-radius": "0",
                "font-family": "inherit",
                "letter-spacing": "3px",
                "font-size": "12px"
              }
            }
          } 
        }
      });
      
      // After products are loaded, set up sorting and filtering
      setTimeout(() => {
        const container = document.getElementById('shopify-products');
        if (container) {
          const products = Array.from(container.children);
          originalOrder = [...products];
          
          // Add data-product-id attributes to each product
          const productIds = ['10743198351624', '10760158773512', '10761169862920', '10761230024968', '10761255387400'];
          products.forEach((el, index) => {
            if (productIds[index]) {
              el.setAttribute('data-product-id', productIds[index]);
            }
          });
          
          productsLoaded = true;
          showNotification('Shop loaded - Ready to shop!');
        }
        checkForProductHighlight();
      }, 1500);
    });
  }
}

// ==================== INITIALIZE FILTER AND SORT CONTROLS ====================
function initControls() {
  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      filterProducts(filter);
    });
  });
  
  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const sortType = this.value;
      sortProducts(sortType);
    });
  }
  
  // Load more button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      showNotification('More products coming soon! Stay tuned.', 'error');
    });
  }
  
  // Brand navigation
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', (e) => {
      e.preventDefault();
      showNotification('Returning to home');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 400);
    });
  }
}

// ==================== PRODUCT CARD HOVER EFFECTS ====================
function initProductHoverEffects() {
  const observer = new MutationObserver(function() {
    const productCards = document.querySelectorAll('.shopify-buy__product');
    productCards.forEach(card => {
      if (!card.hasAttribute('data-hover')) {
        card.setAttribute('data-hover', 'true');
        card.addEventListener('mouseenter', () => {
          card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        });
      }
    });
  });
  
  observer.observe(document.getElementById('shopify-products') || document.body, {
    childList: true,
    subtree: true
  });
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initCanvasBackground();
  initLogoAnimation();
  initMobileMenu();
  initScrollTop();
  initShopifyObserver();
  initShopifyProducts();
  initControls();
  initProductHoverEffects();
  
  console.log('GEARSOULS · Shop Page Fully Loaded - Sorting & Filtering Active');
});

// Export functions for global use
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.showNotification = showNotification;