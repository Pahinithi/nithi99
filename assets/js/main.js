/**
* Template Name: Personal
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const header = select('#header')
    const offset = header.offsetHeight

    const elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Enhanced scroll with offset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      // Close mobile nav when clicking a link
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        document.body.classList.remove('mobile-nav-active')
        document.body.style.overflow = ''
        
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.remove('bi-x')
        navbarToggle.classList.add('bi-list')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Smooth scroll for all internal links
   */
  on('click', 'a[href^="#"]', function(e) {
    const href = this.getAttribute('href')
    if (href !== '#' && href !== '#header') {
      e.preventDefault()
      scrollto(href)
    }
  })

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Enhanced Skills animation with intersection observer
   */
  const skillsContent = select('.skills-content');
  if (skillsContent) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let progress = select('.progress .progress-bar', true);
          progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });
    
    observer.observe(skillsContent);
  }

  /**
   * Enhanced About section animations
   */
  const aboutSection = select('#about');
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate resume items
          let resumeItems = select('.resume .resume-item', true);
          resumeItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 300);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });
    
    observer.observe(aboutSection);
  }

  /**
   * Enhanced Testimonials slider with better mobile support
   */
  const testimonialsSlider = new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });

  /**
   * Enhanced Portfolio isotope and filter with better mobile support
   */
  window.addEventListener('load', () => {
    // Academic Projects Portfolio
    let academicPortfolioContainer = select('#academic-projects .portfolio-container');
    if (academicPortfolioContainer) {
      let academicPortfolioIsotope = new Isotope(academicPortfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.4s'
      });

      let academicPortfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        academicPortfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        academicPortfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

    // Learning Projects Portfolio
    let learningPortfolioContainer = select('#learning-projects .portfolio-container');
    if (learningPortfolioContainer) {
      let learningPortfolioIsotope = new Isotope(learningPortfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.4s'
      });

      let learningPortfolioFilters = select('#learning-projects-flters li', true);

      on('click', '#learning-projects-flters li', function(e) {
        e.preventDefault();
        learningPortfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        learningPortfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

    // Personal Projects Portfolio
    let personalPortfolioContainer = select('#personal-projects .portfolio-container');
    if (personalPortfolioContainer) {
      let personalPortfolioIsotope = new Isotope(personalPortfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.4s'
      });

      let personalPortfolioFilters = select('#personal-projects-flters li', true);

      on('click', '#personal-projects-flters li', function(e) {
        e.preventDefault();
        personalPortfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        personalPortfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  /**
   * Enhanced portfolio lightbox with mobile optimizations
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  });

  /**
   * Enhanced portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh',
    touchNavigation: true
  });

  /**
   * Enhanced Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
  });

  /**
   * Initiate Pure Counter with intersection observer
   */
  const counters = select('.purecounter', true);
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          new PureCounter().start();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }

  /**
   * Add loading states for better UX
   */
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  /**
   * Handle window resize for responsive behavior
   */
  window.addEventListener('resize', () => {
    const navbar = select('#navbar');
    if (window.innerWidth > 991 && navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      document.body.classList.remove('mobile-nav-active');
      document.body.style.overflow = '';
      
      const navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.remove('bi-x');
      navbarToggle.classList.add('bi-list');
    }
  });

  // Auto-close mobile nav menu when a link is clicked (for checkbox hack)
  document.addEventListener('DOMContentLoaded', function() {
    var mobileNavToggle = document.getElementById('mobile-nav-toggle');
    var mobileNav = document.getElementById('mobile-nav');
    if (mobileNavToggle && mobileNav) {
      var links = mobileNav.querySelectorAll('a');
      links.forEach(function(link) {
        link.addEventListener('click', function() {
          mobileNavToggle.checked = false;
        });
      });
    }
  });

})()