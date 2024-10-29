import debounce from "lodash.debounce";
import { alert, error as notifyError, info as notifyInfo } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
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
  if (countries.length >= 1 && countries.length <= 10) {
    const countryList = countries.map(country => {
      return `
      <li>
        <img class="list-img" src="${country.flags.svg}">
        <p>${country.name.official}</p>
      </li>
      `;
    }).join('');

    renderCountryList(countryList);
  }
}