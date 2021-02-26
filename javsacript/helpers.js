// Fetch helper function
export async function getData(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
  
      if(!response.ok) throw new Error(`${data.message} (${response.status})`);
  
      return data;
    } catch (err) {
      throw err;
    };
};

// Sort function by country name
export function sortCountryByName(countriesData) {
    countriesData.forEach(data => {
        data.country.sort((a, b) => (a > b ? 1 : -1));
    });
};
