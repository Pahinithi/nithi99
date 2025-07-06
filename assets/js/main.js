/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 05 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate portfolio lightbox specifically
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    plyr: {
      css: 'https://cdn.plyr.io/3.6.8/plyr.css',
      js: 'https://cdn.plyr.io/3.6.8/plyr.js'
    }
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init modern portfolio filters
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Modern Portfolio Filters for Learning Projects
    const portfolioFilters = document.querySelectorAll('#learning-projects-flters li');
    const portfolioContainer = document.querySelector('.modern-portfolio');
    
    if (portfolioFilters.length > 0 && portfolioContainer) {
      portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all filters
          portfolioFilters.forEach(f => f.classList.remove('filter-active'));
          
          // Add active class to clicked filter
          this.classList.add('filter-active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Get all portfolio items
          const portfolioItems = portfolioContainer.querySelectorAll('.portfolio-item');
          
          // Show/hide items based on filter
          portfolioItems.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
              item.style.display = 'block';
              item.style.animation = 'fadeInUp 0.6s ease-out forwards';
              item.style.opacity = '0';
              setTimeout(() => {
                item.style.opacity = '1';
              }, 100);
            } else {
              item.style.display = 'none';
            }
          });
          
          // Reinitialize AOS for new items
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        });
      });
    }
    
    // Personal Projects Filters
    const personalProjectFilters = document.querySelectorAll('#personal-projects-flters li');
    const personalProjectContainer = document.querySelector('.modern-portfolio');
    
    if (personalProjectFilters.length > 0 && personalProjectContainer) {
      personalProjectFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all filters
          personalProjectFilters.forEach(f => f.classList.remove('filter-active'));
          
          // Add active class to clicked filter
          this.classList.add('filter-active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Get all portfolio items
          const portfolioItems = personalProjectContainer.querySelectorAll('.portfolio-item');
          
          // Show/hide items based on filter
          portfolioItems.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
              item.style.display = 'block';
              item.style.animation = 'fadeInUp 0.6s ease-out forwards';
              item.style.opacity = '0';
              setTimeout(() => {
                item.style.opacity = '1';
              }, 100);
            } else {
              item.style.display = 'none';
            }
          });
          
          // Reinitialize AOS for new items
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        });
      });
    }
    
    // Also handle regular portfolio filters (for other pages)
    const regularPortfolioFilters = document.querySelectorAll('#portfolio-flters li');
    const regularPortfolioContainer = document.querySelector('.portfolio-container');
    
    if (regularPortfolioFilters.length > 0 && regularPortfolioContainer) {
      regularPortfolioFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all filters
          regularPortfolioFilters.forEach(f => f.classList.remove('filter-active'));
          
          // Add active class to clicked filter
          this.classList.add('filter-active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Get all portfolio items
          const portfolioItems = regularPortfolioContainer.querySelectorAll('.portfolio-item');
          
          // Show/hide items based on filter
          portfolioItems.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
              item.style.display = 'block';
              item.style.animation = 'fadeInUp 0.6s ease-out forwards';
              item.style.opacity = '0';
              setTimeout(() => {
                item.style.opacity = '1';
              }, 100);
            } else {
              item.style.display = 'none';
            }
          });
          
          // Reinitialize AOS for new items
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        });
      });
    }
  });

  // Enhanced Button Interactions
  document.addEventListener('DOMContentLoaded', function() {
    // Download Resume Button Enhancement
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
        // Add loading state
        this.classList.add('loading');
        this.querySelector('i').classList.remove('bi-download');
        this.querySelector('i').classList.add('bi-arrow-clockwise');
        
        // Simulate download delay for better UX
        setTimeout(() => {
          this.classList.remove('loading');
          this.querySelector('i').classList.remove('bi-arrow-clockwise');
          this.querySelector('i').classList.add('bi-download');
        }, 2000);
      });
    }

    // LinkedIn Button Enhancement
    const linkedinBtn = document.getElementById('linkedinBtn');
    if (linkedinBtn) {
      linkedinBtn.addEventListener('click', function(e) {
        // Add brief loading state
        this.classList.add('loading');
        this.querySelector('i').classList.remove('bi-linkedin');
        this.querySelector('i').classList.add('bi-arrow-clockwise');
        
        setTimeout(() => {
          this.classList.remove('loading');
          this.querySelector('i').classList.remove('bi-arrow-clockwise');
          this.querySelector('i').classList.add('bi-linkedin');
        }, 1000);
      });
    }

    // Enhanced button hover effects
    const actionButtons = document.querySelectorAll('.action-section .btn');
    actionButtons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.05)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
      
      // Add ripple effect on click
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  });

  // Add ripple effect styles
  const style = document.createElement('style');
  style.textContent = `
    .action-section .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

})();