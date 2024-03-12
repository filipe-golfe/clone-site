/*
  Clona site sem timeout
*/
import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';

await scrape({
  urls: ['https://example.com.br/example'],
  directory: 'D:\\PROJETOS\\apps\\copy-site\\copied-site', // diretório D:\\PROJETOS\\apps\\copy-site deve existir, já a pasta copied-site não
  plugins: [
    new PuppeteerPlugin({
      launchOptions: { headless: false },
      scrollToBottom: { timeout: 10000, viewportN: 10 },
      blockNavigation: true,
    })
  ]
});