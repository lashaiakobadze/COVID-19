function getData (url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => { return data })
}

function loadWorldStats() {
    getData(`https://disease.sh/v3/covid-19/all`).then(data => {
        document.querySelectorAll('.cases')[0].innerHTML = data.cases.toLocaleString();
        document.querySelectorAll('.cases')[1].innerHTML = data.recovered.toLocaleString();
        document.querySelectorAll('.cases')[2].innerHTML = data.critical.toLocaleString();
        document.querySelectorAll('.cases')[3].innerHTML = data.deaths.toLocaleString();
    });
};

function loadWorldCountry() {
    getData(`https://disease.sh/v3/covid-19/countries`).then(data => {
        let text = "";

        for(let x = 0; x < data.length; x++) {
            text += `
            <div class="country">
                <img class="country_flag" src="${data[x].countryInfo.flag}" alt="cointry-flag">
                <div class="country_name">${data[x].country}</div>
                <div class="country_new">+${data[x].todayCases}</div>
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
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.querySelector(".country_search");
    filter = input.value.toUpperCase();
    table = document.querySelector(".countries-container");
    tr = document.querySelectorAll(".country");
  
    // Loop through all table rows, and hide those who don't match the search query
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