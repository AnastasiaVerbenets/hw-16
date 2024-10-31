import debounce from "lodash.debounce";
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error as notifyError, info as notifyInfo } from '@pnotify/core';
import fetchCountries from "./js/fetchCountries";

const input = document.getElementById("input");
const country = document.getElementById("country");
const list = document.getElementById("list");

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  e.preventDefault();

  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    clearData();
    return;
  }

  fetchCountries(inputValue).then(fetchResponse).catch(error => { notifyError(`Something wrong ${error}`) });
}

function clearData() {
  list.innerHTML = '';
  country.innerHTML = '';
}

function renderCountry(countryInfo) {
  country.insertAdjacentHTML('beforeend', countryInfo);
}

function renderCountryList(countryList) {
  list.insertAdjacentHTML('beforeend', countryList);
}

function fetchResponse(countries) {
  clearData();

  if (countries.length >= 1 && countries.length <= 10) {
    const countryList = countries.map(country => {
      return `
      <li class='list__item'>
        <img class="list__img" src="${country.flags.svg}">
        <p>${country.name.official}</p>
      </li>
      `;
    }).join('');

    renderCountryList(countryList);
  } else if (countries.length === 1) {
    const countryInfo = countries.map(country => {
      return `
       <h2 class="country__title">${country.name}</h2>
       <div class="country__thumb">
          <div class="country__content">
            <p class="country__text"><b>Capital:</b>${country.capital}</p>
            <p class="country__text"><b>Population:</b>${country.population}</p>
            <p class="country__text"><b>Languages:</b>${Object.values(country.languages)}</p>
        </div>
            <img class="list__img" src="${country.flags.svg}">
     </div>
`;
    }).join('');

    renderCountry(countryInfo);
  } else {
    notifyInfo('Too many matches');
  }
}

function error() {
  notifyError('There`s no country with this name');
}