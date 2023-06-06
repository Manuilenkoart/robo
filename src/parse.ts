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
    console.log('jarID', jarID);
    await page.goto(`https://send.monobank.ua/jar/${jarID}`);

    const textSelector = await page.waitForSelector('.jar-stats');
    const scrapedJar = await textSelector?.evaluate(el => el.textContent);
    console.log('scrapedJar', scrapedJar);

    await browser.close();

    if(!scrapedJar) return;

    const parts = scrapedJar.split('₴');
    const acc = parts[0].replace(/Накопичено|\s/g, '');
    const accGoal = parts[1].replace(/Ціль|\s/g, '');

    return { acc: Number(acc), accGoal: Number(accGoal) } as Jar
  } catch (error) {
    console.error('parse error:', error);
  }
}

export { parseWebsite };
