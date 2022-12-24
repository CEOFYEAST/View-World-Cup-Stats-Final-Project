function getLeaders(){
  var nameInput = document.getElementById("name-input");
  toFetch = nameInput.value;

  switch(toFetch){
    case "Top Scorers":
      getTopScorers();
      break;
    case "Top Assists":
      getTopAssists();
      break;
    case "Top Yellow Cards":
      getTopYellowCards();
      break;
    case "Top Red Cards":
      getTopRedCards();
      break;
    default:
  }

  return false;
}

function getTopScorers(){
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': 'insert your key here',
  		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  	}
  };
  
  fetch('https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=1&season=2022', options)
  	.then(response => response.json())
  	.then(response => buildHTML(response['response'], 0))
  	.catch(err => console.error(err));
}

function getTopAssists(){
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': 'insert your key here',
  		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  	}
  };
  
  fetch('https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=1&season=2022', options)
  	.then(response => response.json())
  	.then(response => buildHTML(response['response'], 1))
  	.catch(err => console.error(err));
}

function getTopYellowCards(){
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': 'insert your key here',
  		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  	}
  };
  
  fetch('https://api-football-v1.p.rapidapi.com/v3/players/topyellowcards?league=1&season=2022', options)
  	.then(response => response.json())
  	.then(response => buildHTML(response['response'], 2))
  	.catch(err => console.error(err));
}

function getTopRedCards(){
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': 'insert your key here',
  		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  	}
  };
  
  fetch('https://api-football-v1.p.rapidapi.com/v3/players/topredcards?league=1&season=2022', options)
  	.then(response => response.json())
  	.then(response => buildHTML(response['response'], 3))
  	.catch(err => console.error(err));
}

function buildHTML(leaders, type){
  let main = document.getElementById("main");

  main.innerHTML = "";
  
  for(let i = 0; i < 10; i++){
    let name = leaders[i]['player']['name'];
    let src = leaders[i]['player']['photo'];
    let innerText = null;
    let colorClass = null;
    let statistics = null;
    leaders[i]['statistics'][0]['goals']['total'];
    
    if(type == 0){
      innerText = "Score:";
      colorClass = "color-score";
      statistics = leaders[i]['statistics'][0]['goals']['total'];
    } else if(type == 1){
      innerText = "Assists:";
      colorClass = "color-assists";
      statistics = leaders[i]['statistics'][0]['goals']['assists'];
    } else if(type == 2){
      innerText = "Yellow Cards:";
      colorClass = "color-yellow-cards";
      statistics = leaders[i]['statistics'][0]['cards']['yellow'];
    } else if(type == 3) {
      innerText = "Red Cards:";
      colorClass = "color-red-cards";
      statistics = leaders[i]['statistics'][0]['cards']['red'];
    }
    
    let leader = 
      
      `<div class="${colorClass}">
        <div class="flex middle center number-container">
          <h1>#${i + 1}</h1>
        </div>
        <div class="flex">
          <div class="x1">
            <img class="player-image" src="${src}" alt="">
          </div>
          <div class="x3">
            <div class="flex middle center name-container"><Strong>${name}</Strong></div>
            <div class="flex">
              <div class="x1 prompt">${innerText}</div>
              <div class="x2 response">
                <h3>${statistics}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    let toAppend = document.createRange().createContextualFragment(leader);

    main.appendChild(toAppend);
  }
}