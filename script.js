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

fetch('https://api.openweathermap.org/data/2.5/forecast?lat=50.2649&lon=19.0238&appid=6f8c4e83638c34920aa20a82b6705814&units=metric&lang=pl')
.then((res) => res.json())
.then((res) => {
    console.log(res)
    document.querySelector(".city h2").innerText = res.city.name;
    document.querySelector("img").src = "https://countryflagsapi.com/svg/"  + res.city.country
    document.querySelector(".city .sunrise").innerText = timeConverter( res.city.sunrise);
    document.querySelector(".city .sunset").innerText = timeConverter( res.city.sunset);

    makeWeatherCube(res.list[0])
})

const makeWeatherCube = (params) => {
    console.log(params)
    const cube = document.createElement ('div')
    cube.className = 'cube'
    cube.innerText = ' siemanko'
    //połączenie JS z HTML -DOM
    document.querySelector('.content').append(cube)
    const dt_txt = document.createElement('div')
    dt_txt.innerText = params.dt_txt;
    cube.append(dt_txt)
}

