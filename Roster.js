function getTeamRoster(){
  var nameInput = document.getElementById("name-input");
  toFetch = nameInput.value;
  
  //gets team information 
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': 'insert your key here',
  		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  	}
  };
  fetch('https://api-football-v1.p.rapidapi.com/v3/teams?name=' + toFetch + '&league=1&season=2022', options)
  	.then(response => response.json())
  	.then(response => response['response']['0']['team']['id'])
    .then(response => getTeamMembers(response))
  	.catch(err => console.error(err));

  main = document.getElementById("main");
  if(main.classList.contains("hidden")){
    main.classList.toggle("hidden");
  }
  
  return false;
}

function getTeamMembers(teamID){
  //gets all players on team of specified teamID
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'insert your key here',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };
  fetch('https://api-football-v1.p.rapidapi.com/v3/players?team=' + teamID + '&league=1&season=2022', options)
    .then(response => response.json())
    .then(response => buildRoster(response['response']))
    .catch(err => console.error(err));
}

function buildRoster(roster){
  let main = document.getElementById("main");

  main.innerHTML = "";
  
  let appendTo = document.createElement("div");
	appendTo.className = "flex row";
  //HTML = document.createRange().createContextualFragment();
  //appendTo.appendChild(HTML);
    
  for(let i = 1; i <= roster.length; i++){
    let firstname = roster[i]['player']['firstname'];
    let appearences = roster[i]['statistics'][0]['games']['appearences'];
    let src = roster[i]['player']['photo'];

    let toAppendString = 
      
      `<div class="x1 space"></div>
        <div class="x3 team-member">
          <div class="flex team-member-info">
            <div class="x1 prompt">Name:</div>
            <div class="x2 response">${firstname}</div>
          </div>
          <div class="flex team-member-info">
            <div class="x1 prompt appearences">Appearences:</div>
            <div class="x2 response">${appearences}</div>
          </div>
          <div class="team-member-image-container">
            <img class="team-member-image" src="${src}" alt="">
          </div>
        </div>`;

    let toAppend = document.createRange().createContextualFragment(toAppendString);

    appendTo.appendChild(toAppend);
    if(!(i + 1 > roster.length)){
      if(i % 3 == 0){
        toAppend = document.createElement("div");
        toAppend.className = "x1 space";
        appendTo.appendChild(toAppend);

        main.appendChild(appendTo);
        
        appendTo = document.createElement("div");
        appendTo.className = "flex row";
      }
    } else {
      switch(i % 3) {
        case 0: 
          break;
        case 1: 
          toAppend = document.createElement("div");
          toAppend.className = "x1";
          appendTo.appendChild(toAppend);
          toAppend.className = "x3";
          appendTo.appendChild(toAppend);
          toAppend.className = "x1";
          appendTo.appendChild(toAppend);
          toAppend.className = "x3";
          appendTo.appendChild(toAppend);
          toAppend.className = "x1";
          appendTo.appendChild(toAppend);
          break;
        case 2: 
          toAppend = document.createElement("div");
          toAppend.className = "x1";
          appendTo.appendChild(toAppend);
          toAppend.className = "x3";
          appendTo.appendChild(toAppend);
          toAppend.className = "x1";
          break;
      }
      main.appendChild(appendTo);
    }
  }
}