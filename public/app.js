selector = (idName) => {
   return document.getElementById(idName)
}

const condition = selector('condition')
const mainImg = selector('mainImg')
const city = selector('city')
const country = selector('country')
const main = selector('main')
const description = selector('description')
const temp = selector('temp')
const pressure = selector('pressure')
const humidity = selector('humidity')
const cityInput = selector('city-input')
const history = selector('history')
const masterHistory = selector('master-history')

const API_KEY = '183025b690b03fe84c02d7a75e106222'
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`
const ICON_URL = `https://openweathermap.org/img/wn/`
const DEFAULT_CITY = `kushtia,bd`

window.onload = (event) => {
   navigator.geolocation.getCurrentPosition((success) => {
      return getCurrentLocation(null, success.coords)
   }, (error) => {
      return getCurrentLocation()
   })

   axios.get('/api/history')
      .then(({
         data
      }) => {
         if (data.response.length == 0) {
            history.innerHTML = "There is no data present here."
         } else {
            updatedObject(data.response)
         }
      })
      .catch((error) => {
         console.log(error)
      })

   cityInput.addEventListener('keypress', (event) => {
      if (event.key == 'Enter') {
         if (event.target.value) {
            getCurrentLocation(event.target.value)
            event.target.value = ' '
         } else {
            alert('Please enter your city name')
         }
      }
   })

}




getCurrentLocation = (city = DEFAULT_CITY, coords) => {
   let url = BASE_URL
   if (city == null) {
      url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`
   } else {
      url = `${url}&q=${city}`
   }
   axios.get(url)
      .then(({
         data
      } = response) => {
         let weather = {
            icon: data.weather[0].icon,
            name: data.name,
            country: data.sys.country,
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity
         }

         mapToTheDom(weather)
         axios.post('/api/history', weather)
            .then(({
               data
            }) => {
               //updatedObject(data)
               console.log(data)
            })
            .catch((error) => {
               console.log(error)
               alert('Error Occurred')
            })

      })
      .catch((error) => {
         alert(`${city} is not found`)
      })
}

mapToTheDom = (weather) => {
   mainImg.src = `${ICON_URL}${weather.icon}.png`
   condition.src = `${ICON_URL}${weather.icon}.png`
   city.innerHTML = weather.name
   country.innerHTML = weather.country
   main.innerHTML = weather.main
   description.innerHTML = weather.description
   temp.innerHTML = weather.temp
   pressure.innerHTML = weather.pressure
   humidity.innerHTML = weather.humidity
}

classSelector = (className) => {
   return document.getElementsByClassName(className)[0]
}
updatedObject = (weather) => {
   console.log(weather)
   history.innerHTML = ' '
   weather = weather.reverse()
   weather.forEach(h => {

      let tempHistory = masterHistory.cloneNode(true)
      tempHistory.id = ' '
      tempHistory.getElementsByClassName('condition')[0].src = `${ICON_URL}${h.icon}.png`
      tempHistory.getElementsByClassName('city')[0].innerHTML = h.name
      tempHistory.getElementsByClassName('country')[0].innerHTML = h.country
      tempHistory.getElementsByClassName('main')[0].innerHTML = h.main
      tempHistory.getElementsByClassName('description')[0].innerHTML = h.description
      tempHistory.getElementsByClassName('temp')[0].innerHTML = h.temp
      tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure
      tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity

      history.appendChild(tempHistory)
   })

}