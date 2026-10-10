// let heroData;

const heroList = document.querySelector('.hero-list');
const heroCard = document.querySelector('.hero-wrapper');
let movies;
let newHero = heroCard.cloneNode(true);
let arrMovies = [];
const renderHeroes = (data) => {
  for (let hero of data) {
    let newHero = heroCard.cloneNode(true);
    newHero.querySelector('.hero-picture').src = hero.photo;
    let tableProp = newHero.querySelector('table');
    for (let prop in hero) {
      if (prop !== 'photo') {
        let row = document.createElement('tr');
        row.classList.add('hero-prop-row');
        let cell1 = document.createElement('td');
        cell1.classList.add(prop);
        cell1.innerText = prop;
        let cell2 = document.createElement('td');
        cell2.innerHTML = hero[prop];
        cell2.classList.add('value');
        row.append(cell1);
        row.append(cell2);
        tableProp.append(row);
      }
    }
    heroList.append(newHero);
  }
  heroCard.remove();
};

const createFilter = () => {
  document.querySelectorAll('.movies').forEach((el) => {
    let heroMovies = el.closest('.hero-prop-row').querySelector('.value').innerText.split(',');
    heroMovies.forEach((movie) => {
      arrMovies.push(movie);
    });
  });
  movies = Array.from(new Set(arrMovies));
  const selectMovies = document.getElementById('movie-list');
  movies.forEach((el) => {
    let option = document.createElement('option');
    option.value = el;
    option.innerText = el;
    selectMovies.append(option);
  });
  selectMovies.addEventListener('change', (e) => {
    let selectedMovie = selectMovies[selectMovies.selectedIndex].value;
    const cards = document.querySelectorAll('.hero-item');
    cards.forEach((card) => {
      if (selectedMovie === '') {
        card.closest('.hero-wrapper').classList.remove('d-none');
      } else if (card.querySelector('.movies')) {
        let movieIsFind = false;
        card
          .querySelector('.movies')
          .nextSibling.innerText.split(',')
          .forEach((item) => {
            if (item === selectedMovie && !movieIsFind) {
              card.closest('.hero-wrapper').classList.remove('d-none');
              movieIsFind = true;
            } else if (!movieIsFind) {
              card.closest('.hero-wrapper').classList.add('d-none');
            }
          });
      } else {
        card.closest('.hero-wrapper').classList.add('d-none');
      }
    });
  });
};

fetch('dbHeroes.json')
  .then((responce) => responce.json())
  .then((data) => {
    renderHeroes(data);
    createFilter();
  });
