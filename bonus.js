const puppeteer = require('puppeteer')
const scrapeURL = process.argv[2]

async function scrape (url) {
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
   
//scrape("https://www.thetoptens.com/movies/best-anime-movies/")
scrape(scrapeURL)
