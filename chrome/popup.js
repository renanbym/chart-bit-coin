document.addEventListener('DOMContentLoaded', function() {

  var updatePageButton = document.getElementById('updatePage');
  updatePageButton.addEventListener('click', init);
  init();


});

function init(){
  loadMercado( function(err, res ) {
    if( err ) alert(err);
    document.getElementsByTagName('h1')[0].innerHTML =  "R$ "+new Number(res.ticker.sell).toFixed(3);
    document.getElementsByTagName('h2')[0].innerHTML =  "R$ "+new Number(res.ticker.buy).toFixed(3);
    document.getElementsByTagName('p')[0].innerHTML = timeConverter(res.ticker.date);
  })
}


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function loadMercado( callback ) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {

        var j = JSON.parse( xmlhttp.responseText );

        callback( false, j );
      }
      else if (xmlhttp.status == 400) {
        callback( 'There was an error 400', false );
      }
      else {
        callback( 'something else other than 200 was returned', false );
      }
    }
  };

  xmlhttp.open("GET", "https://www.mercadobitcoin.net/api/BTC/ticker/", true);
  xmlhttp.send();
}
