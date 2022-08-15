import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkup } from "./js/markup";
import { slowScroll } from "./js/slow-scroll";

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const API_KEY = '29156299-9f5b3ae85970160cb7d7e54e9';
let searchText = '';
let page = 1;
const PER_PAGE = 40;

  
function clearGallery() {
  refs.gallery.innerHTML = '';
  page = 1;
};

function addClassIsHidden() {
  refs.loadMoreBtn.classList.add('is-hidden');
};

function removeClassIsHidden() {
  refs.loadMoreBtn.classList.remove('is-hidden');
};

function addLightBox() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
  return lightbox;
};

// function addAttributeDisabled() {
//   refs.searchBtn.setAttribute('disabled', 'disabled');
// };

// function removeAttributeDisabled() {
//   refs.searchBtn.removeAttribute('disabled');
// };


async function onSearchImges(event) {
  event.preventDefault();
  searchText = '';
  searchText = event.currentTarget.elements.searchQuery.value.trim();
  // console.log('searchText: ', searchText);
  // const { elements: { searchQuery } } = event.currentTarget
  // const searchText = searchQuery.value
  
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&image_type=photo&orientation="horizontal"&safesearch="true"&per_page=${PER_PAGE}&page=${page}`
  try {
    if (searchText === '') {
      return Notify.failure('Please, enter something');
    }

    const responce = await axios.get(url);

    if (responce.data.hits.length > 0) {
      Notify.success(`We found ${responce.data.totalHits} photo`)
    } else {
      Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
    }

    clearGallery();

    appendMarkupInGallery(responce.data.hits)
    // console.log('responce: ', responce.data);

    slowScroll();
    
    removeClassIsHidden();

    if (responce.data.totalHits <= PER_PAGE) {
      addClassIsHidden();
    }

    addLightBox()


  } catch (error) {
    console.log(error);
  }
}


async function onLoadMoreImages() {
  page += 1;
  // console.log(page);

  removeClassIsHidden();

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&image_type=photo&orientation="horizontal"&safesearch="true"&per_page=${PER_PAGE}&page=${page}`
  try {
    const responce = await axios.get(url);

    appendMarkupInGallery(responce.data.hits)
    // console.log('responce: ', responce.data);

    addLightBox()

    removeClassIsHidden();

    let leftShowPhoto = responce.data.totalHits - (page * PER_PAGE);
    console.log(leftShowPhoto);

    if (leftShowPhoto <= 0) {
      addClassIsHidden();
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      
    }
  } catch (error) {
    console.log(error);
  }
}

function appendMarkupInGallery(photo) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(photo))
}

refs.form.addEventListener('submit', onSearchImges);
refs.loadMoreBtn.addEventListener('click', onLoadMoreImages)

