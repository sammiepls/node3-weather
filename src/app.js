const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 4200;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

// Define paths for Express Config 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory for express to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Welcome',
    name: 'Sammie'
  })
})

app.get('/help', (req, res) => {
  res.render("help", {
    title: 'Help',
    message: 'Lost? We can help',
    name: 'Sammie'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Sammie'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {longitude, latitude, location } = {}) => {
    if(error) {
      return res.send({
        error
      })
    } else {
      forecast(longitude, latitude, (error, forecastData) => {
        if(error) {
          res.send({
            error
          })
        } else {
          res.send({
            weather: forecastData,
            location,
            address: req.query.address
          })
        }
      })
    }
  })

  
})

app.get('/help/*', (req, res) => {
  res.render('404', {error: 'Help article not found'})
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products:[]
  })
})

app.get('*', (req, res) => {
  res.render('404', {error: '404 error'})
})

app.listen(port, () => {
  console.log(`Server is at ${port}`)
})