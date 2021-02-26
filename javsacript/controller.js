import { worldUrl, countryUrl} from './config.js';
import { getData } from './helpers.js';
import { dateTime, mySearchFunction } from './model.js';
import { renderCountryFavorite, renderCountryResult, renderCountry } from './renders.js';

let countriesData = [];
let favoriteCountryId = [];

// World information render
const cases = document.querySelectorAll('.cases');
const time = document.querySelectorAll('.time');
time.forEach(t => t.innerHTML = dateTime());

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

// Get countries from API and filter
async function getAllCountries() {
  try {
    countriesData = await getData(countryUrl);
    countriesData.forEach(data => data.favorite = false);
  
     favoriteCountryId.map(
        favElement => { 
          countriesData.find(countryObj => {
            if(countryObj.updated == favElement) countryObj.favorite = true;
        })
    });
  } catch(err) {
    console.log(err);
  }
};

//Local storage
function setLocalStorage() {
  localStorage.setItem('favoriteCountryId', JSON.stringify(favoriteCountryId));
};

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('favoriteCountryId'));

  if (!data) return;

  favoriteCountryId = data;
};

// Push favorite id
function inputId(id) {
  if(favoriteCountryId.length === 0) favoriteCountryId.push(id);

  const favorit = (element) => element === id;
  if (!favoriteCountryId.some( favorit )) favoriteCountryId.push(id);
};

// Outpoot id 
function outPutId(id) {
  for(let i = 0; i < favoriteCountryId.length; i++) {
    if(favoriteCountryId[i] == id) {
        favoriteCountryId.splice(i, 1);
    }
  };
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

// Render all country data as list
async function loadWorldCountry() {
  try {
    getLocalStorage();
    await getAllCountries();  
    countriesData.forEach( data => renderCountry(data));
    renderCurentCountry();

    const favoriteBtn = document.querySelectorAll('.country_favorite');
    const reFavoriteBtn = document.querySelectorAll('.country_favorite-active');

    favoriteBtn.forEach(b => b.addEventListener('click', function(e) {
      let curId = e.target.closest('.country').children[1].dataset.id;

      e.target.closest('.country').style.display = 'none';

      for(let i = 0; i < countriesData.length; i++)
        if( +curId === countriesData[i].updated){
          countriesData[i].favorite = true;
          renderCountryFavorite(countriesData[i]);
        }

      inputId(curId);    
      setLocalStorage();
      renderCurentCountry();
    }));    

    reFavoriteBtn.forEach(b => b.addEventListener('click', function(e) {
      document.querySelectorAll('.country_favorite-active');
      let curId = e.target.closest('.country').children[1].dataset.id;
      e.target.closest('.country').style.display = 'none';

      for(let i = 0; i < countriesData.length; i++)
        if( +curId === countriesData[i].updated){
          countriesData[i].favorite = false;
        }

      outPutId(curId);
      setLocalStorage();
      renderCurentCountry();
    }));    

  } catch(err) {
    console.error(err);
  }
}
loadWorldCountry();

// Search countries from list
document.querySelector('.country_search').addEventListener('keyup', mySearchFunction);
























































































































































































































































































































































































































































































































































































































































































































































































