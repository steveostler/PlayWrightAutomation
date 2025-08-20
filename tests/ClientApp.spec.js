const {test, expect} = require('@playwright/test');

test('Page Playwright test2', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');

    await expect(page).toHaveTitle("Let's Shop");
    await email.fill('normanbconquest@gmail.com');
    await password.fill('Otispups1');
    await login.click();
    //await page.waitForLoadState('networkidle');
    // Get the titles of the cards 
    await page.locator('.card-body h5').last().waitFor();
    const cardTitles = page.locator('.card-body h5');
    console.log(await cardTitles.allTextContents());

} );