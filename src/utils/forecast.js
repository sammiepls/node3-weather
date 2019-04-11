const request = require('request')

const forecast = (latitude, longitude, cb) => {
  const url = `https://api.darksky.net/forecast/a88b4e021a5c80416f99a03a6ecaca3b/${latitude},${longitude}?units=si`


  request({url, json:true}, (error, {body}) => {
    if(error) {
      cb('Unable to connect to weather service')
    } else if(body.error) {
      cb('Unable to find location')
    } else {
      cb(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = (forecast)