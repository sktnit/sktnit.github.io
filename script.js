
// Enhanced Sticky Navigation and Scroll Button
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
let val;

window.onscroll = function() {
  const scrollTop = document.documentElement.scrollTop;
  
  if(scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
    scrollBtn.style.animation = "slideInUp 0.5s ease forwards";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
}

// Enhanced scroll to top with animation
if (scrollBtn) {
  scrollBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add upward animation to page
    document.body.style.transition = 'transform 0.3s ease';
    document.body.style.transform = 'translateY(-10px)';
    
    // Smooth scroll to top
    const startPosition = window.pageYOffset;
    const duration = 800;
    let start = null;
    
    function animateScrollUp(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      // Smooth easing
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      window.scrollTo(0, startPosition * (1 - easeOutQuart));
      
      if (progress < duration) {
        requestAnimationFrame(animateScrollUp);
      } else {
        document.body.style.transform = 'translateY(0)';
        // Trigger home section animation
        const homeSection = document.querySelector('.home');
        if (homeSection) {
          homeSection.classList.add('animate-bounce');
        }
      }
    }
    
    requestAnimationFrame(animateScrollUp);
  });
}

// Add slideInUp animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Side Navigation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function(){
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function(){
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

// Enhanced Timeline Animation on Scroll
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.classList.add('animate-up');
        }, index * 200);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  timelineItems.forEach(item => {
    item.style.transform = 'translateY(60px) scale(0.95)';
    observer.observe(item);
  });
}

// Project Cards Hover Effect
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Enhanced smooth scrolling with animation effects
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Add scroll animation effect
        document.body.style.transition = 'all 0.3s ease';
        
        // Smooth scroll with custom behavior
        const startPosition = window.pageYOffset;
        const targetPosition = targetSection.offsetTop - 80;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animateScroll(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          
          // Easing function for smooth animation
          const easeInOutCubic = percentage < 0.5 
            ? 4 * percentage * percentage * percentage 
            : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
          
          window.scrollTo(0, startPosition + distance * easeInOutCubic);
          
          if (progress < duration) {
            requestAnimationFrame(animateScroll);
          } else {
            // Trigger section animation after scroll
            triggerSectionAnimation(targetSection);
          }
        }
        
        requestAnimationFrame(animateScroll);
      }
    });
  });
}

// Trigger animation for section elements
function triggerSectionAnimation(section) {
  const elements = section.querySelectorAll('.project-card, .box, .timeline-item');
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animate-bounce');
    }, index * 100);
  });
}

// Typing animation for home section
function initTypingAnimation() {
  const textElement = document.querySelector('.text-three');
  if (textElement) {
    const originalText = textElement.textContent;
    textElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        textElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }
}

// Enhanced scroll animations with staggered effects
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Different animations for different elements
        if (entry.target.classList.contains('project-card')) {
          entry.target.classList.add('animate-scale');
        } else if (entry.target.classList.contains('box')) {
          entry.target.classList.add('animate-bounce');
        } else if (entry.target.tagName === 'SECTION') {
          entry.target.classList.add('animate-up');
          
          // Stagger child elements
          const children = entry.target.querySelectorAll('.project-card, .box, .timeline-content');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 150);
          });
        } else {
          entry.target.classList.add('animate-in');
        }
        
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections with initial setup
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(60px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
  });

  // Observe skill boxes with staggered setup
  const skillBoxes = document.querySelectorAll('.skills-details .box');
  skillBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(40px) scale(0.9)';
    box.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(box);
  });

  // Observe project cards with enhanced effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotateX(10deg)';
    card.style.transition = `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
    observer.observe(card);
  });

  // Add scroll-based parallax effect
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.project-card, .timeline-content');
    
    parallaxElements.forEach((element, index) => {
      const rate = scrolled * -0.02 * (index % 3 + 1);
      element.style.transform += ` translateY(${rate}px)`;
    });
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  animateTimeline();
  initProjectCards();
  initSmoothScrolling();
  initTypingAnimation();
  initScrollAnimations();
});
