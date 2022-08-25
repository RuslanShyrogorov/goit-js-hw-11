import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './js/markup';
import { slowScroll } from './js/slow-scroll';

// const refs = {
//   form: document.querySelector('#search-form'),
//   gallery: document.querySelector('.gallery'),
//   searchBtn: document.querySelector('button[type="submit"]'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// const API_KEY = '29156299-9f5b3ae85970160cb7d7e54e9';
// let searchText = '';
// let page = 1;
// const PER_PAGE = 40;

// function clearGallery() {
//   refs.gallery.innerHTML = '';
//   page = 1;
// }

// function addClassIsHidden() {
//   refs.loadMoreBtn.classList.add('is-hidden');
// }

// function removeClassIsHidden() {
//   refs.loadMoreBtn.classList.remove('is-hidden');
// }

// function addLightBox() {
//   const lightbox = new SimpleLightbox('.gallery a');
//   lightbox.refresh();
//   return lightbox;
// }

// // function addAttributeDisabled() {
// //   refs.searchBtn.setAttribute('disabled', 'disabled');
// // };

// // function removeAttributeDisabled() {
// //   refs.searchBtn.removeAttribute('disabled');
// // };

// async function onSearchImges(event) {
//   event.preventDefault();
//   searchText = '';
//   searchText = event.currentTarget.elements.searchQuery.value.trim();
//   // console.log('searchText: ', searchText);
//   // const { elements: { searchQuery } } = event.currentTarget
//   // const searchText = searchQuery.value

//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&image_type=photo&orientation="horizontal"&safesearch="true"&per_page=${PER_PAGE}&page=${page}`;
//   try {
//     if (searchText === '') {
//       return Notify.failure('Please, enter something');
//     }

//     const responce = await axios.get(url);

//     if (responce.data.hits.length > 0) {
//       Notify.success(`We found ${responce.data.totalHits} photo`);
//     } else {
//       Notify.failure(
//         `Sorry, there are no images matching your search query. Please try again.`
//       );
//     }

//     clearGallery();

//     appendMarkupInGallery(responce.data.hits);
//     // console.log('responce: ', responce.data);

//     slowScroll();

//     removeClassIsHidden();

//     if (responce.data.totalHits <= PER_PAGE) {
//       addClassIsHidden();
//     }

//     addLightBox();
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function onLoadMoreImages() {
//   page += 1;
//   // console.log(page);

//   removeClassIsHidden();

//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&image_type=photo&orientation="horizontal"&safesearch="true"&per_page=${PER_PAGE}&page=${page}`;
//   try {
//     const responce = await axios.get(url);

//     appendMarkupInGallery(responce.data.hits);
//     // console.log('responce: ', responce.data);

//     addLightBox();

//     removeClassIsHidden();

//     let leftShowPhoto = responce.data.totalHits - page * PER_PAGE;
//     console.log(leftShowPhoto);

//     if (leftShowPhoto <= 0) {
//       addClassIsHidden();
//       Notify.info(`We're sorry, but you've reached the end of search results.`);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// function appendMarkupInGallery(photo) {
//   refs.gallery.insertAdjacentHTML('beforeend', createMarkup(photo));
// }

// refs.form.addEventListener('submit', onSearchImges);
// refs.loadMoreBtn.addEventListener('click', onLoadMoreImages);

// =====================================

// const API_KEY = '5b00cd10e05c354cfbdbc23aa24fc7b8';
// const URL = 'https://api.themoviedb.org/3/';
// let page = 1;
// const trends = {
//   day: 'day',
//   week: 'week',
// };

// async function fetchTrendMovie(trend, page) {
//   try {
//     const responce = await axios.get(
//       `${URL}trending/all/${trend}?api_key=${API_KEY}&page=${page}`
//     );
//     // console.log(responce.data);
//     return responce.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // fetchTrendMovie(trends.day, page);

// async function fetchSearchMovie(searchMovie, page) {
//   try {
//     const responce = await axios.get(
//       `${URL}search/movie?api_key=${API_KEY}&query=${searchMovie}&language=en-US&page=1&include_adult=false&page=${page}`
//     );
//     // console.log(responce.data);
//     // console.log(responce.data.results);
//     return responce.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // fetchSearchMovie('007', page);

// async function fetchForIdMovie(movieId) {
//   try {
//     const responce = await axios.get(
//       `${URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
//     );
//     console.log(responce.data);
//     // console.log(responce.data.poster_path);
//     // console.log(responce.data.id);
//     return responce.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // fetchForIdMovie('875');

// const genres = {
//   drama: 18,
//   action: 28,
//   adventure: 12,
//   comedy: 35,
//   crime: 80,
//   animation: 16,
//   documentary: 99,
//   family: 10751,
//   horror: 27,
//   history: 36,
//   fantasy: 14,
//   science: 878,
//   war: 10752,
// };

// async function fetchGenresMovies(genre, page) {
//   try {
//     const responce = await axios.get(
//       `${URL}discover/movie?with_genres=${genre}&page=${page}&with_original_language=en&api_key=${API_KEY}`
//     );
//     console.log(responce.data);
//     return responce.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
// fetchGenresMovies(genres.comedy, page);

// ===========================================

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('button[type="submit"]'),
  loadMoreBtn: document.querySelector('.load-more'),
};

class MovieApiService {
  constructor() {
    this.API_KEY = '5b00cd10e05c354cfbdbc23aa24fc7b8';
    this.URL = 'https://api.themoviedb.org/3/';

    // this.searchQuary = 'Home Alone';
    this.searchQuary = '';
    this.page = 1;

    // this.action = 28;
    // this.animation = 16;
    // this.comedy = 35;
    // this.documentary = 99;
    // this.drama = 18;
    // this.family = 10751;
    // this.fantasy = 14;
    // this.romance = 10749;
    // this.thriller = 53;
    this.trendDay = 'day';
    this.trendWeek = 'week';
    this.movieId = 361743;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get search() {
    return this.searchQuary;
  }

  set search(newQuary) {
    this.searchQuary = newQuary;
  }

  fetchSearchMovie = async () => {
    console.log(this);
    try {
      // const response = await axios.get(url);
      const responce = await axios.get(
        `${this.URL}search/movie?api_key=${this.API_KEY}&query=${this.searchQuary}&language=en-US&page=1&include_adult=false&page=${this.page}`
      );
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };

  fetchTrendDayMovie = async () => {
    try {
      const responce = await axios.get(
        `${this.URL}trending/all/${this.trendDay}?api_key=${this.API_KEY}&page=${this.page}`
      );
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };

  fetchTrendWeekMovie = async () => {
    try {
      const responce = await axios.get(
        `${this.URL}trending/all/${this.trendWeek}?api_key=${this.API_KEY}&page=${this.page}`
      );
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };

  fetchForIdMovie = async () => {
    try {
      const responce = await axios.get(
        `${this.URL}movie/${this.movieId}?api_key=${this.API_KEY}&language=en-US`
      );
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };

  fetchGenresMovies = async (genre, page) => {
    try {
      const responce = await axios.get(
        `${this.URL}discover/movie?with_genres=${genre}&page=${this.page}&with_original_language=en&api_key=${this.API_KEY}`
      );
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };
}

const movieApiServise = new MovieApiService();
// console.log(movieApiServise);
// movieApiServise.fetchSearchMovie();
// movieApiServise.fetchTrendDayMovie();
// movieApiServise.fetchTrendWeekMovie();
// movieApiServise.fetchForIdMovie();

function onSearchMovie(e) {
  e.preventDefault();
  movieApiServise.search = e.currentTarget.elements.searchQuery.value.trim();
  console.log(movieApiServise.search);

  movieApiServise.fetchSearchMovie();
}

refs.form.addEventListener('submit', onSearchMovie);
