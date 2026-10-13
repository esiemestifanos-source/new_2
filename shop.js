// ======================================================
// GEARSOULS · SHOP
// PayPal Cart SDK — 3 products only
// ======================================================

// ======================================================
// ⬇️ EDIT HERE — products, images, colors
// ======================================================
//
// • id          → your PayPal hosted button ID (do NOT change)
// • images      → 4 filenames for the 2x2 grid, in order:
//                 [top-left, top-right, bottom-left, bottom-right]
// • thumbs      → filenames for the thumbnail row (below grid)
// • colors      → list of color names for the dropdown
// • price       → shown on page (PayPal uses its own price)
//
// Replace the image filenames with your real ones.
// ======================================================

const PRODUCTS = [
  {
    id: 'UP39NSGJGCRVC',
    name: 'GEARSOULS BEANIE',
    price: 15.00,
    badge: '✦ NEW DROP',
    colors: ['Black', 'Red', 'Blue', 'White'],
    images: [
      'img/beanie-black.jpg',
      'img/beanie-red.jpg',
      'img/beanie-blue.jpg',
      'img/beanie-white.jpg'
    ],
    thumbs: [
      'img/beanie-black.jpg',
      'img/beanie-red.jpg',
      'img/beanie-blue.jpg',
      'img/beanie-white.jpg'
    ]
  },
  {
    id: '8BFGGXMHESFJE',
    name: 'STREET TANK-TOP',
    price: 25.00,
    badge: '✦ STREET',
    colors: ['Black', 'White'],
    images: [
      'img/tank-black.jpg',
      'img/tank-white.jpg',
      'img/tank-black-2.jpg',
      'img/tank-white-2.jpg'
    ],
    thumbs: [
      'img/tank-black.jpg',
      'img/tank-white.jpg',
      'img/tank-black-2.jpg',
      'img/tank-white-2.jpg'
    ]
  },
  {
    id: '3R7SKEB2X6DZ2',
    name: 'THE BEST RED TANK-TOP',
    price: 25.99,
    badge: '✦ LIMITED',
    colors: ['Red'],
    images: [
      'img/tank-red.jpg',
      'img/tank-red-2.jpg',
      'img/tank-red-3.jpg',
      'img/tank-red-4.jpg'
    ],
    thumbs: [
      'img/tank-red.jpg',
      'img/tank-red-2.jpg',
      'img/tank-red-3.jpg',
      'img/tank-red-4.jpg'
    ]
  }
];

// ======================================================
// DOM
// ======================================================

const container       = document.getElementById('shopify-products');
const notification    = document.getElementById('shopNotification');
const notificationMsg = document.getElementById('notificationMessage');

// ======================================================
// NOTIFICATION
// ======================================================

function showNotification(message) {
  if (!notification || !notificationMsg) return;
  notificationMsg.textContent = message;
  notification.classList.add('show');
  clearTimeout(window.notificationTimer);
  window.notificationTimer = setTimeout(() => {
    notification.classList.remove('show');
  }, 2200);
}
window.showNotification = showNotification;

// ======================================================
// RENDER — one card per product
// ======================================================

function renderProducts() {
  if (!container) return;

  container.innerHTML = PRODUCTS.map(p => {

    const imgs = p.images && p.images.length
      ? p.images
      : ['img/placeholder.jpg'];

    const thumbs = p.thumbs && p.thumbs.length
      ? p.thumbs
      : imgs;

    // Build 2x2 grid — pad to 4 cells if fewer images
    const gridImgs = [...imgs];
    while (gridImgs.length < 4) gridImgs.push(imgs[0]);

    // Color dropdown
    const colorOptions = (p.colors || []).map((c, i) =>
      `<option value="${c}" ${i === 0 ? 'selected' : ''}>${c}</option>`
    ).join('');

    return `
    <div class="custom-product-card" data-paypal-id="${p.id}">

      <!-- LEFT: MEDIA -->
      <div class="product-media">

        <div class="media-grid">
          ${gridImgs.slice(0, 4).map((src, i) => `
            <div class="media-cell" data-img="${src}">
              <img src="${src}" alt="${p.name} view ${i + 1}" loading="lazy"
                   onerror="this.style.opacity=0.15">
            </div>
          `).join('')}
        </div>

        <div class="media-thumbs">
          ${thumbs.map((src, i) => `
            <div class="media-thumb ${i === 0 ? 'active' : ''}" data-img="${src}">
              <img src="${src}" alt="${p.name} thumb ${i + 1}" loading="lazy"
                   onerror="this.style.opacity=0.15">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- RIGHT: BUY BOX -->
      <div class="product-info">

        <h2 class="product-name">${p.name}</h2>

        <div class="product-price">
          €${p.price.toFixed(2)}<small>EUR</small>
        </div>

        <div class="option-group">
          <label class="option-label" for="color-${p.id}">Color</label>
          <select class="option-select" id="color-${p.id}" data-role="color">
            ${colorOptions}
          </select>
        </div>

        <div class="option-group">
          <label class="option-label" for="qty-${p.id}">Quantity</label>
          <select class="option-select" id="qty-${p.id}" data-role="qty">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div class="purchase-area">
          <div class="paypal-add-wrapper">
            <paypal-add-to-cart-button data-id="${p.id}"></paypal-add-to-cart-button>
            <script>cartPaypal.AddToCart({ id: "${p.id}" });<\/script>
          </div>
        </div>

        <div class="trust-row">
          <div class="trust-item"><i class="fas fa-truck"></i> Free shipping over €99</div>
          <div class="trust-item"><i class="fas fa-rotate-left"></i> 30-day returns</div>
          <div class="trust-item"><i class="fas fa-shield-halved"></i> Secure checkout</div>
        </div>

      </div>
    </div>
    `;
  }).join('');

  attachInteractions();
}

// ======================================================
// INTERACTIONS — thumbnails swap the 2x2 grid
// ======================================================

function attachInteractions() {
  document.querySelectorAll('.custom-product-card').forEach(card => {

    const gridCells = card.querySelectorAll('.media-cell');
    const thumbs    = card.querySelectorAll('.media-thumb');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const src = thumb.dataset.img;
        if (!src || !gridCells.length) return;

        // Shift the grid images: main becomes the clicked thumb
        // (looks like PayPal's behaviour — swaps the hero image)
        const first = gridCells[0].querySelector('img');
        if (first) first.src = src;
      });
    });
  });
}

// ======================================================
// MOBILE MENU
// ======================================================

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav    = document.getElementById('mainNav');
  if (!menuToggle || !mainNav) return;

  const icon = menuToggle.querySelector('i');
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNav.classList.toggle('active');
    const open = mainNav.classList.contains('active');
    icon.classList.toggle('fa-bars', !open);
    icon.classList.toggle('fa-times', open);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') &&
        !mainNav.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      mainNav.classList.remove('active');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
}

// ======================================================
// BRAND → HOME
// ======================================================

function initBrand() {
  const brand = document.getElementById('brandLink');
  if (!brand) return;
  brand.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Returning to home…');
    setTimeout(() => { window.location.href = 'index.html'; }, 500);
  });
}

// ======================================================
// INIT
// ======================================================

function init() {
  renderProducts();
  initMobileMenu();
  initBrand();
  console.log('🛍️ GEARSOULS Shop ready — 3 PayPal products');
}

document.addEventListener('DOMContentLoaded', init);