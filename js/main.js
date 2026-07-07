document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
  initCardTilt();
  initTypewriter();
  initCtaToast();
});

/* --- Theme Handler --- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('svg');
  
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'light') {
    // Sun icon
    themeToggle.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
      </svg>
    `;
  } else {
    // Moon icon
    themeToggle.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.6-.1 1.2.4 1.1 1-.1.4-.4.8-.7 1.1-3.4 3.4-3.4 9 0 12.4.3.3.6.7.7 1.1.1.6-.4 1.2-1.1 1.2zm-1.8-2.1c2-.7 3.5-2.2 4.4-4.1-3.8-1.5-6.6-4.9-7-9-2.1 1.6-3.4 4.1-3.4 7 0 4.4 3.6 8 8 8.1z"/>
      </svg>
    `;
  }
}

/* --- Particle Canvas System --- */
function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };
  
  // Handle resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  });
  
  // Mouse position
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = 0;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = Math.random() * 0.4 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.alpha = Math.random() * 0.6 + 0.1;
    }
    
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      
      // Wrap boundaries
      if (this.y > height) {
        this.reset();
      }
      if (this.x > width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      
      // Mouse interaction (repel slightly or attract based on theme)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 1.5;
          this.y += Math.sin(angle) * force * 1.5;
        }
      }
    }
    
    draw() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = isLight ? '#4f46e5' : '#06b6d4';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  function createParticles() {
    particles = [];
    const density = Math.floor((width * height) / 14000);
    for (let i = 0; i < Math.min(density, 120); i++) {
      particles.push(new Particle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }
  
  createParticles();
  animate();
}

/* --- Card 3D Tilt Effect --- */
function initCardTilt() {
  const card = document.querySelector('.glass-card');
  if (!card) return;
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Limits
    const limit = 10; // Max degree tilt
    const rotateX = -(y / (rect.height / 2)) * limit;
    const rotateY = (x / (rect.width / 2)) * limit;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
}

/* --- Typewriter Effect --- */
function initTypewriter() {
  const tagline = document.getElementById('typewriter-tagline');
  if (!tagline) return;
  
  const text = "A new digital beginning. Explore the beauty of absolute simplicity.";
  let index = 0;
  
  function type() {
    if (index < text.length) {
      tagline.innerHTML = text.substring(0, index + 1) + '<span class="typed-cursor">|</span>';
      index++;
      setTimeout(type, 45);
    } else {
      tagline.innerHTML = text + '<span class="typed-cursor">|</span>';
    }
  }
  
  // Start after a slight delay
  setTimeout(type, 800);
}

/* --- Interactive CTA Toast Modal --- */
function initCtaToast() {
  const ctaBtn = document.getElementById('cta-btn');
  const toast = document.getElementById('toast');
  if (!ctaBtn || !toast) return;
  
  ctaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Show toast
    toast.classList.add('show');
    
    // Play particle burst if canvas exists
    triggerBurst(e.clientX, e.clientY);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  });
}

/* Optional burst on button click */
function triggerBurst(clickX, clickY) {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Add some fast moving sparks at the click coordinates
  // We can inject temporary sparks into the global canvas particle system, 
  // but for simplicity and decoupling we will just do a simple log event or particle shift
  console.log(`Interaction registered at: X=${clickX}, Y=${clickY}`);
}
