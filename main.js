
var CITIES = [
  { cityName: 'Sydney', lat: '-33.8688', lon: '151.2093' },
  { cityName: 'Brisbane', lat: '-27.4698', lon: '153.0251' },
  { cityName: 'Melbourne', lat: '-37.8136', lon: '144.9631' },
  { cityName: 'Snowy Mountains', lat: '-36.5000', lon: '148.3333' },

]

var currentCity = "";

window.onload = function () {
  AjaxMakeGetRequest(CITIES[0]);
}

function AjaxMakeGetRequest(city) {

  if (city != null) {
    currentCity = city;
    var lat = city.lat;
    var lon = city.lon;

    var prams = "?lat=" + lat + "&lon=" + lon;
    var url = "https://weatherbit-v1-mashape.p.mashape.com/forecast/3hourly" + prams;

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("X-Mashape-Key", "wSo0LRcHZMmsh4rXshasAImNK7Ulp19zkGQjsnUjeMXsnpyilC");

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);

        console.log(data.city_name);
        updateContent(data);
        handleRemainDay(data);
      }
    }

    xhttp.send();

  }


}


function handleGetDate(data) {
  var date = parseInt(data[0].datetime.slice(8, 10));
  return date;
}

function handleGetDay(d) {
  var day = '';
  switch (d) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }

  return day;
}

function updateWeatherImg(data) {
  var cloudyImg = "https://bit.ly/webApp_Assets_cloudy";
  var rainImg = "https://bit.ly/webApp_Assets_rain";
  var snowImg = "https://bit.ly/webApp_Assets_snow";
  var sunnyImg = "https://bit.ly/webApp_Assets_sunny";
  var thunderStorm = "https://bit.ly/webApp_Assets_thunderStorm";

  var todayWeatherImg = document.getElementById('today-weather-img');
  var weatherDescription = document.getElementById('weather-description');

  var des = data.data[0].weather.description.toLowerCase();
  switch (true) {
    case des.includes("clear"):
      todayWeatherImg.src = sunnyImg;
      weatherDescription.innerHTML = data.data[0].weather.description;
      break;
    case des.includes("clouds"):
      todayWeatherImg.src = cloudyImg;
      weatherDescription.innerHTML = data.data[0].weather.description;
      break;
    case des.includes("thunderstorm"):
      todayWeatherImg.src = thunderStorm;
      weatherDescription.innerHTML = data.data[0].weather.description;
      break;
    case des.includes("snows"):
      todayWeatherImg.src = snowImg;
      weatherDescription.innerHTML = data.data[0].weather.description;
      break;
    case des.includes("rain"):
      todayWeatherImg.src = rainImg;
      weatherDescription.innerHTML = data.data[0].weather.description;
      break;
    default:
      todayWeatherImg.src = sunnyImg;
      weatherDescription.innerHTML = data.data[0].weather.description;
      break;
  }

}

function updateContent(data) {

  var cityName = document.getElementById('city-title');
  var temp = document.getElementById('temp');
  var temp2 = document.getElementById('temp-2');
  var vis = document.getElementById('vis');


  var date = handleGetDate(data.data);

  var date = new Date();
  var d = date.getDay() // 1 ,2, 3

  var day = handleGetDay(d); // Mon , Tue

  cityName.innerHTML = data.city_name;
  temp.innerHTML = data.data[0].temp + "&#176 ";
  temp2.innerHTML = data.data[0].temp + "&#176 ";
  vis.innerHTML = data.data[0].vis + "&#176 ";

  updateWeatherImg(data);

}

function nextCity() {
  var i = CITIES.indexOf(currentCity);
  if (i < CITIES.length) {
    AjaxMakeGetRequest(CITIES[i + 1]);
  }

}

function previousCity() {
  var i = CITIES.indexOf(currentCity);
  AjaxMakeGetRequest(CITIES[i - 1]);
}


function handleRemainDay(data) {

  var remainingData = [];
  var nextFiveDayData = [];


  var fullDay = [0, 1, 2, 3, 4, 5, 6];
  var date = new Date();
  var d = date.getDay() // 1 ,2, 3

  var remainingDay = fullDay.filter(day => day != d); // [1, 3,4,5,6]

  var nextFiveDay = [];

  var today = handleGetDate(data.data); // 26


  for (i = 1; i < 6; i++) {
    var newArr = data.data.filter(date => date.datetime.slice(8, 10) == today + i);
    nextFiveDayData.push(newArr[0]);
  }
  console.log(nextFiveDayData);

  for (let i in remainingDay) {
    let d = parseInt(i);
    var nextDay = handleGetDay(d); // Mon , Tue
    nextFiveDay.push(nextDay);
  }

  var weatherImgs = nextFiveDayWeatherImg(nextFiveDayData);

  var day1 = document.getElementById('day1');
  var day2 = document.getElementById('day2');
  var day3 = document.getElementById('day3');
  var day4 = document.getElementById('day4');
  var day5 = document.getElementById('day5');

  var temp1 = document.getElementById('temp1');
  var temp2 = document.getElementById('temp2');
  var temp3 = document.getElementById('temp3');
  var temp4 = document.getElementById('temp4');
  var temp5 = document.getElementById('temp5');

  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var img3 = document.getElementById('img3');
  var img4 = document.getElementById('img4');
  var img5 = document.getElementById('img5');

  day1.innerHTML = nextFiveDay[0];
  day2.innerHTML = nextFiveDay[1];
  day3.innerHTML = nextFiveDay[2];
  day4.innerHTML = nextFiveDay[3];
  day5.innerHTML = nextFiveDay[4];

  temp1.innerHTML = nextFiveDayData[0].temp + "/" + nextFiveDayData[0].vis;
  temp2.innerHTML = nextFiveDayData[1].temp + "/" + nextFiveDayData[1].vis;
  temp3.innerHTML = nextFiveDayData[2].temp + "/" + nextFiveDayData[2].vis;
  temp4.innerHTML = nextFiveDayData[3].temp + "/" + nextFiveDayData[3].vis;
  temp5.innerHTML = nextFiveDayData[4].temp + "/" + nextFiveDayData[4].vis;

  console.log(weatherImgs);
  img1.src = weatherImgs[0];
  img2.src = weatherImgs[1];
  img3.src = weatherImgs[2];
  img4.src = weatherImgs[3];
  img5.src = weatherImgs[4];




}



function nextFiveDayWeatherImg(data) {
  var cloudyImg = "https://bit.ly/webApp_Assets_cloudy";
  var rainImg = "https://bit.ly/webApp_Assets_rain";
  var snowImg = "https://bit.ly/webApp_Assets_snow";
  var sunnyImg = "https://bit.ly/webApp_Assets_sunny";
  var thunderStorm = "https://bit.ly/webApp_Assets_thunderStorm";

  var weatherImgs = [];

  for (let item of data) {
    var des = item.weather.description.toLowerCase();

    switch (true) {
      case des.includes("clear"):
        weatherImgs.push(sunnyImg);
        break;
      case des.includes("clouds"):
        weatherImgs.push(cloudyImg);
        break;
      case des.includes("thunderstorm"):
        weatherImgs.push(thunderStorm);
        break;
      case des.includes("snows"):
        weatherImgs.push(snowImg);
        break;
      case des.includes("rain"):
        weatherImgs.push(rainImg);
        break;
      default:
        weatherImgs.push(sunnyImg);
        break;
    }
  }


  return weatherImgs;
}