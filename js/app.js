// ============================================================
// TEKNIC EUCHNER — JS EXPLANATION FILE
// Purpose: Adds animations & interactivity, shows JS basics
// Uses: DOM, Events, IntersectionObserver, scroll, class toggle
// ============================================================

// IIFE: Immediately Invoked Function Expression — ( ()=>{} )() 
// Creates private scope so variables don't leak to global window
(() => {

  // --- 1. REVEAL ON SCROLL (IntersectionObserver API) ---
  // document.querySelectorAll: selects all elements with class .reveal (85+ sections/cards)
  const reveals = document.querySelectorAll('.reveal');

  // IntersectionObserver: modern API to detect when element enters viewport (better than scroll event)
  const io = new IntersectionObserver((entries) => {
    // entries = array of observed elements that changed visibility
    entries.forEach(e => {
      // e.isIntersecting = true when element is visible on screen
      if (e.isIntersecting) {
        // classList.add: adds CSS class .is-visible which triggers CSS transition (opacity 0→1, translateY 18px→0)
        e.target.classList.add('is-visible');
        // unobserve: stop watching this element after it animated once (performance)
        io.unobserve(e.target);
      }
    });
  }, { 
    threshold: 0.12, // 12% of element must be visible to trigger
    rootMargin: '0px 0px -40px 0px' // margin shrinks bottom by 40px so animation starts a bit earlier
  });

  // forEach: loop over each reveal element and start observing it
  reveals.forEach(el => io.observe(el));


  // --- 2. HEADER SCROLL BEHAVIOR ---
  // getElementById: selects header by id="header"
  const header = document.getElementById('header');
  let lastY = 0; // variable to remember last scroll position
  // addEventListener scroll: runs function on every scroll (passive:true improves performance)
  window.addEventListener('scroll', () => {
    const y = window.scrollY; // current vertical scroll position in pixels
    // if scrolled >20px, add stronger shadow; else light shadow — visual feedback
    if (y > 20) header.style.boxShadow = '0 8px 32px rgba(0,0,0,.35)';
    else header.style.boxShadow = '0 4px 24px rgba(0,0,0,.25)';

    // Hide header when scrolling down past 400px, show when scrolling up (like mobile apps)
    if (y > 400 && y > lastY) header.style.transform = 'translateX(-50%) translateY(-88px)';
    else header.style.transform = 'translateX(-50%) translateY(0)';
    lastY = y; // update last position for next comparison
  }, { passive: true }); // passive tells browser we won't call preventDefault

  // --- 3. BURGER MENU TOGGLE (mobile) ---
  // querySelector: selects first matching element (.header__burger)
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  // if burger exists (on mobile it does)
  if (burger) {
    // click event: runs when user taps hamburger
    burger.addEventListener('click', () => {
      // classList.toggle: adds class if missing, removes if present; returns true if added
      const isOpen = nav.classList.toggle('is-open');
      // Ternary operator: condition ? valueIfTrue : valueIfFalse — sets inline styles for mobile menu
      nav.style.display = isOpen ? 'flex' : ''; // flex shows, '' resets
      nav.style.position = isOpen ? 'absolute' : '';
      nav.style.top = isOpen ? '70px' : '';
      nav.style.left = isOpen ? '0' : '';
      nav.style.right = isOpen ? '0' : '';
      nav.style.background = isOpen ? '#151B20' : '';
      nav.style.padding = isOpen ? '16px' : '';
      nav.style.borderRadius = isOpen ? '10px' : '';
      nav.style.flexDirection = isOpen ? 'column' : '';
    });
  }

  // --- 4. SMOOTH SCROLL WITH HEADER OFFSET ---
  // querySelectorAll: selects all anchors with href starting with "#"
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    // forEach anchor, add click listener
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href'); // get href value like "#products"
      if (id.length > 1) { // ignore just "#"
        const target = document.querySelector(id); // select target section by id
        if (target) {
          e.preventDefault(); // stop default jump behavior
          // getBoundingClientRect().top = distance from viewport top, + scrollY = absolute position
          const top = target.getBoundingClientRect().top + window.scrollY - 72; // -72px offset for fixed header height so title not hidden
          window.scrollTo({ top, behavior: 'smooth' }); // smooth scroll API
        }
      }
    });
  });

  // --- 5. PRODUCT CARD 3D TILT ON MOUSEMOVE ---
  // Selects all cards for hover effect
  const cards = document.querySelectorAll('.product-card, .why__card, .stat');
  cards.forEach(card => {
    // mousemove: fires when mouse moves over card
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect(); // card position/size
      // Calculate mouse position relative to card center (-0.5 to 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // transform: translateY lifts card, perspective + rotateX/Y creates 3D tilt
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
    });
    // mouseleave: reset when mouse leaves card
    card.addEventListener('mouseleave', () => {
      card.style.transform = ''; // empty string removes inline style, returns to CSS default
    });
  });

  // --- 6. PARALLAX HERO VIDEO ---
  const hero = document.querySelector('.hero__media'); // hero video element
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.22; // 0.22 = slower than scroll (parallax speed)
      hero.style.transform = `translateY(${y}px) scale(1.04)`; // move down + slight scale
    }, { passive: true });
  }

  // --- 7. BUTTON MAGNETIC HOVER (letter-spacing) ---
  document.querySelectorAll('.btn--red').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.letterSpacing = '0.03em'); // expands text a bit
    btn.addEventListener('mouseleave', () => btn.style.letterSpacing = ''); // reset
  });

  // --- 8. VIDEO FALLBACK ---
  const video = document.querySelector('.hero__media');
  if (video) {
    // error event: if video fails to load (missing file), hide it so poster image shows
    video.addEventListener('error', () => {
      video.style.display = 'none';
    });
  }

  // console.log: proves JS loaded, shows in browser DevTools console
  console.log('%cTeknic Euchner — Pixel Perfect Loaded', 'color:#E60000; font-weight:700; font-size:14px');
})(); // () at end immediately invokes the function
