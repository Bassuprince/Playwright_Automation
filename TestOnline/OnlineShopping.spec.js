import { test, expect } from '@playwright/test';
import user from '../TestData/user.json';
test('Onlineshopping', async ({ browser }) => {

    const Browser = await browser.newContext()
    const page = await Browser.newPage()
 
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
   
    await page.locator('p[class="login-wrapper-footer-text"] a').click()

    //==============Mandatory Field Validations================

     const validationMessages = [
    '*First Name is required',
    '*Email is required',
    '*Phone Number is required',
    '*Password is required',
    'Confirm Password is required',
    '*Please check above checkbox'
  ];
  await page.locator('[value="Register"]').click()
   await validateMessages(page, validationMessages);

  async function validateMessages(page, messages) {

  for (const message of messages) {

    await expect(page.getByText(message)).toBeVisible();
  }

}
/*
    await page.locator('[formcontrolname="firstName"] + .invalid-feedback').tobe
    await page.locator('[formcontrolname="userEmail"] + .invalid-feedback')
    await page.locator('[formcontrolname="userMobile"] + .invalid-feedback')
    await page.locator('[formcontrolname="userPassword"] + .invalid-feedback')
    await page.locator('[formcontrolname="confirmPassword"] + .invalid-feedback')

*/

    await expect(page.getByRole('heading', { name: 'Practice Website for Rahul' })).toBeVisible();
    await expect(page.locator('app-register')).toContainText('Practice Website for Rahul Shetty Academy Students');
    await page.locator('[formcontrolname="firstName"]').fill(user.firstName);
    await page.locator('[type="lastName"]').fill(user.lastName)
    await page.locator('[type="email"]').fill(user.email)
    await page.locator('[placeholder="enter your number"]').fill(user.phone)
    await page.locator('[formcontrolname="occupation"]').selectOption(user.occupation)
    await page.locator('[value="Male"]').check()
    await page.locator('[formcontrolname="userPassword"]').fill(user.password)
    
    await page.locator('[formcontrolname="confirmPassword"]').fill(user.password)
    await page.locator('[formcontrolname="required"]').check()
    await page.locator('[value="Register"]').click()
    await page.waitForTimeout(300)
    //await expect(page.locator('app-register')).toContainText('Account Created Successfully');
    await page.locator('[class="btn btn-primary"]').click()

    
  //Loginto application
 // await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
  await page.locator('[placeholder="email@example.com"]').fill(user.email)
  await page.locator('[placeholder="enter your passsword"]').fill(user.password)
  await page.locator('[name="login"]').click()
  await expect(page.locator('[style="margin-top: -28px;"]')).toHaveText('Automation Practice')

  //
  const title = await page.locator("div.card-body h5 b").allTextContents()
  console.log(title)
  

  const ProductTitle = "iphone 13 pro"
  const products = page.locator('.card-body')
  await page.locator('div.card-body h5 b').first().waitFor();
  const counts = await products.count();
  console.log(counts)
  for(let i = 0; i < counts; ++i)
     {
    if(await products.nth(i).locator("b").textContent() === ProductTitle) 
      {
      //add product to cart
      await products.nth(i).locator("text= Add To Cart").click()
      break;
    }
  }

 
  await page.locator('[routerlink="/dashboard/cart"]').click()
  await page.locator('div.cart').waitFor();

  const bool = await page.locator('h3:has-text("iphone 13 pro")').isVisible()
  expect(bool).toBeTruthy()
  await page.locator('text=checkout').click()
  

 /*

  //selecting the item from the list add to cart
  await page.locator('[class="btn w-40 rounded"]').click()
  await page.locator('[class="btn btn-primary"]').click()
  await page.locator('button.btn.btn-custom i.fa.fa-shopping-cart').click()

  //checkout

  await page.getByRole('button', { name: 'Checkout❯' }).click();
  await expect(page.locator('section')).toContainText('Payment Method');

  */

  await page.getByRole('textbox').nth(1).fill(user.cvvNumber) //cvv number
  await expect(page.getByRole('textbox').nth(1)).toHaveValue(user.cvvNumber);
  await page.waitForTimeout(1000)
  await page.getByRole('textbox').nth(2).fill(user.NameOnCard) //name on card
  await expect(page.getByRole('textbox').nth(2)).toHaveValue(user.NameOnCard)

  await expect(page.getByRole('textbox', { name: 'Select Country' })).toBeEmpty();
  await page.waitForLoadState('networkidle');

  await page.locator('div.payment__shipping').waitFor();

  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 350 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  //await page.locator('button span.ng-star-inserted').nth(1).click();
  await page.locator('[class="btnn action__submit ng-star-inserted"]').click( )
  await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.',{ timeout: 5000 });

  //await page.locator('.hero-primary').waitFor();
  const OrderId = await page.locator('label.ng-star-inserted').textContent()
  console.log(OrderId)
  await page.locator('nav ul').waitFor();
  expect(page.locator('button.btn-custom .fa-handshake-o')).toBeVisible();
  await page.locator('button.btn-custom .fa-handshake-o').click()


//const row = await page.locator('.thead-dark')
await page.locator('tbody').waitFor();
const rows = await page.locator('tbody tr')

for(let i=0;i<await rows.count();++i)
{
  const ID = await rows.nth(i).locator('th').textContent();
  if(OrderId.includes(ID))
  {
    await rows.nth(i).locator('button').first().click();
    break;
  }
}

await page.locator('div p.tagline').waitFor();
//await page.locator('div .col-text').toHaveText(ID)
  await page.locator('[class="fa fa-sign-out"]').click()

})



//