const express = require("express")
const https = require("https")
const app = express()
const PORT = 8080

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res)=>{
    res.status(200).render("index",{cityName:"", tem:"", discription:"",feellike:"", wind:"", humidity:"", visibility:"", airpressure:"", long:"", lat:""})
    // res.sendFile(__dirname + "/index.html") //for html
})

app.post("/", (req, res)=>{
    //setting up the api key and input city for the proper api request
    const cityInput = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&appid=d4d29e166c0e253e8201a4ee90d9c987&units=metric"
    https.get(url,(response)=>{
         response.on("data", (data)=>{
            const weatherData = JSON.parse(data)

            //all parameters:
            const temp = weatherData.main.temp
            const feels_like = weatherData.main.feels_like
            const temp_min = weatherData.main.temp_min
            const temp_max = weatherData.main.temp_max
            const air_Pressure = weatherData.main.pressure 
            const humidity = weatherData.main.humidity
            const visibility = weatherData.visibility / 1000
            const wind_Speed = weatherData.wind.speed 
            const weatherType = weatherData.weather[0].description
            const long = weatherData.coord.lon
            const lat = weatherData.coord.lat
            const sunrise = weatherData.sys.sunrise
            const sunset = weatherData.sys.sunset


            res.status(200).render("index", {cityName:cityInput, tem:temp, feellike:feels_like, wind:wind_Speed, humidity:humidity, visibility:visibility, airpressure:air_Pressure, long:long, lat:lat, discription:weatherType})
        })
    })

    
})

app.listen(PORT, ()=>{
    console.log("Server Started")
})