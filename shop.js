// ======================================================
// GEARSOULS - SHOP PAGE
// Simple shop functionality with Shopify integration
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== CANVAS BACKGROUND ====================
  const canvas = document.getElementById('shopCanvas');
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
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
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
        // Check if Shopify button has loaded
        const shopifyBtn = document.querySelector('.shopify-buy__btn');
        if (shopifyBtn) {
          // Style the Shopify button to match your theme
          shopifyBtn.classList.add('cyber-shopify-btn');
          
          // Add click notification
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
// ==================== MOBILE MENU (LIKE INDEX.HTML) ====================
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
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
});
// ======================================================
// GEARSOULS - SHOP PAGE ENHANCEMENTS
// Mouse repelling particles with gentle wave background
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== GENTLE WAVE BACKGROUND WITH REPELLING STARS ====================
  const canvas = document.getElementById('shopCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    let mouseX = -1000, mouseY = -1000; // Start off screen
    let particles = [];
    let mouseInCanvas = false;
    
    // Track mouse movement for repelling effect
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
      
      // Create stars/particles (like the original)
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
      
      // Gentle gradient background (original style)
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#001a1a');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Gentle flowing waves (original style)
      time += 0.002;
      
      // Draw multiple wave layers (original)
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
      
      // Draw and update particles with mouse repelling effect
      particles.forEach(p => {
        // Mouse repelling effect
        if (mouseInCanvas) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 150;
          
          if (distance < repelRadius) {
            // Calculate repelling force (stronger when closer)
            const force = (repelRadius - distance) / repelRadius;
            const angle = Math.atan2(dy, dx);
            
            // Push particle away from mouse
            p.x += Math.cos(angle) * force * 3;
            p.y += Math.sin(angle) * force * 3;
            
            // Add some randomness to the movement when repelled
            p.x += (Math.random() - 0.5) * force * 2;
            p.y += (Math.random() - 0.5) * force * 2;
            
            // Change color temporarily when near mouse
            ctx.fillStyle = `rgba(255, 100, 255, ${Math.random() * 0.5 + 0.3})`;
          } else {
            // Regular movement when far from mouse
            p.x += p.speedX;
            p.y += p.speedY;
            ctx.fillStyle = p.color;
          }
        } else {
          // Regular movement when mouse not in canvas
          p.x += p.speedX;
          p.y += p.speedY;
          ctx.fillStyle = p.color;
        }
        
        // Wrap around screen edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Occasionally draw a small trail when near mouse
        if (mouseInCanvas) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            ctx.arc(p.x - p.speedX * 2, p.y - p.speedY * 2, p.radius * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, 0.1)`;
            ctx.fill();
          }
        }
      });
      
      // Draw mouse glow effect (visual feedback)
      if (mouseInCanvas) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.05)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw repel ring
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

  // ==================== REST OF YOUR ORIGINAL CODE ====================
  // (Keep all your existing code below this point)
  
  // Enhanced logo animation
  const brand = document.querySelector('.brand');
  const brandLogo = document.querySelector('.brand-logo');
  const brandText = document.querySelector('.brand-text');
  const brandHighlight = document.querySelector('.brand-highlight');
  
  if (brand) {
    brand.addEventListener('mouseenter', function() {
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1.15) rotate(5deg)';
        brandLogo.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        brandLogo.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)';
        brandLogo.style.borderColor = '#0ff';
      }
      
      if (brandText) {
        brandText.style.color = '#0ff';
        brandText.style.textShadow = '0 0 10px #0ff, 0 0 20px #f0f';
        brandText.style.transition = 'color 0.3s ease, text-shadow 0.3s ease';
        brandText.style.letterSpacing = '3px';
      }
      
      if (brandHighlight) {
        brandHighlight.style.color = '#f0f';
        brandHighlight.style.textShadow = '0 0 10px #f0f, 0 0 30px #0ff';
        brandHighlight.style.transition = 'color 0.3s ease, text-shadow 0.3s ease';
      }
      
      this.classList.add('brand-hover');
    });
    
    brand.addEventListener('mouseleave', function() {
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1) rotate(0)';
        brandLogo.style.boxShadow = 'none';
        brandLogo.style.borderColor = 'transparent';
      }
      
      if (brandText) {
        brandText.style.color = '#fff';
        brandText.style.textShadow = 'none';
        brandText.style.letterSpacing = '1px';
      }
      
      if (brandHighlight) {
        brandHighlight.style.color = '#0ff';
        brandHighlight.style.textShadow = 'none';
      }
      
      this.classList.remove('brand-hover');
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
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

  // Scroll to top
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

  // Notification function
  window.showNotification = function(message) {
    const notification = document.getElementById('shopNotification');
    const messageSpan = document.getElementById('notificationMessage');
    
    messageSpan.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  };

  // Observe Shopify button load
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

  // ==================== ADD SOME EXTRA COSMETIC ENHANCEMENTS ====================
  
  // Add a subtle glow to product cards on hover
  const productCards = document.querySelectorAll('.product-card, .shop-item');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3), 0 0 30px rgba(255, 0, 255, 0.2)';
      card.style.transition = 'box-shadow 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = 'none';
    });
  });

  // Add a small glow to buttons
  const buttons = document.querySelectorAll('button, .btn, .shopify-buy__btn');
  buttons.forEach(button => {
    button.style.transition = 'all 0.3s ease';
    button.addEventListener('mouseenter', () => {
      button.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.boxShadow = 'none';
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // ==================== CANVAS BACKGROUND WITH MOUSE REPELLING ====================
  const canvas = document.getElementById('homeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouseX = -1000, mouseY = -1000; // Start off screen
    let mouseInCanvas = false;
    let time = 0;

    // Track mouse movement
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

      // Create particle system
      particles = [];
      const particleCount = Math.floor(width * height / 6000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
          originalRadius: Math.random() * 3 + 1,
          color: `rgba(${Math.random() > 0.5 ? '0, 255, 255' : '255, 0, 255'}, ${Math.random() * 0.4 + 0.2})`,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    }

    function drawGrid() {
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      // Vertical
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + Math.sin(time) * 5, height);
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.05 + Math.sin(x * 0.01 + time) * 0.02})`;
        ctx.stroke();
      }
      // Horizontal
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.cos(time) * 5);
        ctx.strokeStyle = `rgba(255, 0, 255, ${0.05 + Math.cos(y * 0.01 + time) * 0.02})`;
        ctx.stroke();
      }
    }

    function drawParticles() {
      particles.forEach(p => {
        if (mouseInCanvas) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 180;

          if (distance < repelRadius) {
            const force = (repelRadius - distance) / repelRadius;
            const angle = Math.atan2(dy, dx);
            const repelStrength = 8;
            p.x += Math.cos(angle) * force * repelStrength + (Math.random() - 0.5) * force * 3;
            p.y += Math.sin(angle) * force * repelStrength + (Math.random() - 0.5) * force * 3;
            p.radius = p.originalRadius * (1 + force * 0.8);
            ctx.fillStyle = Math.random() > 0.5 ? '#0ff' : '#f0f';
          } else {
            p.x += p.vx;
            p.y += p.vy;
            p.radius = p.originalRadius;
            ctx.fillStyle = p.color;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;
          ctx.fillStyle = p.color;
        }

        // Wrap-around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
        ctx.shadowColor = p.color.includes('255, 255') ? '#0ff' : '#f0f';
        ctx.shadowBlur = 15 * pulse;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawMouseGlow() {
      if (!mouseInCanvas) return;
      // Inner glow
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#0ff';
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 60, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 255, 0.05)';
      ctx.fill();
      // Outer glow
      ctx.shadowColor = '#f0f';
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 0, 255, 0.03)';
      ctx.fill();
      // Repelling ring
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 180, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.setLineDash([5, 10]);
      ctx.stroke();
      // Inner ring
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 90, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 0, 255, 0.2)';
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#001f1f');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      time += 0.005;

      drawGrid();
      drawParticles();
      drawMouseGlow();

      requestAnimationFrame(animateCanvas);
    }

    initCanvas();
    animateCanvas();
    window.addEventListener('resize', initCanvas);
  }
});
