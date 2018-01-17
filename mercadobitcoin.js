const request = require('request');
const moment = require('moment');



function MercadoBitcoin(){

}

function doRequest( params, callback ){

    let date1 = moment(params.dt_ini);
    let date2 = moment(params.dt_end);

    request('https://www.mercadobitcoin.net/api/BTC/day-summary/'+date1.format('YYYY/MM/DD')+'/', function (error, res, body) {
        if (!error && res.statusCode == 200) {

            params.alldates.push(date1.format('YYYY-MM-DD'))
            params.dataValues.push(JSON.parse(body).closing)

            date1.add(1, 'd')
            if( date1.format('YYYY-MM-DD') != date2.format('YYYY-MM-DD') ){
                doRequest( { dt_ini: date1, dt_end: date2, alldates: params.alldates, dataValues: params.dataValues }, callback )
            }else{
                callback(false, { x: params.alldates, y: params.dataValues });
            }

        } else {
            callback(error, false);
        }
    });
}


MercadoBitcoin.prototype.summaryRange = ( params ) => {

    let date1 = moment(params.dt_ini);
    let date2 = moment(params.dt_end);

    return new Promise( (resolve, reject) => {
        doRequest({ dt_ini: date1, dt_end: date2, alldates: [], dataValues: [] }, (err, res) =>{
            if( err ) reject(err)
            resolve( res )
        })
    })

}

module.exports = new MercadoBitcoin()
