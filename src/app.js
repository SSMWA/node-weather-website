const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//Construct directry location for express config
const publicDirectory = path.join(__dirname,'../public')
const viewDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')


//set up handlebars and view directory location
app.set('view engine','hbs')
app.set('views',viewDirectory)
hbs.registerPartials(partialsDirectory)

// Setup statit directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Waseem Ahmad'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Waseem Ahmad'

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message: 'I am here to help you',
        name: 'Waseem Ahmad'

    })
})

app.get('/weather',(req,res)=>{
if (!req.query.address){
  return res.send({
        error:'Address should Provided'
})
}
const city = req.query.address
geocode(city,(error,{location,latitude,longitude} = {} )=>{
    if(error){
        return res.send({
        error:error
    })}
    
    console.log('location: ',location)
    forecast(latitude,longitude,(error,weather)=>{
        if(error){
            return res.send({
            error:error
        })}
        console.log('Weather Forecast: ',weather) 
        res.send({
            location: location,
            forecast: weather
        })
    
    })  
})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name: 'Waseem Ahmad',
        title: '404',
        error:'Help article not found'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        name: 'Waseem Ahmad',
        title: '404',
        error: 'Page Not Found'
})

})


app.listen(port,()=>{
    console.log('Server is up on port' + port)
})


