import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('.load-more'),
};
console.log(refs.searchBtn);

const API_KEY = '29156299-9f5b3ae85970160cb7d7e54e9';
let searchText = '';
let page = 1;
const PER_PAGE = 40;

  
function clearGallery() {
  refs.gallery.innerHTML = '';
};

function addClassIsHidden() {
  refs.loadMoreBtn.classList.add('is-hidden');
};

function removeClassIsHidden() {
  refs.loadMoreBtn.classList.remove('is-hidden');
};

function addLightBox() {
  const lightbox = new SimpleLightbox('.gallery a');
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
    lightbox.refresh();

    removeClassIsHidden();

    let leftShowPhoto = responce.data.totalHits - (page * PER_PAGE);
    // console.log(leftShowPhoto);

    if (leftShowPhoto <= 0) {
      Notify.info(`We're sorry, but you've reached the end of search results.`)
      addClassIsHidden()
    }
  } catch (error) {
    console.log(error);
  }
}


function createMarkup(dataPhoto) {
  return dataPhoto.map((photo) => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = photo;
    return `
    <div class="photo-card">
      <a href="${largeImageURL}">
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
      </a>
    </div>`
  }).join('');
  
}

function appendMarkupInGallery(photo) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(photo))
}


refs.form.addEventListener('submit', onSearchImges);
refs.loadMoreBtn.addEventListener('click', onLoadMoreImages)

