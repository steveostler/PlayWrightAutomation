const {test} = require('@playwright/test');


test('Browser Context  Playwright test', async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginoagePractise/");
} );

test.only('Page Playwright test', async ({page})=>
    {
        await page.goto("https://google.com");
    } );