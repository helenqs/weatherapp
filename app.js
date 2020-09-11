window.addEventListener('load', ()=> {
    let long;
    let lat;
    let units = "imperial";
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=82c40b95a0216d9d266962f073e369df`

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    //Set DOM elements from the API
                    temperatureDegree.textContent = data.main.temp;
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.name;

                    //set icon
                    document.getElementById("icon-id").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


                    //function expressions with conversion formulas
                    let F2C = function () {
                        return ((temperatureDegree.textContent - 32) * 5 ) / 9;
                    }

                    let C2F = function () {
                        return ((temperatureDegree.textContent / 5) * 9 ) + 32;
                    }

                    //change temperature unit
                    temperatureSection.addEventListener('click', ()=> {
                        if(temperatureSpan.textContent == "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.round( 100 * F2C() )/100;
                            
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.round( 100 * C2F() )/100;
                            

                        }
                    });

                });
        });
    } 


});