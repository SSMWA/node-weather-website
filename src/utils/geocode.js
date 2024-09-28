const request = require('request');
const URL1  = 'https://api.mapbox.com/search/geocode/v6/forward?access_token=pk.eyJ1Ijoid2FzZWVtMjciLCJhIjoiY2t6a3l6bXpwNTB6MzJucGg5cWpzM2RmbSJ9.h68QQlI1r82Zr2QfuWvkjA&limit=1'

const geocode = (address,callback)=>{
    const url = URL1 + '&q={' + address + '}'
    request({url,json: true},(error,{body}) =>{
        if(error)
            {
                callback('unable to connect to location service',undefined)
        
            }else if (body.features.length === 0){
                callback('Unable to find location, Try difffernt search!',undefined)
            }else{                            
                        callback(undefined,{
                            longitude :  body.features[0].geometry.coordinates[0],
                            latitude  :  body.features[0].geometry.coordinates[1],
                            location  :  body.features[0].properties.full_address
                    })
            }
    })
}
module.exports = geocode