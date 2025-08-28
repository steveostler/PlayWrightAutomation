// @ts-check
const {test, expect} = require('@playwright/test');
import {ai} from "@zerostep/playwright";

test('AI test capability', async({page}) => {
    const aiArgs = {page,test}
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const text = await ai("What is the Discount price of Tomato",aiArgs);
    expect(text).toEqual("28")


   
});