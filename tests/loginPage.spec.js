const { test, expect } = require('@playwright/test');

test('Login Page Title Test', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Get the page title
    const pageTitle = await page.title();
    
    // Assert that the title matches the expected value
    expect(pageTitle).toBe('LoginPage Practise | Rahul Shetty Academy');
});
