/*jshint esversion: 6 */
/*jshint node: true */
/*jslint node: true */
'use strict';

//dependencies
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const shelljs = require('shelljs/global');
const moment  = require('moment');

const url = 'http://cmmcd.com/PokemonGo/';
let lastValue = null;

const func = () => {
  request(url, (err, res, html) => {
    if (err) throw err;
    var $ = cheerio.load(html);
    var status = $($('.jumbotron h2 font')[0]).html();

    if (status !== lastValue) {
      console.log(`${moment().format('h:mm:ss a')} - ${status}`);
      lastValue = status;
    }
  });
};

console.log('Pokemon GO - Server Status');
func();
setInterval(func, 20 * 1000);
