const request = require('request')
const fCurl   = 'https://api.weatherstack.com/current?access_key=78da3d1a09e858ec44e025dceb079081&query='


const forecast = (lat,long,callback) =>{
    const url = fCurl  + lat +',' + long +'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service', undefined)
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            const  weather = body.current.weather_descriptions[0] + '. it is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. '
            + ' chance of rain is ' + body.current.precip + '%. humidity is ' + body.current.humidity + '%. visibility is ' + body.current.visibility
            //     }
            callback(undefined,weather)
        }
    })
}

module.exports = forecast
