const { prefix } = require('../config.json');
const url = 'https://www.nasdaq.com/symbol/fizz/real-time';

const puppeteer = require('puppeteer');
const $ = require('cheerio');

var fs = require('fs');
var imgPath = './commands/commandmedia/ventrue/';

var stockData = [];

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    $('tbody > tr > td > span', html).each(function() {
      stockData.push($(this).text());
    });
  })
  .catch(function(err) {
    console.log(error);
	return;
  });

module.exports = {
	name: 'ventrue',
	description: 'joaks',
	execute(message, args) {
		var imgList = [];
		
		fs.readdirSync(imgPath).forEach(file => {
			imgList.push(file);
		});
		
		var randImg = Math.floor(Math.random() * imgList.length); 
		
		message.channel.send(`**FIZZ ${stockData[4]} @ ${stockData[0]} ${stockData[2]} ${stockData[1]} (${stockData[3]})**`, {files: [imgPath + imgList[randImg]]});
	},
};