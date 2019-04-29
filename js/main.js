const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// searchState function
const searchStates = async searchText =>{
  const res = await  fetch('../data/states.json');
  const states = await res.json();
  console.log({ALL_STATES: states});

  // get matches to current text input
  let matches = states.filter(state =>{
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.abbr.match(regex);
  })

  // if input is empty
  if(searchText.length === 0){
    matches = [];
    matchList.innerHTML = '';
  }
  console.log({Matches: matches});

  outputHtml(matches);
}

// show result in HTML
const outputHtml = matches => {
  if(matches.length > 0){
    const html = matches.map(match =>
      `
      <div class="card card-body mb-4">
      <h4> ${match.name} (${match.abbr})
      <span class="text-primary">
      ${match.capital}
      </span>
      </h4>
      <small> Lat: ${match.lat} / Lng: ${match.long}</small>
      </div>
      `
    ).join('');
      /***
       * return html tags in 
       */
    console.log(html);

    /**
     * populate to html UI
     */

     matchList.innerHTML = html;
  }

};


search.addEventListener('input', () => {
  searchStates(search.value);
})