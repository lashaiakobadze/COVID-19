// Time 
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const output = month  + '\n'+ day  + '.' + year;

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

let countriesData = '';
const worldUrl = 'https://disease.sh/v3/covid-19/all';
const countryUrl = "https://disease.sh/v3/covid-19/countries";

// world information
const time = document.querySelectorAll('.time');
const cases = document.querySelectorAll('.cases');
time.forEach(t => t.innerHTML = output);

async function loadWorldStats() {
    const worldData = await getData(worldUrl);
    cases[0].innerHTML = worldData.cases.toLocaleString();
    cases[1].innerHTML = worldData.recovered.toLocaleString();
    cases[2].innerHTML = worldData.critical.toLocaleString();
    cases[3].innerHTML = worldData.deaths.toLocaleString();
};

loadWorldStats();

// country information
async function loadWorldCountry() {
  countriesData = await getData(countryUrl);

  let text = '';
  let html = '';

  countriesData.forEach( data => {
    text += `
    <div class="country">
        <img class="country_flag" src="${data.countryInfo.flag}" alt="${data.country}-flag">
        <div class="country_name" data-id="${data.updated}">${data.country}</div>
        <div class="country_new">+${data.todayCases}</div>
        <div class="country_new-recovered">+${data.todayRecovered}</div>
        <i class="fas fa-thumbtack country_favorite"></i>
    </div>
    `;
    document.querySelector('.countries-container').innerHTML = text;

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
  });

  console.log(countriesData);
}

loadWorldCountry();

console.log(countriesData);

// search function
function myFunction() {
  let input, filter, tr, td, i, txtValue;
  input = document.querySelector(".country_search");
  filter = input.value.toUpperCase();
  tr = document.querySelectorAll(".country");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("div")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};


/*
// Render countr data from country data array

function country(flag, countryName, todayCases, todayRecovered, cases, recovered, critical, deaths) {
  this.flag = flag;
  this.countryName = countryName;
  this.todayCases = todayCases;
  this.todayRecovered = todayRecovered;
  this.cases = cases;
  this.recovered = recovered;
  this.critical = critical;
  this.deaths = deaths;
}

async function inputData() {
  getData(`https://disease.sh/v3/covid-19/countries`).then(data => {
      for(let i = 0; i < data.length; i++) {
        const newCountry = new country(data[i].countryInfo.flag, data[i].country, data[i].todayCases, data[i].todayRecovered, data[i].cases, data[i].recovered, data[i].critical, data[i].deaths)
        countriesData.push(newCountry);
        // countriesData.push([data[i].countryInfo.flag, data[i].country, data[i].todayCases, data[i].todayRecovered, data[i].cases, data[i].recovered, data[i].critical, data[i].deaths]);
      };
  });


  // let text = '';

  // for(let i = 0; i < countriesData.length; i++) {
  //     text += `
  //     <div class="country">
  //         <img class="country_flag" src="${countriesData[i][0]}" alt="cointry-flag">
  //         <div class="country_name">${countriesData[i][1]}</div>
  //         <div class="country_new">+${countriesData[i][2]}</div>
  //         <div class="country_new-recovered">+${countriesData[i][3]}</div>
  //         <i class="fas fa-thumbtack country_favorite"></i>
  //     </div>
  //     `;
  //   };
  //   document.querySelector('.countries-container').innerHTML = text;
};

inputData();

function renderCountry(country) {
  let html = '';
      text += `
      <div class="country">
          <img class="country_flag" src="${country.flag}" alt="cointry-flag">
          <div class="country_name">${country.countryName}</div>
          <div class="country_new">+${country.todayCases}</div>
          <div class="country_new-recovered">+${country.todayRecovered}</div>
          <i class="fas fa-thumbtack country_favorite"></i>
      </div>
      `;
  document.querySelector('.countries-container').insertAdjacentHTML('beforeend', html);
}

async function vaxtang() {
  await countriesData.map(data => renderCountry(data));
  if(countriesData.length <= 0) console.log('jer ar Sevsebula');
};

vaxtang();

console.log(countriesData);

// // country data
// function loadWorldCountry() {
    // let text = '';

    // for(let x = 0; x < countriesData.length; x++) {
    //     text += `
    //     <div class="country">
    //         <img class="country_flag" src="${countriesData[x].flag}" alt="cointry-flag">
    //         <div class="country_name">${countriesData[x].country}</div>
    //         <div class="country_new">+${countriesData[x].todayCases}</div>
    //         <div class="country_new-recovered">+${countriesData[x].todayRecovered}</div>
    //         <i class="fas fa-thumbtack country_favorite"></i>
    //     </div>
    //     `;
    //     document.querySelector('.countries-container').innerHTML = text;
    // };

//     console.log('darenderda');
// }

// setTimeout(loadWorldCountry, 100000);
*/
