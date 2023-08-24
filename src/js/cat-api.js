// import axios from 'axios';

// const API_KEY =
//   'live_zh0WpO6FOOvie5Gdzq7CY7JEt54XDfBr1sP2gRHbFWYN4AUnzT7HpTDH5XZmz8Yq';
// axios.defaults.headers.common['x-api-key'] = API_KEY;

// function fetchBreeds() {
//   return axios
//     .get('https://api.thecatapi.com/v1/breeds')
//     .then(response => response.data)
//     .catch(error => {
//       console.error('Помилка при завантаженні порід:', error);
//       throw error;
//     });
// }

// function fetchCatByBreed(breedId) {
//   return axios
//     .get(
//       `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&include_breeds=true&limit=1`
//     )
//     .then(response => response.data[0])
//     .catch(error => {
//       console.error('Помилка при завантаженні інформації про кота:', error);
//       throw error;
//     });
// }

// export { fetchBreeds, fetchCatByBreed };

const API_KEY =
  'live_zh0WpO6FOOvie5Gdzq7CY7JEt54XDfBr1sP2gRHbFWYN4AUnzT7HpTDH5XZmz8Yq';

const headers = {
  'x-api-key': API_KEY,
};

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Помилка при завантаженні порід:', error);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&include_breeds=true&limit=1`,
    { headers }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      console.error('Помилка при завантаженні інформації про кота:', error);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
