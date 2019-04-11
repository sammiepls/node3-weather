const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const output = document.querySelector("output")
const locationHeading = output.querySelector('h3')
const weatherText = output.querySelector('p')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value 

  locationHeading.textContent = "Loading..."
  weatherText.textContent = "Getting weather data..."

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then(data =>  { 
      if(data.error) {
        locationHeading.innerText = "Error"
        weatherText.innerText = data.error
      } else {
        populateOutput(data)
      }
    })
  })
})

function populateOutput(data) {
  locationHeading.innerText = data.location
  weatherText.innerText = data.weather
}