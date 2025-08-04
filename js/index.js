const API_KEY = "1940ff0caf855acdb54822e7b8340ffd";

const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => setWeatherData(data));
};

const setWeatherData = (data) => {
  console.log(data);
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: data.main.temp,
    date: getDate(),
  };

  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });

  cleanUp();
};

const cleanUp = () => {
  const container = document.getElementById("container");
  const loader = document.getElementById("loader");

  loader.style.display = "none";
  container.style.display = "flex";
};

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${date.getFullYear()}`;
};

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};
