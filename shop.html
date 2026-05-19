document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== PRELOADER ====================
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 800);
    }
  }, 2000);

// ==================== PRODUCT IMAGES DATA ====================
const productImages = [
  { id: 1, file: 'img/0005.jpeg', name: 'NEON RIDER JACKET', category: 'OUTERWEAR', featured: true, price: '$299' },
  { id: 2, file: 'img/0001.jpeg', name: 'CYBERPUNK HOODIE', category: 'HOODIES', featured: true, price: '$159' },
  { id: 3, file: 'img/0002.jpeg', name: 'GLITCH EFFECT TEE', category: 'T-SHIRTS', featured: false, price: '$79' },
  { id: 4, file: 'img/0003.jpeg', name: 'TECHWEAR PANTS', category: 'BOTTOMS', featured: true, price: '$229' },
  { id: 5, file: 'img/0004.jpeg', name: 'NEON STRIPE CREWNECK', category: 'SWEATERS', featured: false, price: '$139' },
  { id: 6, file: 'img/0006.jpeg', name: 'NEON STRIPE CREWNECK', category: 'HOODIES', featured: false, price: '$139' },
  { id: 7, file: 'img/0008.jpeg', name: 'NEON STRIPE CREWNECK', category: 'SWEATERS', featured: false, price: '$139' },
  { id: 8, file: 'img/0009.jpeg', name: 'COOL BLACK DUD', category: 'T-SHIRTS', featured: false, price: '$139' }
];


  // ==================== POPULATE GALLERY ====================
  const galleryGrid = document.getElementById('gallery-grid');
  const instagramGrid = document.getElementById('instagram-grid');
  
  if (galleryGrid) {
    galleryGrid.innerHTML = '';
    productImages.forEach((img) => {
      const item = document.createElement('div');
      item.className = `gallery-item reveal ${img.featured ? 'featured' : ''}`;
      item.innerHTML = `
        <div class="gallery-image-wrapper">
          <img src="${img.file}" alt="${img.name}">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <h3>${img.name}</h3>
              <p>${img.category} • ${img.price}</p>
            </div>
            <button class="gallery-preview-btn" onclick="openLightbox(${img.id})">
              <i class="fas fa-expand-alt"></i>
            </button>
          </div>
        </div>
      `;
      galleryGrid.appendChild(item);
    });
  }

  // ==================== POPULATE INSTAGRAM GRID ====================
  if (instagramGrid) {
    instagramGrid.innerHTML = '';
    productImages.forEach((img) => {
      const item = document.createElement('div');
      item.className = 'insta-item';
      item.innerHTML = `
        <img src="${img.file}" alt="${img.name}">
        <div class="insta-overlay">
          <i class="fab fa-instagram"></i>
        </div>
      `;
      instagramGrid.appendChild(item);
    });
  }

  // ==================== LIGHTBOX ====================
  window.openLightbox = function(id) {
    const img = productImages.find(p => p.id === id);
    if (!img) return;
    
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = img.file;
    document.getElementById('lightbox-title').textContent = img.name;
    document.getElementById('lightbox-desc').textContent = `${img.category} • ${img.price}`;
    lightbox.classList.add('active');
    lightbox.setAttribute('data-current-id', img.id);
  };

  document.querySelector('.lightbox-close').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('active');
  });

  // ==================== CANVAS BACKGROUND ====================
  const canvas = document.getElementById('homeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    
    function init() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2
        });
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      requestAnimationFrame(animate);
    }
    
    init();
    animate();
    window.addEventListener('resize', init);
  }

  // ==================== SCROLL ANIMATIONS ====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('show'));
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ==================== SCROLL TO TOP ====================
  const scrollTop = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('visible', window.scrollY > 500);
  });
  
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== MOBILE MENU ====================
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
  });

  // ==================== NEWSLETTER ====================
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('SUBSCRIBED! CHECK YOUR EMAIL.');
    e.target.reset();
  });
});
// ==================== LOGO ANIMATION FOR HOME PAGE ====================
document.addEventListener('DOMContentLoaded', function() {
  
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
    });
  }
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
