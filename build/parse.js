"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWebsite = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function parseWebsite() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch({
                headless: 'new',
                args: ['--no-sandbox']
            });
            const page = yield browser.newPage();
            const jarID = process.env.JAR_URL_ID;
            console.log('jarID', jarID);
            yield page.goto(`https://send.monobank.ua/jar/${jarID}`);
            const textSelector = yield page.waitForSelector('.jar-stats');
            const scrapedJar = yield (textSelector === null || textSelector === void 0 ? void 0 : textSelector.evaluate(el => el.textContent));
            console.log('scrapedJar', scrapedJar);
            yield browser.close();
            if (!scrapedJar)
                return;
            const parts = scrapedJar.split('₴');
            const acc = parts[0].replace(/Накопичено|\s/g, '');
            const accGoal = parts[1].replace(/Ціль|\s/g, '');
            return { acc: Number(acc), accGoal: Number(accGoal) };
        }
        catch (error) {
            console.error('parse error:', error);
        }
    });
}
exports.parseWebsite = parseWebsite;
