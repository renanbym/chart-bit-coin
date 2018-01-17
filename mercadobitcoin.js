const request = require('request');
const moment = require('moment');

function MercadoBitcoin(){
    var allalldates = []
    var dataValues = []
}

function doRequest(url, callback) {
    request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            callback(false, body);
        } else {
            callback(error, false);
        }
    });
}


MercadoBitcoin.prototype.summaryRange = ( params ) => {


    console.log(MercadoBitcoin.allalldates);

    let date1 = moment(params.dt_ini);
    let date2 = moment(params.dt_end);

    console.log(date1.format('YYYY-MM-DD'))

    return new Promise( (resolve, reject) => {

        doRequest('https://www.mercadobitcoin.net/api/BTC/day-summary/'+date1.format('YYYY/MM/DD')+'/', (err, body) => {
            if(err) reject(err)
            this.alldates.push(date1.format('YYYY-MM-DD'))
            this.dataValues.push(JSON.parse(body).closing)
            date1.add(1, 'd')

            if( date1 != date2 ){
                summaryRange({ dt_ini: date1.format('YYYY/MM/DD'), dt_end: date2.format('YYYY/MM/DD') })
            }else{
                resolve({ x: alldates, y: dataValues })
            }
        })

    })

}

module.exports = new MercadoBitcoin()
