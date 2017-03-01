let modal; 
let galleryEl;

// request from flickr
function makeRequest(url, cb) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      cb(JSON.parse(request.responseText).items);
    }
  }
}

function getImages(query) {
  let url = `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&key=AIzaSyDTYOZYKo86kZo8p-Tu_zlHGKkjl6mvK7U&cx=005006539545714379623:elqslsuy7dq`;
  makeRequest(url, templateImages);
}

function templateImages(data) {
  console.log(data);
  let button;
  for (let i = 0; i < data.length; i++) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery__item';
    button.innerHTML = `<img src="${data[i].link}" alt="${data[i].title}" title="${data[i].title}">`;
    galleryEl.appendChild(button);
  }
  //galleryEl.appendChild(button);
}

function templateModal(title, src) {
  if (!modal.isOpen) {
    modal.openModal();
  }

  modal.modalEl.querySelector('.modal__heading').innerHTML = title;
  let img = modal.modalEl.querySelector('.modal__img');
  img.src = src;
  img.alt = title;
}

// use event delegation to catch clicks on tiles
function triggerModal(e) {
  let target = e.target;
  while (target !== e.currentTarget) {
    if (target.classList.contains('gallery__item')) {
      let imageEl = target.querySelector('img');
      let title = imageEl.getAttribute('title');
      let src = imageEl.getAttribute('src');
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

  getImages('cat');
}

document.addEventListener('DOMContentLoaded', init);