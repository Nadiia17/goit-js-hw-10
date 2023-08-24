import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import 'slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

let select = new SlimSelect({
  select: '.breed-select',
});

function showLoader() {
  elements.loader.classList.remove('hidden');
}

function hideLoader() {
  elements.loader.classList.add('hidden');
}

function showError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function hideError() {
  elements.error.classList.add('hidden');
}

function hideCatInfo() {
  elements.catInfo.classList.add('hidden');
  elements.catInfo.classList.remove('visible');
}

// function populateSelectWithOptions(breeds) {
//   breeds.forEach(breed => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.textContent = breed.name;
//     elements.select.appendChild(option);
//   });
// }

function populateSelectWithOptions(breeds) {
  const options = [
    { text: 'Choose breed', value: '' },
    ...breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
    })),
  ];
  select.setData(options);
}

function createCatMarkup(imageData) {
  const { url, breeds } = imageData;
  const breed = breeds[0];
  elements.catInfo.classList.remove('hidden');
  elements.catInfo.classList.add('visible');

  elements.catInfo.innerHTML = `
        <div class="cat-card">
            <img class="cat-image" src="${url}" alt="${breed.name}">
            <div class="cat-content">
                <h2 class="cat-title">${breed.name}</h2>
                <p class="cat-description"><strong>Description:</strong> ${breed.description}</p>
                <p class="cat-temperament"><strong>Temperament:</strong> ${breed.temperament}</p>
            </div>
        </div>
    `;
}

showLoader();

fetchBreeds()
  .then(breeds => {
    populateSelectWithOptions(breeds);
    elements.select.classList.remove('hidden');
  })
  .catch(() => {
    showError();
  })
  .finally(() => {
    hideLoader();
  });

elements.select.addEventListener('change', event => {
  if (!event.target.value) return;
  hideCatInfo();
  showLoader();

  fetchCatByBreed(event.target.value)
    .then(imageData => {
      createCatMarkup(imageData);
    })
    .catch(error => {
      console.error('Error fetching cat image:', error);
      showError();
    })
    .finally(() => {
      hideLoader();
    });
});

// select.onChange = info => {
//   console.log(info);
//   fetchCatByBreed(info.selection.value)
//     .then(imageData => createCatMarkup(imageData))
//     .catch(error => console.error('Error fetching cat image:', error));
// };
