const puppeteer = require('puppeteer')
const fs = require('fs')
const scrapeURL = process.argv[2];

async function scrape (url) {
const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
 
    let allHTML = await page.evaluate(() => {
        let textHTML = document.querySelectorAll('h3');
        let htmlArr = [];
        htmlArr = {
            text: textHTML.innerText.trim()
        };
        return htmlArr;
      })
      fs.writeFile("./allHTML.json", JSON.stringify(allHTML, null, 3),  (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Great Success");
    });
   
browser.close()

}

async function scrapeLinkAndImage (url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
    
    let linksAndImages = await page.evaluate(() => {
        let links = document.querySelectorAll('a');
        let images = document.querySelectorAll('img, .i hasimage image100 noborder');
        let content = [];
        for (let i = 0; i < links.length; i++) {
            content[i] = {
            URL: links[i].innerText.trim(),
            IMG: images[i].innerText.trim()
            };
        }
        return content;
        })
        console.log(linksAndImages);
        browser.close();
}

async function scrapeGameList (url) {
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

async function scrapeBrokers (url) {
const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
    
    let brokers = await page.evaluate(() => {
        let firmName = document.querySelectorAll('div.brokers__item--company,span');
        let contactName = document.querySelectorAll('div.brokers__item');
        let emailAddress = document.querySelectorAll('a.brokers__item--link, div.brokers__profile--leftPhone,a');

        let brokersInfo = [];
        for (let i = 0; i < firmName.length; i++) {
            brokersInfo[i] = {
            Name: firmName[i].innerText.trim(),
            //ContactName: contactName[i].innerText.trim(),
            //Email: emailAddress[i].innerText.trim()
            };
        }
        return brokersInfo;
        })
        console.log(brokers);
browser.close()

}

// to pass a link
scrape("https://www.digitaltrends.com/movies/best-movies-on-netflix/")
//scrape(scrapeURL)

// for link and image
//scrapeLinkAndImage("https://www.thetoptens.com/movies/best-anime-movies/")

// for broker
//scrapeBrokers("https://www.ibba.org/state/hawaii/")

// for game list
//scrapeGameList("https://www.igdb.com/games/tyrants-blessing")

