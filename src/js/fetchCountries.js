export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields='name,capital,population,languages,flags'`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    });
}