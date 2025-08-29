const {test,expect} = require("@playwright/test");

test("Calendar validations",async ({page}) => {
    const monthNumber ="6";
    const date ="15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];


    // .react-date-picker__inputGroup
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    // .react-calendar__navigation__label
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    // react-calendar__year-view__months__month
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    // //abbr[text()=15]
    await page.locator("//abbr[text()='"+date+"']").click();

    // .react-date-picker__inputGroup input
    const inputs =  page.locator('.react-date-picker__inputGroup__input')

    for(let i=0; i<expectedList.length; i++){
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

    await page.pause();

});