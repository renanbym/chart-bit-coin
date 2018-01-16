#! /usr/bin/env node
const https = require('https')
const moment = require('moment')
const formatCurrency = require('format-currency')

https.get('https://www.mercadobitcoin.net/api/BTC/ticker/', function(res){
    let data = ''

    res.on('data', function(newData){
        data += newData
    })

    res.on('end', function(){
        var location = JSON.parse(data)

        console.log('Buy: '+ formatCurrency(location.ticker.buy, {format: '%s%v %c', code: '', symbol: 'R$'}))
        console.log('Sell: '+ formatCurrency(location.ticker.sell, {format: '%s%v %c', code: '', symbol: 'R$'}))
        console.log('Date: '+ moment.unix(location.ticker.date).format('DD/MM/YYYY H:mm:s'))
    })

})
