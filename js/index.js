let modal; 
let galleryEl;

// request from flickr
function makeRequest(url, cb) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      cb(request.responseText);
    }
  }
}


// template the photos

function showModal(title, src) {
  modal.openModal();

  modal.modalEl.querySelector('.modal__heading').innerHTML = title;
  let img = modal.modalEl.querySelector('.modal__img');
  img.src = src;
  img.alt = title;
}

// use event delegation to catch clicks on tiles
function triggerModal(e) {
  console.log(e);
  let target = e.target;
  while (target !== e.currentTarget) {
    if (target.classList.contains('gallery__item')) {
      let imageEl = target.querySelector('img');
      let title = imageEl.getAttribute('title');
      let src = imageEl.getAttribute('src');
      showModal(title, src);
    }
    target = target.parentNode;
  }
}

function init() {
  let modalEl = document.querySelector('.modal--lightbox');
  galleryEl = document.querySelector('.gallery');
  let modalOverlayEl = document.querySelector('.modal__overlay');
  let modalCloseEl = modalEl.querySelector('.modal__close');

  modal = new Modal(modalEl, modalOverlayEl, modalCloseEl);
  galleryEl.addEventListener('click', triggerModal);
}

document.addEventListener('DOMContentLoaded', init);