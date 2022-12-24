//Benton
function getGames(){
  var dateOne = document.getElementById("date-input-1").value;
  var dateTwo = document.getElementById("date-input-2").value;
  var season = document.getElementById("season-input").value;
  
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'insert your key here',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?league=1&season=' + season + '&from=' + dateOne + '&to=' + dateTwo, options)
	.then(response => response.json())
	.then(response => buildGamesHTML(response['response']))
	.catch(err => console.error(err));

return false;
}

function buildGamesHTML(games){
  let main = document.getElementById("main");
  main.innerHTML = "";
  
  for(let i = 0; i < games.length; i++){
    let date = games[i]['fixture']['date'].substring(0, 10);;
    
    let homeTeam = games[i]['teams']['home'];
    let awayTeam = games[i]['teams']['away'];
    let homeName = homeTeam['name'];
    let awayName = awayTeam['name'];
    let homeWin = homeTeam['winner'];
    let awayWin = awayTeam['winner'];
    let homeLogo = homeTeam['logo'];
    let awayLogo = awayTeam['logo'];

    let homeGoals = games[i]['goals']['home'];
    let awayGoals = games[i]['goals']['away'];

    let homeWinClass = null;
    let awayWinClass = null;
    if(homeWin == null){
      homeWinClass = "tie";
      awayWinClass = "tie";
    } else if(homeWin == true){
      homeWinClass = "winner";
      awayWinClass = "loser";
    } else {
      homeWinClass = "loser";
      awayWinClass = "winner";
    }

    let game = 
    
    `<div class="game-container">
        <div class="flex middle center date-container">
          <div class="x2"></div>
          <h3 class="x3 flex middle center date">${date}</h3>
          <div class="x2"></div>
        </div>
        <div class="flex teams-container">
          <div class="x1 flex center team-container team-one-container ${homeWinClass}">
            <img class="x1 team-logo team-one-logo" src="${homeLogo}" alt="team image">
            <h4 class="x2 flex center middle team-name team-one-name">${homeName}</h4>
            <h2 class="x1 flex middle center team-score team-one-score">${homeGoals}</h2>
          </div>
          <div class="x1 flex center team-container team-two-container ${awayWinClass}">
            <h2 class="x1 flex middle center team-score team-two-score">${awayGoals}</h2>
            <h4 class="x2 flex center middle team-name team-two-name">${awayName}</h4>
            <img class="x1 team-logo team-two-logo" src="${awayLogo}" alt="team image">
          </div>
        </div>
      </div>;`

    let toAppend = document.createRange().createContextualFragment(game);

    main.appendChild(toAppend);
  }
}