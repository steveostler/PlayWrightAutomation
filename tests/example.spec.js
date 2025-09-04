const {test, expect} = require('@playwright/test');

test('Example Domain has correct heading', async ({page})=>
{
    await page.goto("https://example.com");
    await expect(page).toHaveTitle("Example Domain");
    await expect(page.getByRole('heading', {level:1})).toHaveText("Example Domain");

    //follow the link and assert URL
    await page.getByRole('link', {name: 'More information...'}).click();
    await expect(page).toHaveURL("https://www.iana.org/help/example-domains");
});
  