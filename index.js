//dependencies
var fs      = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');
    shelljs = require('shelljs/global');
    moment  = require('moment');

var url = "http://cmmcd.com/PokemonGo/";
var lastValue = null;

console.log("Pokemon GO - Server Status");
func();
setInterval(func, 20 * 1000);

function func(){
    request(url, function(err, res, html){
        if(err) throw err;
        var $ = cheerio.load(html);
        var status = $($('.jumbotron h2 font')[0]).html();

        if(status !== lastValue){
            exec('say ' + status);

            console.log(moment().format('h:mm:ss a') + " - " + status);
            lastValue = status;
        }
    });
}
