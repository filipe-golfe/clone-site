/*
  Clona HTML do site com timeout
*/
import puppeteer from 'puppeteer';
import { writeFile } from 'fs';
import { join } from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://example.com.br/example');

  await new Promise(resolve => setTimeout(resolve, 10000));

  const content = await page.content();
  
  const filePath = join(process.cwd(), 'paginaSalva.html');

  writeFile(filePath, content, (err) => {
    if (err) throw err;
  });

  await browser.close();
})();
