const faker = require('faker');
const puppeteer = require('puppeteer');

describe('End To End tests', () => {
  test('end to end passes', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 900,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#btnAddNew');
    await page.waitFor(5000);

    // TBD: read page and list of contacts loaded
    //.......................

    // simulate add new button click
    await page.click('#btnAddNew');
    console.log("clicked add new button");


    // **** here it goes to add user view but renders it empty ! ***
    await page.waitForSelector("#txtFirstName");
    console.log("in add user page now");
    await page.waitFor(5000);

    // fake user

    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      description: faker.random.words()
    };

    // TBD: test!
    //.............

    console.log("done");
    browser.close();
  }, 30000);
});