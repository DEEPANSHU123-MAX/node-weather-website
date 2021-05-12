const request = require('postman-request')


const forecast = (lang, lat, callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=285fc0096a0ad9729cc97a3effbef0f8&query= '+ lat + ',' + lang +'&units=f'


    request({ url, json:true} , (error , { body }) =>{
            if(error){
                callback("Unable to connect to location service", undefined)
            }else if(body.error){
                callback("Unable to find location try another one", undefined)
            }else{
                const temp =body.current.temperature
                    const feelslike =body.current.feelslike
                    
                    const result =body.current.weather_descriptions +` It is currently ${temp} degrees out.It feels like ${feelslike} out and the humidity is ` + body.current.humidity;

                    callback(undefined , result)
        
            }

        })
    }
module.exports = forecast