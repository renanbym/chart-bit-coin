#! /usr/bin/env node
const https = require('https')
const moment = require('moment')
const formatCurrency = require('format-currency')
const program = require('commander')
const blessed = require('blessed')
const contrib = require('blessed-contrib')

// 
// const mercadobitcoin = require('../mercadobitcoin')
//
// mercadobitcoin.summaryRange({ dt_ini: '2017-01-01', dt_end: '2017-01-03' })
// .then( (res) => {
//   console.log(res);
// })
// .catch( (err) => {
//   console.log(err);
// })
//
// program
// .version('0.1.0')
// .arguments('<cmd>')
// .action(function (cmd) {
//   cmdValue = cmd;
// })
// .parse(process.argv);


if (typeof cmdValue === 'undefined') {

  https.get('https://www.mercadobitcoin.net/api/BTC/ticker/', (res) => {
    let data = ''

    res.on('data', (newData) => {
      data += newData
    })

    res.on('end', () => {
      let location = JSON.parse(data)
      console.log('Buy: '+ formatCurrency(location.ticker.buy, {format: '%s%v %c', code: '', symbol: 'R$'}))
      console.log('Sell: '+ formatCurrency(location.ticker.sell, {format: '%s%v %c', code: '', symbol: 'R$'}))
      console.log('Date: '+ moment.unix(location.ticker.date).format('DD/MM/YYYY H:mm:s'))
    })

  })

}

if(typeof cmdValue !== 'undefined' && cmdValue === "chart" ){
  // let screen = blessed.screen()
  // let line = contrib.line({})
  //
  // let data = [ {
  //   x: ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04'],
  //   y: [0, 0.0695652173913043, 0.11304347826087, 2],
  //   style: {
  //     line: 'red'
  //   }
  // }]
  //
  // screen.append(line)
  // line.setData(data)
  //
  // screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  //   return process.exit(0);
  // })
  //
  // screen.render()
}
