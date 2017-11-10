//
const express = require('express');
const request = require('request');
const http = require('http');
const plotly = require('plotly')('renanbym', 'TvbkRDOHlIAR0qQc1dnI');

let alldates = []
let dataValues = []
let date1 = new Date("Nov 01, 2017 00:00:00");
let date2 = new Date('Nov 10, 2017 00:00:00');
console.log(date2.getFullYear()+'-'+date2.getMonth()+'-'+date2.getDate());

const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');
app.set('views', './');




app.get('/', (req, res) => {


  do {

    alldates.push(date1.getFullYear()+'-'+date1.getMonth()+'-'+date1.getDate());
    date1.setDate( date1.getDate() +1 );
    request('https://www.mercadobitcoin.net/api/BTC/day-summary/'+date1.getFullYear()+'/'+date1.getMonth()+'/'+date1.getDate()+'/',  (err, r, body) => {

      if( err ) console.log('error:', error);
      dataValues.push(JSON.parse(body).closing)

      if( dataValues.length >=  alldates.length){
        console.log(alldates);
        let data = [{
          x: alldates,
          y: dataValues,
          type: "scatter"
        }];
        let graphOptions = {filename: "date-axes", fileopt: "overwrite"};

        plotly.plot(data, graphOptions,  (err, msg) => {
          res.render('index.ejs',{
            chart: msg.url
          });
        });
      }
    });

  } while ( date1 <= date2 )



})


server.listen( 3001 )
.on('listening', () => {
  console.log('run, forest!')
})
