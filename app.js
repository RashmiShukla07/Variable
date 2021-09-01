const express = require('express');
const bodyParser  = require('body-parser');
const https = require('https');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query = req.body.city;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+process.env.API_KEY+"&units="+units;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdesc = weatherdata.weather[0].description;
      const imageUrl = "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png" ;
      res.write("<p>The weather condition is currently "+weatherdesc+"</p>");
      res.write("<h1>The temprature in "+query+" is " + temp + " degree Celcius.</h1>");
      res.write("<img src= "+imageUrl+">");
      res.send()
    });
  });
})


app.listen(3000, function(){
  console.log("Server Running On Port 3000");
});
