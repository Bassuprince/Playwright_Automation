import { test, expect, request } from '@playwright/test';
let token;
test('API Login Test', async ({page}) => {


  const apiContext = await request.newContext();

  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: {
        userEmail: 'basava103@gmail.com',
        userPassword: 'Basava@123',
      },
    });
  const responseBody = await response.json();

  console.log(responseBody);
  token = responseBody.token

  expect(response.status()).toBe(200);


  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value)
  },token);

  await page.goto('https://rahulshettyacademy.com/client');
  await expect (page).toHaveURL(/client/)

});
