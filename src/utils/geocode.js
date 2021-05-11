const request = require('postman-request')


const geocode = (address , callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/ '+ address +'.json?access_token=pk.eyJ1IjoiZGVlcGFuc2h1MTIzIiwiYSI6ImNrb2R2eHMydTA2ODQydm80amFxNXo4YjgifQ.6UKCZeO7neg0j-0IzCM7Tg&limit=1'

    request({ url, json:true} , (error , { body }) =>{
            if(error){
                callback("Unable to connect to location service", undefined)
            }else if(body.features.length ===0){
                callback("Unable to find location try another one", undefined)
            }else{
                const latitude =body.features[0].center[0]
        
             const longitude =body.features[0].center[1]
             const location = body.features[0].place_name
        
            callback(undefined,{
                latitude,
                longitude,
                location
            })
        
            }

        })
    }
module.exports = geocode

//
