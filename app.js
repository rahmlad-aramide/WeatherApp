const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let port = 5000;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.post("/", (req, res) => {
  const apiKey = "c47e50f2193381706302c2b9f33a5fcc";
  const unit = "metric";
  let query = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;
      const location = weatherData.name;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      res.write(
        `<h1>Temperature in ${location} is ${temp} degree celcius</h1>`
      );
      res.write(`<h2>And the weather is ${description}</h2>`);
      res.write(`<div style="background: grey; width: 100px; height: 100px;">
                        <img src=${iconUrl} alt=${description} />
                 </div>`);
      res.send();
    });
  });
});

app.listen(`${port}`, () => {
  console.log(`App started at port ${port}`);
});
