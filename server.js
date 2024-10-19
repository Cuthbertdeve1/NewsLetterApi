const { log } = require("console");
const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
   res.sendFile(__dirname + "/app.html");

})
app.post('/',(req,res)=>{
   console.log('post received');
  const city = req.body.cityInput;
  console.log(city);

  let appId = '4f7bbde086585ff6bb5f5bbcc2f323fe';
       const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid='+appId+'&units=metric';


https.get(url,response =>{
console.log(response.statusCode);
response.on('data', data=>{
    const weatherData = JSON.parse(data);
    console.log(weatherData);

    const temp = weatherData.main.temp;
    const tempday = weatherData.temp;
    const descrption = weatherData.weather[0].description;
    const presure = weatherData.main.pressure;
    const humidity = weatherData.main.humidity;
    const icon  = weatherData.weather[0].icon;
    const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
    res.write("<h1> Today weather in "+ city +" is as follows temperature is "+ temp +" degrees Celcious</h1>");
    res.write("<h2>weather description is "+ descrption +"</h2>");
    res.write("<h2>weather tempday is "+ tempday +"</h2>");
    res.write("<h2>weather pressure is "+ presure +"</h2>");
    res.write("<h2>weather humidity is "+ humidity +"</h2>");
      res.write("<img src="+ imageUrl + " alt='hello'>");

    res.send();
})

})

})
app.listen('3000',() =>{
console.log('server running on port 3000');

})
