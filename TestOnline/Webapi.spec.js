const { test, expect, request } = require('@playwright/test');
/*
const orderPayload = {
  orders: [
    {
      country: "China",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
};
*/
let token;
let apiContext;
test.beforeAll('API login test', async () => {
  apiContext = await request.newContext();
  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: {
        userEmail: 'basava103@gmail.com',
        userPassword: 'Basava@123',
      },
    }
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  token = body.token
  console.log(token);

});
test('Onlineshopping With API', async ({ page }) => {

  // Inject token into browser before page loads
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
  await page.goto('https://rahulshettyacademy.com/client');

  // Example assertion (optional)
  await expect(page).toHaveURL(/client/);

  const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data:{
        orders: [
    {
      country: "China",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
      } ,
      headers: {
        'authorization': token,
        'content-type': 'application/json'
      }
    })
  const Orderlist = await orderResponse.json()
  console.log(Orderlist)
  const OrderID = Orderlist.orders[0]

  await page.locator('nav ul').waitFor();
  expect(page.locator('button.btn-custom .fa-handshake-o')).toBeVisible();
  await page.locator('button.btn-custom .fa-handshake-o').click()

  //const row = await page.locator('.thead-dark')
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr')

  for (let i = 0; i < await rows.count(); ++i) {
    const ID = await rows.nth(i).locator('th').textContent();
    if (OrderID.includes(ID)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  await page.locator('div p.tagline').waitFor();
//await page.locator('div .col-text').toHaveText(ID)
  await page.locator('[class="fa fa-sign-out"]').click()

})


