// --- fetchAPI ---
const BASE_URL = `https://restcountries.eu/rest/v2/name/`;

function fetchCountries(inputData) {
  return fetch(`${BASE_URL}${inputData}`).then(response => response.json());
}

export default { fetchCountries };
