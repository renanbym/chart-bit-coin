#! /usr/bin/env node
const https = require('https')
const moment = require('moment')
const formatCurrency = require('format-currency')
const program = require('commander')
const blessed = require('blessed')
const contrib = require('blessed-contrib')

program
.version('0.1.0')
.arguments('<cmd>')
.option('--dt_ini [dt_ini]', 'data inicial')
.option('--dt_end [dt_end]', 'data final')
.option('-d, --days [days]', 'dias a partir de hoje')
.option('-m, --months [months]', 'dias a partir de hoje')
.action(function (cmd) {
  cmdValue = cmd;
})
.parse(process.argv);


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

  let mercadobitcoin = require('../mercadobitcoin')

  let dt_ini = typeof program.dt_ini != 'undefined' ? program.dt_ini : moment().subtract(30, 'd').format('YYYY-MM-DD')
  let dt_end = typeof program.dt_end != 'undefined' ? program.dt_end : moment().format('YYYY-MM-DD')

  if( typeof program.days != 'undefined' ) dt_ini = moment().subtract( program.days, 'd').format('YYYY-MM-DD')
  if( typeof program.months != 'undefined' ) dt_ini = moment().subtract( program.months, 'm').format('YYYY-MM-DD')


  mercadobitcoin.summaryRange({ dt_ini: dt_ini, dt_end: dt_end })
  .then( (res) => {

    let screen = blessed.screen()

    let grid = new contrib.grid({rows: 2, cols: 2, screen: screen})

    let lineMercadoBitcoin = grid.set(0, 0, 1, 2, contrib.line, {
      style:{
        text: "yellow"
        , baseline: "black"
      }
      , xLabelPadding: 3
      , xPadding: 5
      , label: 'MercadoBitcoin'
    })

    let data = [ {
      x: res.x
      ,  y: res.y
      , showLegend: true
      , wholeNumbersOnly: false
      , xPadding: 5
      , label: 'Title'
      , baseline: "yellow"
      , style: {
        line: 'red'
      }
    }]
    lineMercadoBitcoin.setData(data)

    screen.render()

  })
  .catch( (err) => {
    console.log('error', err);
  })


}
