// fetch helper function
async function getData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();

    if(!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (err) {
    throw err;
  };
};

let countriesData = [];
let favCountry = [];
const worldUrl = 'https://disease.sh/v3/covid-19/all';
const countryUrl = "https://disease.sh/v3/covid-19/countries";

// World information
// Time 
const time = document.querySelectorAll('.time');
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

function dateTime() {
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = month  + '\n'+ day  + '.' + year;
  return output;
};
time.forEach(t => t.innerHTML = dateTime());

// World cases
const cases = document.querySelectorAll('.cases');

async function loadWorldStats() {
  try {
    const worldData = await getData(worldUrl);

    cases[0].innerHTML = worldData.cases.toLocaleString();
    cases[1].innerHTML = worldData.recovered.toLocaleString();
    cases[2].innerHTML = worldData.critical.toLocaleString();
    cases[3].innerHTML = worldData.deaths.toLocaleString();
  } catch (err) {
    console.error(err);
  }
};

loadWorldStats();

// country information
async function inputData() {
  try {
    countriesData = await getData(countryUrl);
    countriesData.forEach(data => data.bookmarked = false);
    console.log(favCountry);
    console.log(countriesData);

    // for(let i = 0; i < countriesData.length; i++) {
    //   for(let j = 0; i < favCountry.length; j++) {
    //     if(countriesData[i].updated == favCountry[j])
    //     countriesData[i].bookmarked = true;
    //   }
    // }
    console.log(countriesData);
  } catch(err) {
    console.log(err);
  }
};


//Localstorage
function setLocalStorage() {
  localStorage.setItem('favCountry', JSON.stringify(favCountry));
};

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('favCountry'));

  if (!data) return;

  favCountry = data;
};

// Push favorite id
function inputId(id) {
  if(favCountry.length === 0) favCountry.push(id);

  const favorit = (element) => element === id;
  if (!favCountry.some( favorit )) favCountry.push(id);
};

// Render contry list
function renderCountry() {
  let text = '';

  countriesData.forEach( data => {
    text += `
      <div class="country">
          <img class="country_flag" src="${data.countryInfo.flag}" alt="${data.country}-flag">
          <div class="country_name" data-id="${data.updated}">${data.country}</div>
          <div class="country_new">+${data.todayCases}</div>
          <div class="country_new-recovered">+${data.todayRecovered}</div>
          <div class="country_favorite${data.bookmarked ? '-active' : ''}"><i class="fas fa-thumbtack"></i></div>
      </div>
    `;
    if(data.bookmarked) document.querySelector('.countries-container-favorite').innerHTML = text;
    if(!data.bookmarked) document.querySelector('.countries-container').innerHTML = text;
  });
};

// Render contry list favorite
function renderCountryFavorite(data) {
  let text = '';
    text += `
      <div class="country">
          <img class="country_flag" src="${data.countryInfo.flag}" alt="${data.country}-flag">
          <div class="country_name" data-id="${data.updated}">${data.country}</div>
          <div class="country_new">+${data.todayCases}</div>
          <div class="country_new-recovered">+${data.todayRecovered}</div>
          <div class="country_favorite-active"><i class="fas fa-thumbtack"></i></div>
      </div>
    `;
    document.querySelector('.countries-container-favorite').innerHTML = text;
};


// Country result render
function renderCountryResult(data) {
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


// Render current country data
function renderCurentCountry() {
  const curCountry = document.querySelectorAll('.country');

  curCountry.forEach(b => b.addEventListener('click', function(e) {
    let curCountryId = e.target.closest('.country').children[1].dataset.id;
    for(let i = 0; i < countriesData.length; i++)
      if( +curCountryId === countriesData[i].updated) renderCountryResult(countriesData[i]);
  }));
};

async function loadWorldCountry() {
  try {
    getLocalStorage();
    await inputData();  
    renderCountry();
    renderCurentCountry();

    const favBtn = document.querySelectorAll('.country_favorite');
    favBtn.forEach(b => b.addEventListener('click', function(e) {
      let curId = e.target.closest('.country').children[1].dataset.id;
      // e.target.closest('.country').style.display = 'none';
      for(let i = 0; i < countriesData.length; i++)
        if( +curId === countriesData[i].updated){
          countriesData[i].bookmarked = true;
          renderCountryFavorite(countriesData[i]);
        }

      inputId(curId);
      setLocalStorage();
      renderCurentCountry();

      // if(!e.target.closest('.country').classList.contains('country_favorite-active'))
      //   e.target.closest('.country').children[4].classList.add('country_favorite-active');
      // else  e.target.closest('.country').children[4].classList.remove('country_favorite-active');
    }));    
  } catch(err) {
    console.error(err);
  }
}

loadWorldCountry();

// search function
function myFunction() {
  let input, filter, country, countryName, txtValue;
  input = document.querySelector(".country_search");
  filter = input.value.toUpperCase();
  country = document.querySelectorAll(".country"); 

  for (let i = 0; i < country.length; i++) {
    countryName = country[i].getElementsByTagName("div")[0];
    if (countryName) {
      txtValue = countryName.textContent || countryName.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        country[i].style.display = "";
      } else {
        country[i].style.display = "none";
      }
    }
  }
};

