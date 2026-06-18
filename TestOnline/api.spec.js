import { test, expect, request } from '@playwright/test';

let authToken;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: {
        userEmail: 'basava103@gmail.com',
        userPassword: 'Basava@123',
      },
    });

  const responseBody = await response.json();
  authToken = responseBody.token;

  console.log('Token:', authToken);

  
});