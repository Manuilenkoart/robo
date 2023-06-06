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
const parse_1 = require("./parse");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const checkHeadersMiddleware_1 = __importDefault(require("./checkHeadersMiddleware"));
dotenv_1.default.config();
const port = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(checkHeadersMiddleware_1.default);
app.get('/', (req, res) => {
    res.status(200).send('ok');
});
app.get('/parse-jar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jar = yield (0, parse_1.parseWebsite)();
        res.status(200).json(jar);
    }
    catch (e) {
        console.log('parseWebsite err', e);
    }
}));
app.listen(port, () => console.log(`Server listen: ${port}`));
