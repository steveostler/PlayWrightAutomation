const {test, expect} = require('@playwright/test');


test('Browser Context  Playwright test', async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(username).toBeVisible();
    await username.fill('rahulshetty');
    await expect(password).toBeVisible();
    await password.fill('learning');

    // Click on login button
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await username.fill('rahulshettyacademy');
    await signIn.click();
    // console.log(await cardTitles.nth(0).textContent()); 
    console.log(await cardTitles.allTextContents() )

    


} );

test.only('UI Controls', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const username = page.locator('#username');
        const password = page.locator('#password');
        const signIn = page.locator('#signInBtn');
        const dropdown = page.locator('select.form-control');
        await dropdown.selectOption('consult');
        // select admin radio button
        await page.locator(".radiotextsty").last().click();
        await page.pause();
        

    } );

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
    const cardTitles = page.locator('.card-body h5');
    console.log(await cardTitles.nth(0).textContent());

} );