let modal; 
let galleryEl;
let currImage;

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

function getImages(query) {
  let url = `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&key=AIzaSyDTYOZYKo86kZo8p-Tu_zlHGKkjl6mvK7U&cx=005006539545714379623:elqslsuy7dq`;
  makeRequest(url, templateImages);
}

function templateImages(data) {
  data = JSON.parse(data).items;
  let button;
  for (let i = 0; i < data.length; i++) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery__item';
    button.innerHTML = `<img src="${data[i].link}" alt="${data[i].title}" title="${data[i].title}">`;
    galleryEl.appendChild(button);
  }

  galleryItems = galleryEl.querySelector('.gallery__item');
}

function templateModal(title, src) {
  modal.modalEl.querySelector('.modal__heading').innerHTML = title;
  let img = modal.modalEl.querySelector('.modal__img');
  img.src = src;
  img.alt = title;
}

function nextImage() {
  let nextImage;
  if (!currImage.parentNode.nextElementSibling) {
    nextImage = galleryEl.firstElementChild.firstElementChild;
  } else {
    nextImage = currImage.parentNode.nextElementSibling.firstElementChild;
  }
  templateModal(nextImage.title, nextImage.src);
  currImage = nextImage;
}

function previousImage() {
  let prevImage;
  if (!currImage.parentNode.previousElementSibling) {
    prevImage = galleryEl.lastElementChild.firstElementChild;
  } else {
    prevImage = currImage.parentNode.previousElementSibling.firstElementChild;
  }
  templateModal(prevImage.title, prevImage.src);
  currImage = prevImage;
}

// use event delegation to catch clicks on images
function triggerModal(e) {
  let target = e.target;
  while (target !== e.currentTarget) {
    if (target.classList.contains('gallery__item')) {
      let imageEl = target.querySelector('img');
      let title = imageEl.getAttribute('title');
      let src = imageEl.getAttribute('src');
      currImage = imageEl;
      if (!modal.isOpen) {
        modal.openModal();
      }
      templateModal(title, src);
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
  modalEl.querySelector('.modal__cta--right').addEventListener('click', nextImage);
  modalEl.querySelector('.modal__cta--left').addEventListener('click', previousImage);
  document.addEventListener('keydown', function(e) {
    // keyboard navigation
    if (modal.isOpen) {
      if (e.keyCode === 39) {
        nextImage();
      } else if (e.keyCode === 37) {
        previousImage();
      }
    }
  });

  getImages('kitten');
}

document.addEventListener('DOMContentLoaded', init);