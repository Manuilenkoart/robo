"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkHeadersMiddleware(req, res, next) {
    const headersToCheck = {
        [process.env.HEADER_KEY]: process.env.HEADER_VALUE,
        // Add more headers to check if needed
    };
    const headers = req.headers;
    // перевірка на співпадіння ВСИХ полів headersToCheck
    const isHeadersValid = Object.entries(headersToCheck).every(([key, value]) => {
        return headers[key.toLowerCase()] === value;
    });
    if (!isHeadersValid) {
        return res.status(400).json({ error: 'Invalid headers' });
    }
    next();
}
exports.default = checkHeadersMiddleware;
