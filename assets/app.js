// Selectors
const wrapper = document.querySelector(".wrapper");
const cityBtn = document.querySelector("#type_city");
const inputPart = wrapper.querySelector(".input-part");
const infoTxt = inputPart.querySelector(".info-txt");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("#locationBtn");
const wIcon = document.querySelector(".weather-part img");
const arrowBack = wrapper.querySelector("header i")
let api;

// Events
cityBtn.addEventListener("click", ()=>{
    if (inputField.value != "") {
        requestApi(inputField.value);
    }
})

locationBtn.addEventListener("click" , ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
})

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
})
// Functions
function onSuccess(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    let apiKey = "";
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`

    fetchData();
}

function onError(err){
    infoTxt.innerText = err.message;
    infoTxt.classList.add("error");
}


function requestApi(city){
    let apiKey = "";
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}
function fetchData(){
    
    infoTxt.innerText = "Getting weather details ...";
    infoTxt.classList.add("pending")

    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result))
}
function weatherDetails(info){
    if (info.cod == "404") {
        infoTxt.classList.replace("pending","error")
        infoTxt.innerText = `${inputField.value} isn't valid city name`;
    
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;
       
        if (id == 800) {
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg"
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/storm.svg"
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/storm.svg"
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/storm.svg"
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src = "icons/storm.svg"
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = feels_like;
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending","error")
        wrapper.classList.add("active")
    }
}
