var search = document.getElementById("submitBtn")
var temp = document.getElementById("temp")
var date = document.getElementById("today_date")
var day = document.getElementById("day")
var cityname = document.getElementById("city_name")
var wind = document.getElementById("wind")
var feel_like = document.getElementById("feels_like")
var t_max = document.getElementById("temp_max")
var t_min = document.getElementById("temp_min")
var press = document.getElementById("pressure")
var humid = document.getElementById("humidity")
var lati = document.getElementById("lat")
var long = document.getElementById("lon")
var vis = document.getElementById("visibility")
var desc = document.getElementById("description")
var madesc = document.getElementById("extra")
var today = new Date()
var timezone
var stat


if(today.getDay() == 0)
{
    day.innerHTML = "Sunday"
}
else if(today.getDay() == 1)
{
    day.innerHTML = "Monday"
}
else if(today.getDay() == 2)
{
    day.innerHTML = "Tuesday"
}
else if(today.getDay() == 3)
{
    day.innerHTML = "Wednesday"
}
else if(today.getDay() == 4)
{
    day.innerHTML = "Thursday"
}
else if(today.getDay() == 5)
{
    day.innerHTML = "Friday"
}
else
{
    day.innerHTML = "Saturday"
}



const weather = ()=>{
  
    date.innerHTML =today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    cityval = document.getElementById("cityname").value
    if(cityval == "")
    {
        alert("Enter the name of the city to get the temperature")
    }    
    else{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=67d3fd7861e99d574aef16ca9aa784ee`).then((apidata)=>{
            return apidata.json()
        }).then((data)=>{
            temp.innerHTML ="Temperature(in C) : "+Math.round(data.main.temp-273)
            cityname.innerHTML =`<i class="fa-solid fa-location-dot"></i>`+" City : "+ data.name
            wind.innerHTML =`<i class="fa-solid fa-wind"></i>`+" Wind Speed : "+data.wind.speed
            feel_like.innerHTML = "Feels Like : "+Math.round(`${data.main.feels_like-273}`)+" C"
            t_max.innerHTML  =`<i class="fa-solid fa-arrow-up"></i>`+" Maximum :"+Math.round(`${data.main.temp_max-273}`)+" C"
            t_min.innerHTML =`<i class="fa-solid fa-arrow-down"></i>`+" Minimum : "+Math.round(` ${data.main.temp_min-273}`)+" C"
            press.innerHTML =`<i class="fa-solid fa-tire-pressure-warning"></i>`+" Pressure : "+ data.main.pressure
            humid.innerHTML =`<i class="fa-solid fa-droplet-percent"></i>`+" Humidity : "+data.main.humidity
            lati.innerHTML =  "Latitude : "+data.coord.lat
            long.innerHTML = "Longitude : "+ data.coord.lon
            vis.innerHTML =`<i class="fa-solid fa-eye-slash"></i>`+" Visibility : "+data.visibility
            desc.innerHTML =  "Description : "+data.weather[0].description
            stat = data.weather[0].main
            telltime()
             setTimeout(function(){
               
                 if(stat == "Haze")
                 {
                    if(timezone < 20 && timezone > 6)
                    {
                    madesc.innerHTML = `<img src="../images/haze.png" style=" width: 300px;height: 150px;">`
                   }
                   else
                   {
                    madesc.innerHTML = `<img src="../images/hazemoon.png" style=" width: 300px;height: 150px;">`
                   }
                }
                else if(stat == "Clouds")
                {
                    madesc.innerHTML = `<img src="../images/cloud.png" style=" width: 300px;height: 150px;">`
                }
                else if(stat == "Rain")
                {
                    madesc.innerHTML = `<img src="../images/rain.png" style=" width: 300px;height: 150px;">`
                }
                else if(stat == "Dust")
                {
                    madesc.innerHTML = `<img src="../images/dust.png" style=" width: 300px;height: 150px;">`
                }
                else if(stat == "Thunderstorm")
                {
                    madesc.innerHTML = `<img src="../images/thunderstorm.png" style=" width: 300px;height: 150px;">`
                }
                else
                {
                    if(timezone < 20 && timezone > 6)
                    {
                    madesc.innerHTML = `<img src="../images/sun.png" style=" width: 300px;height: 150px;">`
                    }
                    else
                    {
                        madesc.innerHTML = `<img src="../images/clearmoon.png" style=" width: 300px;height: 150px;">`
                    }
                }  
             },1000)

 })
}
}

function telltime()
{
    cityval = document.getElementById("cityname").value
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '60a582b9c7msh6fa5fb6ae162491p137bccjsn0e735052d4a3',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
  fetch(`https://weatherapi-com.p.rapidapi.com/timezone.json?q=${cityval}`, options).then((response )=> 
        {
         return response.json()
    }).then((data) => {
        let time = data.location.localtime
        let result = time.substring(11)
        if(result.length === 4)
        {
            timezone = result.substring(0,1)
            return timezone
        }
        else
        {
            timezone = result.substring(0,2)
            return timezone
        }

    }).catch(err => console.error(err));
}