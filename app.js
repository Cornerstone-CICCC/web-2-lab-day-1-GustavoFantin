const searchBtn = document.querySelector('.searchBtn')
const city_naming = document.querySelector('.naming')
const actualTemp = document.querySelector('.temperature')
const cityInput = document.querySelector('.cityInput')
const countryInfo = document.querySelector('.txtCountry')
const tZoneInfo = document.querySelector('.txtTZone')
const popInfo = document.querySelector('.txtPop')
const LowMax = document.querySelector('.txtLowMax')


const getCity = async (city) => {
    const res = await fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${city.value}&count=1&language=en&format=json`)
    const data = await res.json() 
    return data.results[0] 
   
}



const getWeather = async ( latitude, longitude) => {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
    const data = await res.json()

    return data

  }
  
const buildHtml = async () => {
    const cityData = await getCity(cityInput)
    const weatherData = await getWeather(cityData.latitude, cityData.longitude)
    const city_name = cityData.name
    const country_name = cityData.country
    const pop = cityData.population
    const tZone = cityData.timezone

    
    const temp = `${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}`
    const minTemp = `${weatherData.daily.temperature_2m_min} ${weatherData.daily_units.temperature_2m_min}`
    const maxTemp = `${weatherData.daily.temperature_2m_max} ${weatherData.daily_units.temperature_2m_max}`
    
    displayTable(city_name, country_name, pop, tZone, temp, minTemp, maxTemp)  
    
    //dia ou noite passado dentro do displayTable
    
    if (weatherData.current.is_day == 1) { 
      document.body.classList.add('isDay')
      document.body.classList.remove('isNight')

    } else {
      document.body.classList.add('isNight')
      document.body.classList.remove('isDay')
    }



    // console.log(temp)

}

function displayTable(city_name, country_name, pop, tZone, temp, minTemp, maxTemp) {
    const myTable = document.querySelector('.tableInfo')
    myTable.innerHTML = `
     <div class="head">
       <h1 class="cityHead">${city_name} ${temp}</h1>
       </div>
       
     <table>
       <tbody>
         <tr>
           <th><strong>Country</strong></th>
           <td class="txtCountry">${country_name}</td>
         </tr>
         <tr>
           <th><strong>Timezone</strong></th>
           <td class="txtTZone">${tZone}</td>
         </tr>
         <tr>
           <th>Population</th>
           <td class="txtPop">${pop}</td>
         </tr>
         <tr>
           <th><strong>Tomorrow's Forecast</strong></th>
           <td class="forecast">
            ${minTemp}
            ${maxTemp}
           </td>
         </tr>
       </tbody>
     </table>
    `

}

searchBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    // get city value and pass to buildHtml function
    
    buildHtml()
    
})

