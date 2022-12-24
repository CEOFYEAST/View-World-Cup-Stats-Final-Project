function fetchPlayer(){
  var nameInput = document.getElementById("name-input");
  toFetch = nameInput.value;
  
  const options = {
	  method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': 'insert your key here',
  		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  	}
  };

  fetch('https://api-football-v1.p.rapidapi.com/v3/players?league=1&season=2022&search=' + toFetch, options)
      .then(response => response.json())
      .then(response => convertStatistics(response))
      .catch(err => console.error(err));

  statsContainer = document.getElementById("stats-container");
  if(statsContainer.classList.contains("hidden")){
    statsContainer.classList.toggle("hidden");
  }
  
  return false;
}

function convertStatistics(player){
  document.getElementById("name").innerHTML = 
  player['response']['0']['player']['name'];

  document.getElementById("age").innerHTML = 
  player['response']['0']['player']['age'];

  document.getElementById("birthplace").innerHTML = 
  player['response']['0']['player']['birth']['place'];

  document.getElementById("height").innerHTML = 
  player['response']['0']['player']['height'];

  document.getElementById("weight").innerHTML = 
  player['response']['0']['player']['weight'];

  document.getElementById("player-image").src = 
  player['response']['0']['player']['photo'];

  //-----------------------------------------
  
  document.getElementById("team").innerHTML = 
   player['response']['0']['statistics'][0]['team']['name'];
  
  document.getElementById("team-image").src = 
  player['response']['0']['statistics'][0]['team']['logo'];
  
  document.getElementById("minutes").innerHTML = 
  player['response']['0']['statistics'][0]['games']['minutes'];

  document.getElementById("position").innerHTML = 
  player['response']['0']['statistics'][0]['games']['position'];

  document.getElementById("rating").innerHTML = 
  player['response']['0']['statistics'][0]['games']['rating'];

  document.getElementById("goals").innerHTML = 
  player['response']['0']['statistics'][0]['goals']['total'];

  document.getElementById("passes").innerHTML = 
  player['response']['0']['statistics'][0]['passes']['total'];
}