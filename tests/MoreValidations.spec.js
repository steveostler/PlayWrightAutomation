const {test, expect} = require('@playwright/test'); 

test("Popup Validations", async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    //mouseover
    await page.locator("#mousehover").hover();
    await page.locator("text=Top").click();
    await page.pause();
    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framespage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


});

test("Screenshot & Visual comparison", async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'element.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

});
 test.only('visual', async ({ page }) => {

    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
 });