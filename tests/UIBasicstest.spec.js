const {test, expect} = require('@playwright/test');


test('Browser Context  Playwright test', async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title = await page.title();
    console.log(title);
    // assertion
    expect(title).toBe("LoginPage Practise | Rahul Shetty Academy");
    // close the context
} );

test('Page Playwright test', async ({page})=>
    {
        await page.goto("https://google.com");
        // get title - assertion
        const title = await page.title();
        console.log(title);
        // assertion
        expect(title).toBe("Google");

    } );