import puppeteer from 'puppeteer';
import { Jar } from "./interface";

async function parseWebsite(): Promise<Jar | undefined> {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const jarID = process.env.JAR_URL_ID;

    await page.goto(`https://send.monobank.ua/jar/${jarID}`);

    const textSelector = await page.waitForSelector('.jar-stats');
    const scrapedJar = await textSelector?.evaluate(el => el.textContent);

    await browser.close();

    console.log({jarID, scrapedJar});

    if(!scrapedJar) return;

    const parts = scrapedJar.split('₴');
    const accumulated = parts[0].replace(/Накопичено|\s/g, '').replace(/Accumulated|\s/g, '') || '0';
    const goal = parts[1].replace(/Ціль|\s/g, '').replace(/Goal|\s/g, '') || '0';

    return { accumulated, goal } as Jar
  } catch (error) {
    console.error('parse error:', error);
  }
}

export { parseWebsite };
