const puppeteer = require('puppeteer');
const fs = require('fs');

const generate = async () => {
    console.log('launching a new chrome instance')

    const browser = await puppeteer.launch({
        headless: 'new'
    });

    console.log('creating new page')
    const page = await browser.newPage();

    console.log('setting html as the pages content')
    const html = fs.readFileSync(`${__dirname}/template.html`, 'utf-8');
    await page.setContent(html, {
        waitUntil: 'domcontentloaded'
    });

    console.log('creating .pdf file')
    await page.pdf({ format: 'A4', path: `${__dirname}/pdf-template.pdf` });

    await browser.close()
}

generate();
console.log('Done!');