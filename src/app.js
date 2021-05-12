
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// define path for express config
const publicdirectory = path.join(__dirname ,'../public')



const Viewsdirectory = path.join(__dirname ,'../templates/views')
const partialspath = path.join(__dirname ,'../templates/partials')

// setup static directory to serve

app.use(express.static(publicdirectory))



// setup hadlebars engine and views Location
app.set('view engine', 'hbs')
app.set('views', Viewsdirectory)
hbs.registerPartials(partialspath)

app.get('' , (req , res)=>{
    res.render('index' ,{
        title:'Welcome page',
        name : 'Deepanshu'
    })
})


app.get('/about' , (req , res)=>{
    res.render('about' ,{
        title:'About me',
        name : 'Deepanshu'
    })
})


app.get('/help' , (req , res)=>{
    res.render('help' ,{
        example:'Example the things',
        name:'deepanshu',
        title:'Help'
       
    })
})

// '' , this place is to fill for route where, req will take request for the given route adn res will retutn the response to the user in browser.

// examples of route
// app.com , root route
// app.com/help
// app.com/about

// app.get('/about' , (req , res)=>{
//     res.send("<h1> Welcome to Express </h1>")
// })


// app.get('/help' , (req , res)=>{
//     res.send("Welcome to help section")
// })


app.get('/weather' , (req , res)=>{
    
    if(!req.query.address){
       return res.send({
            error: 'Adress is not provided'
        })
    }   
    geocode(req.query.address, (error , {latitude , longitude , location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
          forecast(longitude, latitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
      
            }
            res.send({
                forecast:forecastdata,
                longitude:longitude,
                latitude:latitude,
                location,
                address: req.query.address
            })
            })
          
      })
    
    
   
})


app.get('/help/*' , (req , res)=>{
    res.render('404', {
        title:'404',
        name:'deepanshu',
        error:'Help article not found'
    })
})


app.get('*' , (req , res)=>{
    res.render('404', {
        title:'404',
        name:'deepanshu',
        error:'page not found'
    })
})



// Now we use app.listen function  to initialize the server it takes two argument one is the port to run the server and other is callback function

app.listen(port , ()=>{
    console.log("server is successfully set up on  " + port)
})