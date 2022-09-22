function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

let list = []

const getWeatherInfo = (lat, lon)=>{
    // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6f8c4e83638c34920aa20a82b6705814&units=metric&lang=pl`)
    fetch(`https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/info/lat%3D${lat}%26lon%3D${lon}`)
    
    .then((res) => res.json())
    .then((res) => {

    document.querySelector(".city h2").innerText = res.city.name;
    document.querySelector("img").src = "https://countryflagsapi.com/svg/"  + res.city.country
    document.querySelector(".city .sunrise").innerText = timeConverter( res.city.sunrise);
    document.querySelector(".city .sunset").innerText = timeConverter( res.city.sunset);
    
 
    list = res.list
    changeCubeInfo(0)
})
}
// const makeWeatherCube = params => {
//     //console.log(params)
//     const cube = document.createElement ('div')
//     cube.className = 'cube'
//     cube.innerText = ' siemanko'
//     //połączenie JS z HTML -DOM
//     document.querySelector('.content').append(cube)
//     const dt_txt = document.createElement('div')
//     dt_txt.innerText = params.dt_txt;
//     cube.append(dt_txt)
//}

const changeCubeInfo = index=>{
    console.log(('list', list))
    console.log('index', index)
    document.querySelector(".cube p").innerText = list[index].weather[0].description;
    document.querySelector('.cube h3 span').innerHTML = list[index].dt_txt;
    document.querySelector('.cube h3 img').src = 
    `https://openweathermap.org/img/wn/${list[index].weather[0].icon}.png`;
    
    document.querySelector(" .weatherMain h3").innerHTML = list[index].main.feels_like + "°C"
    document.querySelector(" .minMax .min").innerText = list[index].main.temp_min + "°C"
    document.querySelector(" .minMax .max").innerText = list[index].main.temp_max + "°C"
}

const getLatLonDependOfName = ()  => {
    const value = document.querySelector('#location').value
    // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=6f8c4e83638c34920aa20a82b6705814`)
    
    fetch(`https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/location/${value.toLowerCase()}`)
    .then(res =>res.json())
    .then(res =>{
     
    getWeatherInfo  (res[0].lat, res[0].lon)   


    })
}

getLatLonDependOfName()

document.addEventListener("keydown", e=> {
    if(e.key == "Enter") {
        getLatLonDependOfName()
    }

})