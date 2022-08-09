const puppeteer = require('puppeteer')

async function scrape (url) {
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

scrape("https://www.ibba.org/state/hawaii/")