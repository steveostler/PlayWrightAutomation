const {test, expect} = require('@playwright/test');


test.only('Browser Context  Playwright test', async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.css', route => route.abort()); // block css files
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url() + ' ' + response.status()));
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

test('UI Controls', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const username = page.locator('#username');
        const password = page.locator('#password');
        const signIn = page.locator('#signInBtn');
        const dropdown = page.locator('select.form-control');
        const documentLink = page.locator('[href*="documents-request"]');


        await dropdown.selectOption('consult');
        // select admin radio button
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click(); 
        // assert 
        console.log(await page.locator(".radiotextsty").last().isChecked()); 
        await expect (page.locator(".radiotextsty").last()).toBeChecked(); 

        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        await expect(page.locator("#terms")).not.toBeChecked();

        // check for blinkink text
        
        await expect(documentLink).toHaveAttribute('class', 'blinkingText');
        await page.pause();
        

    } );

test('Page Playwright test2', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator('#login');

    await expect(page).toHaveTitle("Let's Shop");
    await email.fill('otis@example.com');
    await password.fill('Learning1@');
    await login.click();
    const cardTitles = page.locator('.card-body h5');
    console.log(await cardTitles.nth(0).textContent());

} );

test('Child windows handling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username'); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[href*="documents-request"]');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen for any new page
        documentLink.click(), // click the link that opens a new page
    ]); 
    const text = await newPage.locator('.red').textContent(); 
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain); 

    await page.locator('#username').fill(domain); 

    console.log(await page.locator('#username').inputValue());



} );