// @ts-check
const {test, expect} = require('@playwright/test');
import {ai} from "@zerostep/playwright";

test('AI test capability', async({page}) => {
    const aiArgs = {page,test}
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const discountPrice = await ai("What is the Discount price of Tomato",aiArgs);
    expect(discountPrice).toEqual("26");
    const price = await ai("What is the Price of Tomato",aiArgs); 
    expect(price).toEqual("37");
    const diff =await ai("What is the value difference between Price and Discount price of Tomato",aiArgs);
    expect(diff).toEqual("11");

    await page.goto("https://rahulshettyacademy.com/dropdownsPractise/"); 
    const blinkingText = await ai("Get blinkingText in the page",aiArgs);
    expect(blinkingText).toEqual("London QA Meetup @Rahul Shetty - Limited Seats! Book Now!");
    const firstValue  = await ai("Split ${blinkingText} by '-' and give 0th index value",aiArgs);
    expect(firstValue).toEqual("London QA Meetup @Rahul Shetty");
    console.log(firstValue);


   
});