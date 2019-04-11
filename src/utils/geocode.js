const request = require('request')

const token = "pk.eyJ1Ijoic2FtbWllcGxzIiwiYSI6ImNqdGNtYmdhZDBqNXM0NW11MGd0NzA4bmoifQ.OoGWwwg7gF-k5Hw7kkYIYg";
const geocode = (address, cb) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`

  request({url: geocodeURL, json: true}, (error, {body}) => {
    if (error) {
      cb('Unable to connect to location services')
    } else if(body.features.length === 0) {
      cb('Unable to find location')
    } else {
      cb(undefined, {
         latitude: body.features[0].center[1],
         longitude: body.features[0].center[0],
         location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode