const express = require('express');
const bodyParser  = require('body-parser');
const https = require('https');
const app = express();
const date  = require(__dirname+"/date.js");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.render('weather');
});

app.post("/",function(req,res){
  const Day  = date.getDate();
  const query = req.body.city;
  const queryst = req.body.state;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+","+queryst+"&appid="+process.env.API_KEY+"&units="+units;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdesc = weatherdata.weather[0].description;
      const condition = weatherdata.weather[0].main;
      const humid = weatherdata.main.humidity;
      const windspeed = weatherdata.wind.speed;
      const clouds = weatherdata.clouds.all;
      const imageUrl = "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png" ;
      res.render('searchRes',{weatherdesc: weatherdesc,
        Day: Day,
        query: query,
         temp: temp,
         condition: condition,
          humid: humid,
           windspeed:windspeed,
           clouds: clouds,
            imageUrl: imageUrl})
    });
  });
})


app.listen(3000, function(){
  console.log("Server Running On Port 3000");
});
