import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { alert, error as notifyError, info as notifyInfo } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const input = document.getElementById('input');
const list = document.getElementById('list');
const country = document.getElementById('country');

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  e.preventDefault();

  const inputValue = e.target.value.trim();
  if (inputValue === '') {
    clearData();
    return;
  }

  fetchCountries(inputValue)
    .then(fetchResponse)
    .catch(error => {
      notifyError(`Something went wrong ${error}`);
    });
}

function clearData() {
  list.innerHTML = '';
  country.innerHTML = '';
}

function renderCountry(countryInfo) {
  country.insertAdjacentHTML('beforeend', countryInfo);
}

function renderCountryList(countryList) {
  country.insertAdjacentHTML('beforeend', countryList);
}

function fetchResponse(countries) {
  clearData();
  if (countries.length > 1 && countries.length <= 10) {
    const countryList = countries
      .map(country => {
        console.log(country);
        return `
      <li class="country__item">
        <img class="country__img" src="${country.flags.svg}">
          <p class="country__title">
            <b>${country.name.common}</b>
          </p>
        </li>
      `;
      }).join('');

    renderCountryList(countryList);
  } else if (countries.length === 1) {
    const countryInfo = countries
      .map(country => {
        return `
        <h1 class="title"><b>${country.name.common}</b></h1>
        <div class="country__thumb">
          <div class="country__content">
            <p class="country__text"><b>Capital: </b> ${country.capital}</p>
            <p class="country__text"><b>Population: </b> ${country.population}</p>
            <p class="country__text"><b>Languages: </b>${Object.values(country.languages)} </p>
          </div>
          <img class="country__img" src="${country.flags.svg}">
        </div>
      `;
      }).join('');

    renderCountry(countryInfo);
  } else {
    notifyInfo('Too many matches');
  }
}

function error() {
  notifyError("There's no country with this name");
}
