// ======================================================
// GEARSOULS - ACCOUNT PAGE FUNCTIONALITY
// Handles UI, animations, and dashboard
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== CANVAS BACKGROUND ====================
  const canvas = document.getElementById('accountCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
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
          radius: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: `rgba(0, ${Math.floor(Math.random() * 155 + 100)}, 255, ${Math.random() * 0.3})`
        });
      }
    }
    
    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      
      requestAnimationFrame(animateCanvas);
    }
    
    initCanvas();
    animateCanvas();
    
    window.addEventListener('resize', initCanvas);
  }
  
  // ==================== PASSWORD TOGGLE ====================
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
      }
    });
  });
  
  // ==================== MOBILE MENU ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
  
  // ==================== SCROLL TO TOP ====================
  const scrollTop = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  });
  
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // ==================== INPUT ANIMATIONS ====================
  document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});

// ==================== FORM SWITCHING ====================
window.showForm = function(formName) {
  // Hide all forms
  document.querySelectorAll('.auth-form').forEach(form => {
    form.classList.remove('active');
  });
  
  // Show selected form
  document.getElementById(formName + 'Form').classList.add('active');
  
  // Update URL hash
  window.location.hash = formName;
};

// Check URL hash on load
window.addEventListener('load', () => {
  if (window.location.hash === '#signup') {
    showForm('signup');
  } else if (window.location.hash === '#reset') {
    showForm('reset');
  } else {
    showForm('signin');
  }
});

// ==================== WISHLIST FUNCTIONS ====================
window.saveToWishlist = function(productId, productName, productImage, productPrice) {
  let wishlist = JSON.parse(localStorage.getItem('gearsouls_wishlist')) || [];
  
  // Check if already exists
  const exists = wishlist.some(item => item.id === productId);
  
  if (!exists) {
    wishlist.push({
      id: productId,
      name: productName,
      image: productImage,
      price: productPrice,
      date: new Date().toISOString()
    });
    
    localStorage.setItem('gearsouls_wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
    
    // Show notification
    showNotification('ITEM SAVED TO WISHLIST', 'success');
  } else {
    showNotification('ITEM ALREADY IN WISHLIST', 'info');
  }
};

window.removeFromWishlist = function(productId) {
  let wishlist = JSON.parse(localStorage.getItem('gearsouls_wishlist')) || [];
  wishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('gearsouls_wishlist', JSON.stringify(wishlist));
  updateWishlistDisplay();
  showNotification('ITEM REMOVED FROM WISHLIST', 'info');
};

window.updateWishlistDisplay = function() {
  const savedGrid = document.getElementById('savedItemsGrid');
  const savedCount = document.getElementById('savedCount');
  
  if (!savedGrid) return;
  
  const wishlist = JSON.parse(localStorage.getItem('gearsouls_wishlist')) || [];
  
  if (savedCount) {
    savedCount.textContent = wishlist.length;
  }
  
  if (wishlist.length === 0) {
    savedGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-box-open"></i>
        <p>YOUR WISHLIST IS EMPTY</p>
        <a href="shop.html" class="shop-link-small">EXPLORE COLLECTION</a>
      </div>
    `;
  } else {
    savedGrid.innerHTML = wishlist.map(item => `
      <div class="saved-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="saved-item-info">
          <h4>${item.name}</h4>
          <p>${item.price}</p>
        </div>
        <button class="remove-item" onclick="removeFromWishlist('${item.id}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  }
};

// ==================== ACTIVITY TRACKING ====================
window.addActivity = function(action, details) {
  let activities = JSON.parse(localStorage.getItem('gearsouls_activities')) || [];
  
  activities.unshift({
    action: action,
    details: details,
    time: new Date().toLocaleString(),
    icon: getActivityIcon(action)
  });
  
  // Keep only last 10 activities
  if (activities.length > 10) {
    activities.pop();
  }
  
  localStorage.setItem('gearsouls_activities', JSON.stringify(activities));
  updateActivityDisplay();
};

function getActivityIcon(action) {
  const icons = {
    'login': 'fa-sign-in-alt',
    'signup': 'fa-user-plus',
    'wishlist_add': 'fa-heart',
    'wishlist_remove': 'fa-heart-broken',
    'order': 'fa-shopping-bag',
    'password_change': 'fa-key'
  };
  return icons[action] || 'fa-history';
}

window.updateActivityDisplay = function() {
  const activityList = document.getElementById('activityList');
  if (!activityList) return;
  
  const activities = JSON.parse(localStorage.getItem('gearsouls_activities')) || [];
  
  if (activities.length === 0) {
    activityList.innerHTML = `
      <div class="empty-state small">
        <p>NO RECENT ACTIVITY</p>
      </div>
    `;
  } else {
    activityList.innerHTML = activities.map(act => `
      <div class="activity-item">
        <i class="fas ${act.icon}"></i>
        <div class="activity-details">
          <span class="activity-action">${act.action.replace('_', ' ').toUpperCase()}</span>
          <span class="activity-time">${act.time}</span>
        </div>
      </div>
    `).join('');
  }
};

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `cyber-notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// Initialize wishlist and activity on load
window.updateWishlistDisplay();
window.updateActivityDisplay();

// ==================== UPDATE DASHBOARD WITH USER DATA ====================
window.updateDashboard = function(user) {
  const authCard = document.getElementById('authCard');
  const dashboardCard = document.getElementById('dashboardCard');
  const userStatus = document.getElementById('userStatus');
  const userGreeting = document.getElementById('userGreeting');
  const userDisplayName = document.getElementById('userDisplayName');
  const userEmail = document.getElementById('userEmail');
  
  if (user) {
    // Show dashboard, hide auth card
    authCard.style.display = 'none';
    dashboardCard.style.display = 'block';
    
    // Update user info
    const userName = user.displayName || user.email.split('@')[0].toUpperCase();
    userGreeting.textContent = 'WELCOME BACK,';
    userDisplayName.textContent = userName;
    userEmail.textContent = user.email;
    
    // Add login activity
    addActivity('login', 'Logged in successfully');
    
    // Update stats (you can fetch these from your backend)
    document.getElementById('orderCount').textContent = '3';
    document.getElementById('wishlistCount').textContent = 
      JSON.parse(localStorage.getItem('gearsouls_wishlist') || '[]').length;
    document.getElementById('pointsCount').textContent = '1250';
    
  } else {
    // Show auth card, hide dashboard
    authCard.style.display = 'block';
    dashboardCard.style.display = 'none';
    if (userStatus) {
      userStatus.textContent = 'NOT CONNECTED';
    }
  }
};
// ======================================================
// GEARSOULS - SHOP PAGE
// Simple shop functionality with Shopify integration
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== GENTLE BACKGROUND ANIMATION ====================
  const canvas = document.getElementById('shopCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    
    function initCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    
    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      
      // Gentle gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#001a1a');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Gentle flowing waves
      time += 0.002;
      
      // Draw multiple wave layers
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
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Second wave going opposite direction
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 0, 255, ${opacity * 0.7})`;
        
        for (let x = 0; x < width; x += 30) {
          const y = height / 3 + 
                    Math.cos(x * 0.004 + time * (speed + 0.2)) * (amplitude * 0.8) + 
                    Math.sin(x * 0.002 + time * 0.5) * (amplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      // Gentle floating particles (very subtle)
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.5 + i) * width * 0.4) + width * 0.5;
        const y = (Math.cos(time * 0.3 + i) * height * 0.3) + height * 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, 0.1)`;
        ctx.fill();
      }
      
      requestAnimationFrame(animateCanvas);
    }
    
    initCanvas();
    animateCanvas();
    
    window.addEventListener('resize', initCanvas);
  }

  // ==================== ENHANCED LOGO ANIMATION ====================
  const brand = document.querySelector('.brand');
  const brandLogo = document.querySelector('.brand-logo');
  const brandText = document.querySelector('.brand-text');
  const brandHighlight = document.querySelector('.brand-highlight');
  
  if (brand) {
    brand.addEventListener('mouseenter', function() {
      // Logo animation
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1.15) rotate(5deg)';
        brandLogo.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        brandLogo.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)';
        brandLogo.style.borderColor = '#0ff';
      }
      
      // Text animation
      if (brandText) {
        brandText.style.color = '#0ff';
        brandText.style.textShadow = '0 0 10px #0ff, 0 0 20px #f0f';
        brandText.style.transition = 'color 0.3s ease, text-shadow 0.3s ease';
        brandText.style.letterSpacing = '3px';
      }
      
      // Highlight animation
      if (brandHighlight) {
        brandHighlight.style.color = '#f0f';
        brandHighlight.style.textShadow = '0 0 10px #f0f, 0 0 30px #0ff';
        brandHighlight.style.transition = 'color 0.3s ease, text-shadow 0.3s ease';
      }
      
      // Add a gentle pulse animation class
      this.classList.add('brand-hover');
    });
    
    brand.addEventListener('mouseleave', function() {
      // Reset logo
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1) rotate(0)';
        brandLogo.style.boxShadow = 'none';
        brandLogo.style.borderColor = 'transparent';
      }
      
      // Reset text
      if (brandText) {
        brandText.style.color = '#fff';
        brandText.style.textShadow = 'none';
        brandText.style.letterSpacing = '1px';
      }
      
      // Reset highlight
      if (brandHighlight) {
        brandHighlight.style.color = '#0ff';
        brandHighlight.style.textShadow = 'none';
      }
      
      // Remove pulse animation class
      this.classList.remove('brand-hover');
    });
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // ==================== SCROLL TO TOP ====================
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

  // ==================== NOTIFICATION FUNCTION ====================
  window.showNotification = function(message) {
    const notification = document.getElementById('shopNotification');
    const messageSpan = document.getElementById('notificationMessage');
    
    messageSpan.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  };

  // ==================== OBSERVE SHOPIFY BUTTON LOAD ====================
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        const shopifyBtn = document.querySelector('.shopify-buy__btn');
        if (shopifyBtn) {
          shopifyBtn.classList.add('cyber-shopify-btn');
          
          shopifyBtn.addEventListener('click', function() {
            setTimeout(() => {
              showNotification('Product added to cart');
            }, 500);
          });
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
// ======================================================
// GEARSOULS - ACCOUNT PAGE FUNCTIONALITY
// Handles UI, animations, and dashboard
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== CANVAS BACKGROUND ====================
  const canvas = document.getElementById('accountCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
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
          radius: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: `rgba(0, ${Math.floor(Math.random() * 155 + 100)}, 255, ${Math.random() * 0.3})`
        });
      }
    }
    
    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      
      requestAnimationFrame(animateCanvas);
    }
    
    initCanvas();
    animateCanvas();
    
    window.addEventListener('resize', initCanvas);
  }
  
  // ==================== PASSWORD TOGGLE ====================
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
      }
    });
  });
  
  // ==================== MOBILE MENU (LIKE INDEX.HTML) ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      
      // Change icon
      const icon = this.querySelector('i');
      if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close menu when clicking on a nav link
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
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && menuToggle) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }
  });
  
  // Close menu on window resize
  window.addEventListener('resize', function() {
    if (nav && window.innerWidth > 768 && nav.classList.contains('active')) {
      nav.classList.remove('active');
      const icon = document.querySelector('.menu-toggle i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
  
  // ==================== SCROLL TO TOP ====================
  const scrollTop = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  });
  
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // ==================== INPUT ANIMATIONS ====================
  document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});

// ==================== FORM SWITCHING ====================
window.showForm = function(formName) {
  // Hide all forms
  document.querySelectorAll('.auth-form').forEach(form => {
    form.classList.remove('active');
  });
  
  // Show selected form
  document.getElementById(formName + 'Form').classList.add('active');
  
  // Update URL hash
  window.location.hash = formName;
};

// Check URL hash on load
window.addEventListener('load', () => {
  if (window.location.hash === '#signup') {
    showForm('signup');
  } else if (window.location.hash === '#reset') {
    showForm('reset');
  } else {
    showForm('signin');
  }
});

// ==================== WISHLIST FUNCTIONS ====================
window.saveToWishlist = function(productId, productName, productImage, productPrice) {
  let wishlist = JSON.parse(localStorage.getItem('gearsouls_wishlist')) || [];
  
  // Check if already exists
  const exists = wishlist.some(item => item.id === productId);
  
  if (!exists) {
    wishlist.push({
      id: productId,
      name: productName,
      image: productImage,
      price: productPrice,
      date: new Date().toISOString()
    });
    
    localStorage.setItem('gearsouls_wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
    
    // Show notification
    showNotification('ITEM SAVED TO WISHLIST', 'success');
  } else {
    showNotification('ITEM ALREADY IN WISHLIST', 'info');
  }
};

window.removeFromWishlist = function(productId) {
  let wishlist = JSON.parse(localStorage.getItem('gearsouls_wishlist')) || [];
  wishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('gearsouls_wishlist', JSON.stringify(wishlist));
  updateWishlistDisplay();
  showNotification('ITEM REMOVED FROM WISHLIST', 'info');
};

window.updateWishlistDisplay = function() {
  const savedGrid = document.getElementById('savedItemsGrid');
  const savedCount = document.getElementById('savedCount');
  
  if (!savedGrid) return;
  
  const wishlist = JSON.parse(localStorage.getItem('gearsouls_wishlist')) || [];
  
  if (savedCount) {
    savedCount.textContent = wishlist.length;
  }
  
  if (wishlist.length === 0) {
    savedGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-box-open"></i>
        <p>YOUR WISHLIST IS EMPTY</p>
        <a href="shop.html" class="shop-link-small">EXPLORE COLLECTION</a>
      </div>
    `;
  } else {
    savedGrid.innerHTML = wishlist.map(item => `
      <div class="saved-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="saved-item-info">
          <h4>${item.name}</h4>
          <p>${item.price}</p>
        </div>
        <button class="remove-item" onclick="removeFromWishlist('${item.id}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  }
};

// ==================== ACTIVITY TRACKING ====================
window.addActivity = function(action, details) {
  let activities = JSON.parse(localStorage.getItem('gearsouls_activities')) || [];
  
  activities.unshift({
    action: action,
    details: details,
    time: new Date().toLocaleString(),
    icon: getActivityIcon(action)
  });
  
  // Keep only last 10 activities
  if (activities.length > 10) {
    activities.pop();
  }
  
  localStorage.setItem('gearsouls_activities', JSON.stringify(activities));
  updateActivityDisplay();
};

function getActivityIcon(action) {
  const icons = {
    'login': 'fa-sign-in-alt',
    'signup': 'fa-user-plus',
    'wishlist_add': 'fa-heart',
    'wishlist_remove': 'fa-heart-broken',
    'order': 'fa-shopping-bag',
    'password_change': 'fa-key'
  };
  return icons[action] || 'fa-history';
}

window.updateActivityDisplay = function() {
  const activityList = document.getElementById('activityList');
  if (!activityList) return;
  
  const activities = JSON.parse(localStorage.getItem('gearsouls_activities')) || [];
  
  if (activities.length === 0) {
    activityList.innerHTML = `
      <div class="empty-state small">
        <p>NO RECENT ACTIVITY</p>
      </div>
    `;
  } else {
    activityList.innerHTML = activities.map(act => `
      <div class="activity-item">
        <i class="fas ${act.icon}"></i>
        <div class="activity-details">
          <span class="activity-action">${act.action.replace('_', ' ').toUpperCase()}</span>
          <span class="activity-time">${act.time}</span>
        </div>
      </div>
    `).join('');
  }
};

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `cyber-notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// Initialize wishlist and activity on load
window.updateWishlistDisplay();
window.updateActivityDisplay();

// ==================== UPDATE DASHBOARD WITH USER DATA ====================
window.updateDashboard = function(user) {
  const authCard = document.getElementById('authCard');
  const dashboardCard = document.getElementById('dashboardCard');
  const userStatus = document.getElementById('userStatus');
  const userGreeting = document.getElementById('userGreeting');
  const userDisplayName = document.getElementById('userDisplayName');
  const userEmail = document.getElementById('userEmail');
  
  if (user) {
    // Show dashboard, hide auth card
    authCard.style.display = 'none';
    dashboardCard.style.display = 'block';
    
    // Update user info
    const userName = user.displayName || user.email.split('@')[0].toUpperCase();
    userGreeting.textContent = 'WELCOME BACK,';
    userDisplayName.textContent = userName;
    userEmail.textContent = user.email;
    
    // Add login activity
    addActivity('login', 'Logged in successfully');
    
    // Update stats (you can fetch these from your backend)
    document.getElementById('orderCount').textContent = '3';
    document.getElementById('wishlistCount').textContent = 
      JSON.parse(localStorage.getItem('gearsouls_wishlist') || '[]').length;
    document.getElementById('pointsCount').textContent = '1250';
    
  } else {
    // Show auth card, hide dashboard
    authCard.style.display = 'block';
    dashboardCard.style.display = 'none';
    if (userStatus) {
      userStatus.textContent = 'NOT CONNECTED';
    }
  }
};