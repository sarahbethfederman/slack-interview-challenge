function Modal(modalEl, overlayEl, cancelEl) {
  this.isOpen = false;
  this.modalEl = modalEl;
  this.overlayEl = overlayEl;
  this.lastFocus;

  overlayEl.addEventListener('click', () => this.closeModal());
  cancelEl.addEventListener('click', () => this.closeModal());
  let self = this;
  document.addEventListener('keydown', function(e) {
    // close modal on escape
    if (self.isOpen && e.keyCode === 27) {
      self.closeModal();
    }
  });
  document.addEventListener('focus', function(e) {
    // focus trap
    if (self.isOpen && !self.modalEl.contains(e.target)) {
      e.stopPropagation();
      self.modalEl.focus();
    }
  }, true);
} 

Modal.prototype.closeModal = function(e, cb) {
  // a11y
  this.modalEl.setAttribute('aria-hidden', 'true');
  this.modalEl.setAttribute('tabindex', -1);
  this.overlayEl.setAttribute('aria-hidden', 'true');

  // toggle display
  this.modalEl.classList.add('hidden');
  this.overlayEl.classList.add('hidden');

  this.isOpen = false;
  // refocus on what we were on before
  this.lastFocus.focus();
  
  if (cb) {
    cb();
  }
};

Modal.prototype.openModal = function(e, cb) {
  // a11y
  this.lastFocus = document.activeElement;
  this.modalEl.setAttribute('aria-hidden', 'false');
  this.modalEl.setAttribute('tabindex', 0);
  this.overlayEl.setAttribute('aria-hidden', 'false');
  // focus on our modal
  setTimeout(() => { 
      this.modalEl.focus();
  }, 0); 
  this.modalEl.classList.remove('hidden');
  this.overlayEl.classList.remove('hidden');

  this.isOpen = true;

  if (cb) {
    cb();
  }
};
