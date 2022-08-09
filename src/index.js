
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const API_KEY = '29156299-9f5b3ae85970160cb7d7e54e9';
let searchText = '';
let page = 1;


async function onSearchImges(event) {
  event.preventDefault();
  searchText = '';
  searchText = event.currentTarget.elements.searchQuery.value.trim();
  console.log(searchText);
  // const { elements: { searchQuery } } = event.currentTarget
  // const searchText = searchQuery.value
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&image_type=photo&orientation="horizontal"&safesearch="true"&per_page=40&page=${page}`
  try {
    const responce = await axios.get(url);
    Notify.success(`We found ${responce.data.totalHits} photo`)
    appendMarkupInGallery(responce.data.hits)
    console.log('responce: ', responce.data);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMoreImages() {
  page += 1;
  console.log(page);
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&image_type=photo&orientation="horizontal"&safesearch="true"&per_page=40&page=${page}`
  try {
    const responce = await axios.get(url);
    appendMarkupInGallery(responce.data.hits)
    console.log('responce: ', responce.data);
    
  } catch (error) {
    
  }
}

function createMarkup(dataPhoto) {
  return dataPhoto.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`
  }).join('');
  
}

function appendMarkupInGallery(photo) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(photo))
}



refs.form.addEventListener('submit', onSearchImges);
refs.loadMoreBtn.addEventListener('click', onLoadMoreImages)