// Time 
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const output = month  + '\n'+ day  + '.' + year;

function getData (url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => { return data })
}

const time = document.querySelectorAll('.time');
function loadWorldStats() {
    getData(`https://disease.sh/v3/covid-19/all`).then(data => {
        document.querySelectorAll('.cases')[0].innerHTML = data.cases.toLocaleString();
        document.querySelectorAll('.cases')[1].innerHTML = data.recovered.toLocaleString();
        document.querySelectorAll('.cases')[2].innerHTML = data.critical.toLocaleString();
        document.querySelectorAll('.cases')[3].innerHTML = data.deaths.toLocaleString();

        time.forEach(t => t.innerHTML = output);
    });
};

function loadWorldCountry() {
    getData(`https://disease.sh/v3/covid-19/countries`).then(data => {
        let text = '';

        for(let x = 0; x < data.length; x++) {
            text += `
            <div class="country">
                <img class="country_flag" src="${data[x].countryInfo.flag}" alt="cointry-flag">
                <div class="country_name">${data[x].country}</div>
                <div class="country_new">+${data[x].todayCases}</div>
                <div class="country_new-recovered">+${data[x].todayRecovered}</div>
                <i class="fas fa-thumbtack country_favorite"></i>
            </div>
            `;
            document.querySelector('.countries-container').innerHTML = text;
        };
    });
}

loadWorldStats();
loadWorldCountry();

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
}

