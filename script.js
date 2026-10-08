// Typing effect in hero section
let phrases = ['Web Apps.', 'Clean UI.', 'Modern Sites.'];
let pIndex = 0;
let cIndex = 0;
let isBackspacing = false;

function doTyping() {
  let target = document.getElementById('typeTarget');
  if (!target) return;

  let currentPhrase = phrases[pIndex];

  if (isBackspacing) {
    target.textContent = currentPhrase.substring(0, cIndex - 1);
    cIndex--;
  } else {
    target.textContent = currentPhrase.substring(0, cIndex + 1);
    cIndex++;
  }

  let delay = isBackspacing ? 50 : 100;

  if (!isBackspacing && cIndex === currentPhrase.length) {
    delay = 1500;
    isBackspacing = true;
  } else if (isBackspacing && cIndex === 0) {
    isBackspacing = false;
    pIndex = (pIndex + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(doTyping, delay);
}

// Dark / Light Theme Switcher
function initTheme() {
  let btn = document.getElementById('themeBtn');
  let currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'light') {
    document.body.classList.add('light');
    btn.querySelector('i').className = 'fa-solid fa-sun';
  }

  btn.onclick = function() {
    let isLight = document.body.classList.toggle('light');
    if (isLight) {
      btn.querySelector('i').className = 'fa-solid fa-sun';
      localStorage.setItem('theme', 'light');
    } else {
      btn.querySelector('i').className = 'fa-solid fa-moon';
      localStorage.setItem('theme', 'dark');
    }
  };
}

// Mobile Nav Menu Toggle
function initMobileMenu() {
  let menuBtn = document.getElementById('menuBtn');
  let navLinks = document.getElementById('navLinks');

  if (!menuBtn) return;

  menuBtn.onclick = function() {
    navLinks.classList.toggle('show');
  };

  let links = navLinks.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = function() {
      navLinks.classList.remove('show');
    };
  }
}

// Skill bars fill animation when scrolling into view
function initSkillBars() {
  let fills = document.querySelectorAll('.fill');

  let observer = new IntersectionObserver(function(entries) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        let bar = entries[i].target;
        bar.style.width = bar.getAttribute('data-val');
      }
    }
  }, { threshold: 0.2 });

  for (let i = 0; i < fills.length; i++) {
    observer.observe(fills[i]);
  }
}

// Project filtering by category
function initFilters() {
  let filterBtns = document.querySelectorAll('.filter-btn');
  let cards = document.querySelectorAll('.p-card');

  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].onclick = function() {
      // Remove active class from all buttons
      for (let j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('active');
      }
      this.classList.add('active');

      let category = this.getAttribute('data-cat');

      for (let k = 0; k < cards.length; k++) {
        let cardCat = cards[k].getAttribute('data-cat');
        if (category === 'all' || category === cardCat) {
          cards[k].style.display = 'flex';
        } else {
          cards[k].style.display = 'none';
        }
      }
    };
  }
}

// Modal Popups for Projects
function initModals() {
  let modalBox = document.getElementById('modalBox');
  let modalTarget = document.getElementById('modalTarget');
  let closeModal = document.getElementById('closeModal');

  let modalData = {
    'm1': {
      title: 'Analytics Dashboard',
      desc: 'Real-time statistics dashboard featuring live grid cards and chart layout elements.'
    },
    'm2': {
      title: 'E-Commerce Interface',
      desc: 'Sleek store interface with responsive card layouts and dynamic filter states.'
    },
    'm3': {
      title: 'Task Manager',
      desc: 'Productivity web app built with task filters and browser local storage saving.'
    }
  };

  let openBtns = document.querySelectorAll('.show-modal');
  for (let i = 0; i < openBtns.length; i++) {
    openBtns[i].onclick = function() {
      let id = this.getAttribute('data-id');
      let data = modalData[id];
      if (data) {
        modalTarget.innerHTML = '<h3>' + data.title + '</h3><p style="margin-top: 8px; color: #8b949e;">' + data.desc + '</p>';
        modalBox.classList.add('open');
      }
    };
  }

  closeModal.onclick = function() {
    modalBox.classList.remove('open');
  };

  modalBox.onclick = function(e) {
    if (e.target === modalBox) {
      modalBox.classList.remove('open');
    }
  };
}

// Contact Form Validation
function initForm() {
  let form = document.getElementById('contactForm');
  if (!form) return;

  form.onsubmit = function(e) {
    e.preventDefault();

    let nameInput = document.getElementById('usrName');
    let emailInput = document.getElementById('usrEmail');
    let msgInput = document.getElementById('usrMsg');
    let alertBox = document.getElementById('formAlert');

    let isValid = true;

    if (!nameInput.value.trim()) {
      nameInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      nameInput.parentElement.classList.remove('has-error');
    }

    let emailVal = emailInput.value.trim();
    if (!emailVal || emailVal.indexOf('@') === -1 || emailVal.indexOf('.') === -1) {
      emailInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      emailInput.parentElement.classList.remove('has-error');
    }

    if (!msgInput.value.trim()) {
      msgInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      msgInput.parentElement.classList.remove('has-error');
    }

    if (isValid) {
      alertBox.style.color = '#238636';
      alertBox.textContent = 'Message sent!';
      form.reset();
      setTimeout(function() {
        alertBox.textContent = '';
      }, 3000);
    }
  };
}

// Run functions when DOM is ready
window.onload = function() {
  doTyping();
  initTheme();
  initMobileMenu();
  initSkillBars();
  initFilters();
  initModals();
  initForm();
};
