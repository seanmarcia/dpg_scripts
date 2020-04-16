const fs = require('fs');
const glob = require('glob');
const path = require('path');
const btoa = require('btoa');
const fetch = require("node-fetch");
const retry = require('async-retry');
const cheerio = require("cheerio");

require('dotenv').config()


npath = '../publicgoods-candidates/nominees';
dpath = './src';

var candidates = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchGithubActivity(link, item){
  let page = 1;
  let $, list=[];
  console.log('Fetching '+link+' -> searching for '+item);
  while(page == 1 || (!list.length && page < 20)){

    try {
      data = await retry(async bail => {

        const data = await fetch(link+'?tab=repositories&page='+page, {
          method: 'GET',
          credentials: 'same-origin',
          redirect: 'follow',
          agent: null,
          headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Basic ' + btoa(process.env.CLIENTID+':'+process.env.CLIENTSECRET),
          }
        });

        console.log(data.status);
        if(data.status == 404){
          console.log('Page not found for '+link+'. Aborting search for '+item);
          bail()
        } else if (data.status == 429) {
          throw 'Rate limit hit. Retrying...';
        }

        return data;
      }, {
        retries: 5,
        minTimeout: 5000
      });
    } catch(e) {
      break;
    }

    $ = cheerio.load(await data.text());
    list = $("div.repo-list")
    if(list.length) { // it is an organization, else it is a user
      list = list.find('a.d-inline-block:contains("'+item+'")').filter(
        function(){return $(this).text().trim() === item;}).parent().parent().next();
    } else {
      list = $("#user-repositories-list").find('a:contains("'+item+'")').filter(
        function(){return $(this).text().trim() === item;}).parent().parent().parent().next();
    }
    if(list.length){
      let poll = list.find('poll-include-fragment').attr('src');
      if(poll){
        try {
          data = await retry(async bail => {
            const data = await fetch(`https://github.com/`+poll);
            return data;
          }, {
            retries: 5,
            minTimeout: 5000
          });
        } catch {
          break;
        }
        $ = cheerio.load(await data.text());
        list = $('body')
      }
    }
    page+=1;
        
  }
  let output;
  if(list.length) {
    console.log('Activity chart found.');
    output = list.html();
    // console.log(list.html())
    // console.log("\n\n")
  } else {
    output = '&nbsp;'
    console.log('Activity chart NOT found ! ! ! ! !')
  }
  return output;
}

glob(path.join(npath, '/*.json'), {}, async (err, files) => {
  console.log(files);
  for (var i=0; i<files.length; i++) {
    let n = JSON.parse(fs.readFileSync(files[i], 'utf8'));

    let html = '';
    if(n.hasOwnProperty('repositoryURL')){
      var matchGithub = n.repositoryURL.match(/https:\/\/github.com\/(.*)\/(.*)/);
      if(matchGithub){
        html += await fetchGithubActivity('https://github.com/'+matchGithub[1], matchGithub[2]);
      }
    }
    n['githubActivity'] = html;
    candidates.push(n);
  }

  fs.writeFileSync(
    path.join(dpath, './nominees.json'),
    JSON.stringify(candidates, 2),
    "utf8",
    function(err) {
      if (err) {
        console.log(
          "An error occured while writing JSON Object to file: " + fnames[e]
        );
        return console.log(err);
      }
    });
})