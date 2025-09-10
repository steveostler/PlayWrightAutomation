const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../utils/APIUtils");
const loginPayLoad = {
  userEmail: "otis@example.com",
  userPassword: "Learning1@",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

//create order is success
test("@API Place the order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //intercepting response - API response->{playwright fake response}-> browswer-> data on front end
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
    }
  );

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );

  console.log(await page.locator(".mt-4").textContent());
});

//Verify if order created is showing in history page
// Precondition - create order -
