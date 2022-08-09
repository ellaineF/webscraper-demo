const puppeteer = require('puppeteer')
const fs = require('fs')

async function scrape (url) {
const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
 
    let games = await page.evaluate(() => {
        let gameName = document.querySelectorAll('h1.banner-title');
        let genre = document.querySelectorAll('div.gamepage-tabs,span.text-semibold,a');
        let platforms = document.querySelectorAll('p,span,a');
        let releaseDates = document.querySelectorAll('div.text-muted release-date');
        let publishers = document.querySelectorAll('a.block');

        let gameList = [];
        for (let i = 0; i < gameName.length; i++) {
          gameList[i] = {
            Name: gameName[i].innerText.trim(),
            Genre: genre[i].innerText.trim(),
            Platforms: platforms[i].innerText.trim(),
            //ReleaseDate: releaseDates[i].innerText.trim(),
            Publishers: publishers[i].innerText.trim()
          };
        }
        return gameList;
      })
      console.log(games);
browser.close()

}

scrape("https://www.igdb.com/games/tyrants-blessing")