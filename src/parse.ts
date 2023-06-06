import puppeteer from 'puppeteer';
import { Jar } from "./interface";

async function parseWebsite(): Promise<Jar | undefined> {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`https://send.monobank.ua/jar/${process.env.JAR_URL_ID}`);

    const textSelector = await page.waitForSelector('.jar-stats');
    const scrapedJar = await textSelector?.evaluate(el => el.textContent);
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
