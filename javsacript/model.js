// Search function
export function mySearchFunction() {
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
    };
};

// Get time 
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

export function dateTime() {
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = month  + '\n'+ day  + '.' + year;
  return output;
};
