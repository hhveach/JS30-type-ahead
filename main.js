
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const newCities = [];

fetch(endpoint).then(stuff => stuff.json()).then(data => newCities.push(...data));

// console.log(newCities);

function match (word, arr){
  return arr.filter(place => {
    const reg = new RegExp(word, 'gi');
    return place.city.match(reg) || place.state.match(reg);
  });
};

function numWithCommas (x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function displayMatches(){
// console.log(this.value);
  const matches = match(this.value, newCities);
  // console.log(matches);
  // const highlight = new RegExp(this.value, 'gi');
  // const city = place.city.replace(highlight, '<span class="hl">${this.value}</span>')
  const html = matches.map(place => {
    const highlight = new RegExp(this.value, 'gi');
    const city = place.city.replace(highlight, `<span class="hl">${this.value}</span>`)
    const state = place.state.replace(highlight, `<span class="hl">${this.value}</span>`)

    return  `
      <li>
        <span class="name">${city}, ${state}</span>
        <span class="population">${numWithCommas(place.population)}</span>


      </li>
    `
  }).join('');
  sugg.innerHTML = html;
}


const input = document.querySelector('.search');
const sugg = document.querySelector('.suggestions');

input.addEventListener('change', displayMatches);
input.addEventListener('keyup', displayMatches);
