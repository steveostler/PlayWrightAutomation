const {test, expect} = require('@playwright/test');

test('Page Playwright test2', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    const email = "otis@example.com";
    const password = page.locator('#userPassword');
    const login = page.locator('#login');
    const products = page.locator('.card-body');
    const productName = 'ADIDAS ORIGINAL';

    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill(email);
    await password.fill('Learning1@');
    await login.click();
    //await page.waitForLoadState('networkidle');
    // Get the titles of the cards 
    await page.locator('.card-body h5').last().waitFor();
    const cardTitles = page.locator('.card-body h5');
    console.log(await cardTitles.allTextContents());

    const count = await products.count();
    for( let i=0; i<count; i++){
        if(await products.nth(i).locator("b").textContent() == productName)
            {
                //add to cart
                await products.nth(i).locator('text= Add To Cart').click(); 
                await page.pause();
                break;

            };
    }
    //click on cart icon
    await page.locator('[routerlink="/dashboard/cart"]').click();
    await page.locator("div li").first().waitFor(); 
    const bool = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible(); 
    
    expect(bool).toBeTruthy(); 
    // click checkout
    await page.locator('text=Checkout').click();
    // [placeholder='Select Country']
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
    const dropdown = page.locator('.ta-results'); 
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i < optionsCount; i++){
    const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    // .action__submit
    await page.locator("text=CVV Code ? >> .. >> input").fill("123");
    await page.locator("text=Name On Card >> .. >> input").fill("Steve");
    await page.locator("text=Apply Coupon >> .. >> input").fill("tesr");
    await page.locator("button[type='submit']").click();

    await page.locator("select.input.ddl").first().selectOption("01");
    await page.locator("select.input.ddl").nth(1).selectOption("16");

    await page.pause();
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   //  | 68a72cc4d2e3f0f153be2163 | 
   // label[class='ng-star-inserted']
    const orderId = await page.locator("label[class='ng-star-inserted']").textContent();
    console.log(orderId);
    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for( let i=0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
} );