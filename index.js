let sky='';
let temp=0;
let sunny=['#ddfcfa','#05ada3','#4798c9'];
let cloudy=['#e6f1ee','#939594','#464646'];
let barColorCodes=['#233eff','#00edff','#0ff0cf','#edff07','#e49a19','#c92828'];

let lat='';
let lon='';

let hoodieSrc='https://images.vexels.com/media/users/3/152494/isolated/preview/e8b010275a3ab6f33695f839a9ae600e-hoodie-stroke-icon-by-vexels.png';
let tshirtSrc='https://images.vexels.com/media/users/3/142647/isolated/preview/7975c8713e6cd70ff26097efbbebdbd1-tshirt-clothes-by-vexels.png';
let jacketSrc='https://www.freepnglogos.com/uploads/jacket-png/stroke-striped-jacket-clothing-transparent-png-svg-vector-26.png';

let weatherKey='967138c60d76ae5076556ba54c54306f';



function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
}

function updatePosition(position) {
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    getWeather();
}

function getWeather(){
    fetch('http://api.openweathermap.org/data/2.5/weather?units=metric&lat='+lat+'&lon='+lon+'&appid='+weatherKey)
        .then(res=>res.json())
        .then(data => {
            sky=data.weather[0].main;
            temp=parseFloat(data.main.temp);
            ChangeSky();
        })
}

function ChangeSky(){
    if(sky=='Clear')
    {
        document.documentElement.style.setProperty('--bg-gradient-1', sunny[0]);
        document.documentElement.style.setProperty('--bg-gradient-2', sunny[1]);
        document.documentElement.style.setProperty('--bg-gradient-3', sunny[2]);
    } else {
        document.documentElement.style.setProperty('--bg-gradient-1', cloudy[0]);
        document.documentElement.style.setProperty('--bg-gradient-2', cloudy[1]);
        document.documentElement.style.setProperty('--bg-gradient-3', cloudy[2]);
    }
    calculateAngle();
}

function calculateAngle(){
    let start=67.5; 
    let rate=4.5; 

    let angle=temp*rate+start;

    document.documentElement.style.setProperty('--angle', angle+'deg');
    changeColorOnAngle(angle);
}

function changeColorOnAngle(angle){
    angle=angle-45;
    angle=angle/30;


    var i=1;
    for(i=1;i<7;i++)
    if(angle<i){
        document.documentElement.style.setProperty('--bar-color', barColorCodes[i-1]);
        break;
    }

    animationStart();
}

function animationStart(){
    document.getElementById('bar').classList.add('rotatingObject');
    changeClothes();
}

function changeClothes()
{
    let image="";
    if(temp<10){
        image=jacketSrc;
    }else if(temp<21){
        image=hoodieSrc;
    }else{
        image=tshirtSrc;
    }
    document.getElementById("clothes").innerHTML='<img src='+image+' id="image">';
    writeTemperature();
}

function writeTemperature(){
    document.getElementById("current").innerHTML='<p>'+temp+" C </p>";
}
