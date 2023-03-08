//alert('ok');
let loc = document.getElementById("location");
let tempicon = document.getElementById("temperature-icon");
let tempvalue = document.getElementById("temperature-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

window.addEventListener("load", () => {  //for the popup to allow my current location

    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=96c705a45c5ed835bbf5d71f2a958941`

            fetch(api).then((response) => {
                return response.json();

            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);


                })

        })
    }


})


searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
})

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96c705a45c5ed835bbf5d71f2a958941`,
            { mode: 'cors' }
        );
        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);


    }
    catch (error) {
        alert('city not found');
    }
}














