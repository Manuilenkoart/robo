import { NextFunction, Request, Response } from "express";

function checkHeadersMiddleware  (req: Request, res: Response, next: NextFunction) {
  const headersToCheck = {
    [process.env.HEADER_KEY as string]: process.env.HEADER_VALUE as string,
    // Add more headers to check if needed
  } as const;

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

export default checkHeadersMiddleware