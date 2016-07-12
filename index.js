#! /usr/bin/env node

/*jshint esversion: 6 */
/*jshint node: true */
/*jslint node: true */
'use strict';

//dependencies
const request = require('request');
const cheerio = require('cheerio');
const moment  = require('moment');

const url = 'http://cmmcd.com/PokemonGo/';
let lastValue = null;

const verify = () => {
  request(url, (err, res, html) => {
    if (err) return console.log('Status server offline, hold on!')
    var $ = cheerio.load(html);
    var status = $($('.jumbotron h2 font')[0]).html();

    if (status !== lastValue) {
      console.log(`${moment().format('h:mm:ss a')} - ${status}`);
      lastValue = status;
    }
  });
};

console.log('Pokemon GO - Server Status');
verify();
setInterval(verify, 20 * 1000);
