// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

function demoFileUrl() {
  // adjust this path if your file lives elsewhere
  const p = path.resolve(__dirname,'..', 'resources', 'locators-demo.html');
  return pathToFileURL(p).href;
}

test('Locator + expect fundamentals', async ({ page }) => {
  await page.goto(demoFileUrl());
  
  // Labels & placeholders
  await page.getByLabel('Email').fill("norman@gmail.com");
  await expect(page.getByPlaceholder('you@example.com')).toHaveValue('norman@gmail.com');

  
  // Role-based button + text assertion (auto-waits)
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await expect(page.locator('#flash')).toBeVisible();
  await expect(page.locator('#flash')).toHaveText('Thanks for subscribing!');

  // Anchor by role + URL assertion
  await page.getByRole('link', { name: 'Learn more' }).click();
  await expect(page).toHaveURL(/#about$/);

  // Partial link by role
  await page.getByRole('link', { name: /More stuff/i }).click();
  await expect(page).toHaveURL(/#more-stuff$/);

   // Filter + :has() style selection to target a specific row button
  const foxRow = page.locator('#items li').filter({ hasText: 'Fox' });
  await foxRow.getByRole('button', { name: 'Add' }).click();
  await expect(page.locator('#cart-count')).toHaveText('1');

  // Count + nth/first/last demos
  const names = page.locator('#items .name');
  await expect(names).toHaveCount(3);
  await expect(names.first()).toHaveText('Cat');
  await expect(names.nth(1)).toHaveText('Fox');
  await expect(names.last()).toHaveText('Owl');
  await page.pause();

  




  
});