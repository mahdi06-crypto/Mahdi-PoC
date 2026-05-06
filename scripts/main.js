// Reveal animation on load
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 + i * 100);
  });
});

// ── Navigation keyboard support ───────────────────────────────
// Arrow Left / Right moves between nav links (roving focus)
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

navLinks.forEach((link, index) => {
  link.addEventListener('keydown', (e) => {
    let target = null;
    if (e.key === 'ArrowRight') {
      target = navLinks[(index + 1) % navLinks.length];
    } else if (e.key === 'ArrowLeft') {
      target = navLinks[(index - 1 + navLinks.length) % navLinks.length];
    }
    if (target) {
      e.preventDefault();
      target.focus();
    }
  });
});

// ── Keyboard help modal ───────────────────────────────────────
const modal      = document.getElementById('kbd-modal');
const openBtn    = document.querySelector('.kbd-help-btn');
const closeBtn   = document.querySelector('.kbd-modal-close');
const backdrop   = document.querySelector('.kbd-modal-backdrop');

// Collect all focusable elements inside the modal
function getFocusable() {
  return Array.from(
    modal.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
  ).filter(el => !el.hidden && el.offsetParent !== null);
}

function openModal() {
  modal.hidden = false;
  openBtn.setAttribute('aria-expanded', 'true');
  // Move focus to close button
  closeBtn.focus();
}

function closeModal() {
  modal.hidden = true;
  openBtn.setAttribute('aria-expanded', 'false');
  openBtn.focus();
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

// Trap focus inside modal while open
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    return;
  }
  if (e.key !== 'Tab') return;

  const focusable = getFocusable();
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
