// Write your JavaScript code here!



window.addEventListener("load", function() {
   let form = document.querySelector("#launchForm");
   
   //form inputs
   let pilotNameInput = document.querySelector("input[name='pilotName']");
   let copilotNameInput = document.querySelector("input[name='copilotName']");
   let fuelLevelInput = document.querySelector("input[name='fuelLevel']");
   let cargoMassInput = document.querySelector("input[name='cargoMass']");
   
   //status feilds
   let launchStatus = document.querySelector("#launchStatus")
   let faultyItemsList = document.querySelector("#faultyItems");
   let pilotStatus = document.querySelector("#pilotStatus");
   let copilotStatus = document.querySelector("#copilotStatus");
   let fuelStatus = document.querySelector("#fuelStatus");
   let cargoStatus = document.querySelector("#cargoStatus");

   //planet fetch
   let missionTarget = document.querySelector("#missionTarget");
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
   response.json().then(function(json){   
      missionTarget.innerHTML = `<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[0].name}</li>
         <li>Diameter: ${json[0].diameter}</li>
         <li>Star: ${json[0].star}</li>
         <li>Distance from Earth: ${json[0].distance}</li>
         <li>Number of Moons: ${json[0].moons}</li>
      </ol>
      <img src="${json[0].image}">`
      })
   });


   //Form listener
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      //---PART ONE---
      //validation: no empty inputs
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert('All fields are required.');
         event.preventDefault();
      }
      //validation: names are strings
      if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
         alert('Pilot and Co-Pilot feilds must contain a name.');
         event.preventDefault();
      }
      //validation: fuel & cargo are numbers
      if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert('Fuel Level and Cargo Mass must be numbers.');
         event.preventDefault();
      }

      //---PART TWO---
      let launchReady = true
      
      //names
      pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for Launch`
      copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for Launch`

      //fuel level too low
      if(fuelLevelInput.value < 10000){
         fuelStatus.innerHTML = 'Fuel level is too low for launch. Minimum of 10,000 Liters required.'
         fuelStatus.style.color = 'red'
         faultyItemsList.style.visibility = 'visible'
         launchReady = false
         event.preventDefault();
      }
      if (cargoMassInput.value > 10000){
         cargoStatus.innerHTML = 'Cargo mass is too high for launch. Mass cannot exceed 10,000 kilograms.'
         cargoStatus.style.color = 'red'
         faultyItemsList.style.visibility = 'visible'
         launchReady = false
         event.preventDefault();
      }

      if (launchReady){
         launchStatus.innerHTML = 'Shuttle is ready for launch'
         launchStatus.style.color = 'green'
      } else {
         launchStatus.innerHTML = 'Shuttle not ready for launch'
         launchStatus.style.color = 'red'
      }
   });
});
