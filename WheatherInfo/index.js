document.addEventListener("DOMContentLoaded", ()=> {
    const cityInput = document.getElementById('city-input');
    const getWeatherbtn = document.getElementById('get-weather-btn');
    const weatherInfo =  document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature')
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const API = "add the api key"

    getWeatherbtn.addEventListener('click', async () =>{
            const city = cityInput.value.trim();

            if(!city) return;
            // it may throw an error if the city
            // // server// database is always in another continent

            try{
                const weatherData = await fetchWeatherdata(city); 
                displayWeatherData(weatherData);


            }catch(error){
                showError();
            }
             

    })

    async function  fetchWeatherdata(city){
         
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;
        const response =  await fetch(url);
        console.log(typeof(response));
        console.log(response);
        if(!response.ok){
                throw new Error("city Not Found");
              
        }

        const data = await response.json();
    
        return data;            
    }

    function displayWeatherData(data){
            console.log(data);
            const {name , main , weather} = data; 
            cityNameDisplay.textContent=name;
            temperatureDisplay.textContent = `Temperature:${main.temp}`;
            descriptionDisplay.textContent =`Description:${weather[0].description
            }`;
            //unlock the display
            weatherInfo.classList.remove('hidden');
            errorMessage.classList.add('hidden');
         
           

    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
    

})