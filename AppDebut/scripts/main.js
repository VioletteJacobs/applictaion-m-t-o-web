import tabJour from './Utilitaire/gestionTemps.js'
const CleAPI = 'fe41a4daca2ce8de798973408e024747';
let resultatAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');

const heure = document.querySelectorAll('.heure_nom_prevision');
const tempheure = document.querySelectorAll('.heure_prevision_valeur');

const Jour = document.querySelectorAll('.jour_nom_prevision');
const tempJour = document.querySelectorAll('.jour_prevision_valeur');
const iconImg = document.querySelector('.logo_meteo');
const chargementContainer = document.querySelector('.overlay_icon_chargement')

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat)
    }, ()=>{
        alert(`Vous avez refuser la géolocalistaion, veuillez l'activer`)
    })
}
function AppelAPI(long, lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CleAPI}`)
    .then((reponse) =>{
        return reponse.json();
    })
    .then((data)=>{
       resultatAPI = data;
       temps.innerText = resultatAPI.current.weather[0].description;
       temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°`;
       localisation.innerText = resultatAPI.timezone;


        const heureActuelle = new Date().getHours();

       for(let i=0; i< heure.length; i++){
           let heureIncr = heureActuelle +i*3

           if(heureIncr > 24){
               heure[i].innerText = `${heureIncr -24}h`
           }else if( heureIncr == 24){
               heure[i].innerText = "00";
           }else{
               heure[i].innerText = `${heureIncr} h`;
           }
        }
        //    temperature pour les heures *3
       for(let j=0; j< tempheure.length; j++){
           tempheure[j].innerText= `${Math.trunc(resultatAPI.hourly[(j*3)+3].temp)}°`
        }
        // jours
        for(let k = 0; k < tabJour.length; k++ ){
            Jour[k].innerText = tabJour[k].slice(0,3);

        }


        
        for (let m = 0; m < 7; m++) {
            tempJour[m].innerText = `${Math.trunc(resultatAPI.daily[m +1].temp.day)}°`;
            
        }
        
        // changement de l'icone
        if(heureActuelle >= 6 && heureActuelle < 21){
            iconImg.src = `ressources/jour/${resultatAPI.current.weather[0].icon}.svg`
        }else{
            iconImg.src = `ressources/nuit/${resultatAPI.current.weather[0].icon}.svg`
            // console.log(iconImg.src);
        }
        
        chargementContainer.classList.add("disparition");
    })
}