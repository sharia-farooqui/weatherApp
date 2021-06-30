let city=document.querySelector('.location-name');
let img=document.querySelector('.img');
let tempFar=document.querySelector('.temp-far');
let desc=document.querySelector('.temp-desc');

const API_key=config.myApi;
window.addEventListener('load',()=>{
    let lat;
    let long;

    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
        lat=position.coords.latitude;
        long=position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}`)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            // city
            city.innerText=`${data.name}, ${data.sys.country}`;
            console.log(data);
            //icon
            let iconCode=data.weather[0].icon;
            img.src="http://openweathermap.org/img/w/"+iconCode+".png";
            //temp
            tempInF=data.main.temp;
            tempFar.innerHTML=`${tempInF} \xB0F`;
            //farenheit to celsius
            tempFar.addEventListener('click',()=>{
                tempInC=(tempInF - 32) * 5 / 9;
                tempInCfloor=tempInC.toFixed(2);
                tempFar.innerHTML=`${tempInCfloor} \xB0C`;
            });
            //desc
            desc.innerText=data.weather[0].main;
        })
        .catch((error)=>{
            console.log('Error:',error);
        })
    });
    }
});