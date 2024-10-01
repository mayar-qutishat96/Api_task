'use strict'


fetch('https://restcountries.com/v3.1/all')
    .then(response => {
      
        return response.json();
    })
    .then(countries => {
        const container = document.getElementById('country-container');
        countries.forEach(country => {
            console.log(country);
            const countryDiv = document.createElement('div');
            countryDiv.className = 'country';
            countryDiv.innerHTML = 
            `
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <p class="country-name">${country.name.common}</p>
            `;
            container.appendChild(countryDiv);
        });
    })
   
