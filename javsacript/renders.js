// Render contry list
export function renderCountry(data) {
    let html = '';
  
    html = `
      <div class="country">
          <img class="country_flag" src="${data.countryInfo.flag}" alt="${data.country}-flag">
          <div class="country_name" data-id="${data.updated}">${data.country}</div>
          <div class="country_new">+${data.todayCases}</div>
          <div class="country_new-recovered">+${data.todayRecovered}</div>
          <div class="country_favorite${data.favorite ? '-active' : ''}"><i class="fas fa-thumbtack"></i></div>
      </div>
    `;
  
    if(data.favorite)  document.querySelector('.countries-container-favorite').insertAdjacentHTML("beforeend", html);
    else document.querySelector('.countries-container').insertAdjacentHTML("beforeend", html);
};

// Render contry list favorite
export function renderCountryFavorite(data) {
    let html = '';
      html += `
        <div class="country">
            <img class="country_flag" src="${data.countryInfo.flag}" alt="${data.country}-flag">
            <div class="country_name" data-id="${data.updated}">${data.country}</div>
            <div class="country_new">+${data.todayCases}</div>
            <div class="country_new-recovered">+${data.todayRecovered}</div>
            <div class="country_favorite-active"><i class="fas fa-thumbtack"></i></div>
        </div>
      `;
      document.querySelector('.countries-container-favorite').insertAdjacentHTML("beforeend", html);
  };
  
  
  // Country result render
  export function renderCountryResult(data) {
    let html = '';
  
    html += `
        <div class="country-information_detals">
            <img class="country-information_detals_flag" src="${data.countryInfo.flag}" alt="${data.country}-flag">
            <div class="country-information_detals_name">${data.country}</div>
            <div class="country-information_detals_confrimed">${data.cases}</div>
            <div class="country-information_detals_recovered">${data.recovered}</div>
            <div class="country-information_detals_critical">${data.critical}</div>
            <div class="country-information_detals_death">${data.deaths}</div>
        </div>
      `;
    document.querySelector('.country-information-container').innerHTML = html;
};

