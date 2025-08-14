const {test, expect} = require('@playwright/test');


test.only('Browser Context  Playwright test', async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    //navigate
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // Web-first assertion on page title
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    // Assert that username field is visible before typing
    const username = page.locator('#username');
    await expect(username).toBeVisible();

    // Type into username field
    await username.fill('rahulshettyacademy');

    // Assert that password field is visible before typing
    const password = page.locator('#password');
    await expect(password).toBeVisible();
    // Type into password field
    await password.fill('learnings');

    // Click on login button
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    


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