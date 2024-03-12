/*
  Aguarda requests e clona site (versão final)
*/
import puppeteer from 'puppeteer';
import { writeFile, mkdir } from 'fs';
import { join, dirname } from 'path';
import { URL } from 'url';

const downloadResource = async (page, resourceType, resourceFolder) => {
  page.on('response', async (response) => {
    const url = new URL(response.url());
    let filePath = join(resourceFolder, url.pathname);
    if (filePath.endsWith('/')) {
      filePath += 'index.html';
    }

    const responseBuffer = await response.buffer();
    mkdir(dirname(filePath), { recursive: true }, (err) => {
      if (err) throw err;
      writeFile(filePath, responseBuffer, () => {});
    });
  });
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const baseDir = join(process.cwd(), 'downloaded_site');
  const resourceFolder = join(baseDir, 'resources');

  await downloadResource(page, ['stylesheet', 'script', 'image'], resourceFolder);

  await page.goto('https://example.com.br/example', {
    waitUntil: 'networkidle0', // Espera até que a rede esteja ociosa
  });

  const content = await page.content();

  writeFile(join(baseDir, 'index.html'), content, (err) => {
    if (err) throw err;
  });

  await browser.close();
})();
