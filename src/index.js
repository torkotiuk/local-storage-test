import { alert, error, success } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { debounce } from 'lodash';
import contriesListTempl from './templates/contries-list.hbs';
import contryCardTempl from './templates/contry-card.hbs';
import './css/country-card.css';
import fetchAPI from './js/fetchCountries';

const refs = {
  inputSearch: document.querySelector('.input-search'),
  countriesContainer: document.querySelector('.country-container'),
  body: document.querySelector('body'),
};

refs.inputSearch.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery === '') {
    catchError();
    refs.countriesContainer.innerHTML = '';
    return;
  }

  fetchAPI.fetchCountries(searchQuery).then(countriesArr => {
    let countriesArrLength = countriesArr.length;

    if (countriesArrLength > 10) {
      refs.countriesContainer.innerHTML = '';

      error({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 3000,
      });
    }

    if (countriesArrLength > 1 && countriesArrLength <= 10) {
      return renderCountriesList(countriesArr);
    }

    if (countriesArrLength === 1) {
      // === = === Web Storage API === = ===
      // --- --- tranforn string to array/obj --- ---
      // const savedUserData =
      //   '[{"name":"Ukraine","topLevelDomain":[".ua"],"alpha2Code":"UA","alpha3Code":"UKR","callingCodes":["380"],"capital":"Kiev","altSpellings":["UA","Ukrayina"],"region":"Europe","subregion":"Eastern Europe","population":42692393,"latlng":[49,32],"demonym":"Ukrainian","area":603700,"gini":26.4,"timezones":["UTC+02:00"],"borders":["BLR","HUN","MDA","POL","ROU","RUS","SVK"],"nativeName":"Україна","numericCode":"804","currencies":[{"code":"UAH","name":"Ukrainian hryvnia","symbol":"₴"}],"languages":[{"iso639_1":"uk","iso639_2":"ukr","name":"Ukrainian","nativeName":"Українська"}],"translations":{"de":"Ukraine","es":"Ucrania","fr":"Ukraine","ja":"ウクライナ","it":"Ucraina","br":"Ucrânia","pt":"Ucrânia","nl":"Oekraïne","hr":"Ukrajina","fa":"وکراین"},"flag":"https://restcountries.eu/data/ukr.svg","regionalBlocs":[],"cioc":"UKR"}]';
      // const unparsedString = JSON.parse(savedUserData);
      // console.log('unparsedString: ', unparsedString);
      // ---

      // --- --- add one obj to array --- ---
      const storageOneCountry = [];
      // storageOneCountry.push(countriesArr[0]); //add one obj to array

      const total = storageOneCountry.reduce((acc, countriesArr[0]) => {
        console.log(acc);
        return acc;
      }, {});
      // console.log(total);
      //---

      // --- --- transform 'arr of obj-s' to string
      // const stringFromObj = JSON.stringify(storageOneCountry); //transform array of objects to string
      // ---

      // localStorage.setItem('myData', stringFromObj);
      // localStorage.getItem('myData');

      return renderCountryCard(countriesArr);
    }
  });
}

function renderCountriesList(listOfCountries) {
  refs.countriesContainer.innerHTML = contriesListTempl(listOfCountries);
}

function renderCountryCard(country) {
  refs.countriesContainer.innerHTML = contryCardTempl(country);
}

function catchError() {
  error({
    text: 'Enter smth to find your country!',
    delay: 4000,
  });
}
