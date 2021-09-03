const express = require('express');
const bodyParser  = require('body-parser');
const https = require('https');
const app = express();
const date  = require(__dirname+"/date.js");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const kharif= "Rainfall is likely to be excessive this month, but the season may still end with a rain deficit, coming in below its long-performing average (LPA) of 880 mm, the India Meteorological Department (IMD) said on Wednesday, revising its pre-monsoon forecast of a normal season";
const rabi="According to forecast given by Regional Meteorological Centre, Mumbai of India Meteorological Department there is possibility of rainfall at isolated places on 29th October, 2020 and the weather may remain dry."
var cropType="";
var contentOfSeason=""
var additional=""

app.get("/",function(req,res){
  res.render('weather');
});

app.post("/",function(req,res){
  const Day  = date.getDate();
  const Time = date.getTime();
  const query = req.body.city;
  const queryst = req.body.state;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+","+queryst+"&appid="+process.env.API_KEY+"&units="+units;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      // const temp = 45;
      const weatherdesc = weatherdata.weather[0].description;
      // const weatherdesc= "Rainy";
      const condition = weatherdata.weather[0].main;
      const humid = weatherdata.main.humidity;
      const windspeed = weatherdata.wind.speed;
      const clouds = weatherdata.clouds.all;
      const imageUrl = "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png" ;
      if(weatherdesc== "Rainy"){
        additional="Tip: Try rain water harvesting";
      }
      if(temp>41){
        additional="Tip: Try drip irrigation";
      }
      res.render('searchRes',{weatherdesc: weatherdesc,
        Day: Day,
        Time: Time,
        query: query,
         temp: temp,
         condition: condition,
          humid: humid,
           windspeed:windspeed,
           clouds: clouds,
            imageUrl: imageUrl,
            cropType: cropType,
          contentOfSeason: contentOfSeason,
        additional: additional})
    });
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const d = new Date();
  // console.log("The current month is " + monthNames[d.getMonth()]);
  // console.log(d.getMonth());
  var month=d.getMonth()
  if (month==3 || month==4){
    // console.log("harvest rabi");
    cropType= "Harvest Rabi ";
    contentOfSeason=rabi;
  }else if(month==5 || month== 6){
    console.log("sow kharif");
    cropType= "Sow Kharif ";
    contentOfSeason=kharif;
  }else if(month==8){
    console.log("harvest kharif");
    cropType= "Harvest Kharif ";
    contentOfSeason=kharif;
  }else if(month==9){
    console.log("sow rabi");
    cropType="Sow rabi ";
    contentOfSeason=rabi;
  }

})


app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");


});

app.get("/reference", function(req, res){
  res.render("reference");
});

app.listen(3000, function(){
  console.log("Server Running On Port 3000");
});
