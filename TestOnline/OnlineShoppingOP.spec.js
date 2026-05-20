import { userRegisterOp } from '../Page/userRegisterOP';
import { LoginOP } from '../Page/LoginOP';
import { Selectproduct } from '../Page/SelectproductOP';
import { Cartandcheckout } from '../Page/CartandcheckoutOP';
import { OrderOP } from '../Page/OrderOP';

import { test, expect } from '@playwright/test';
import user from '../TestData/user.json';
test('Onlineshopping', async ({ browser }) => {

    const Browser = await browser.newContext()
    const page = await Browser.newPage()

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')

    await page.locator('p[class="login-wrapper-footer-text"] a').click()

    await expect(page.getByRole('heading', { name: 'Practice Website for Rahul' })).toBeVisible();
    await expect(page.locator('app-register')).toContainText('Practice Website for Rahul Shetty Academy Students');
    const Registrationpage = new userRegisterOp(page)
    await Registrationpage.RegisterPgae(user.firstName, user.lastName, user.Email, user.phone, user.occupation, user.password)
    //await page.waitForTimeout(300)
    

    //Loginto application
    const Loginpage = new LoginOP(page)
    await Loginpage.Login_page(user.Email,user.password)
   // await expect(page.locator('[style="margin-top: -28px;"]')).toHaveText('Automation Practice')

    //select product add to cart 
    const selectproduct = new Selectproduct(page)
    await selectproduct.selectproducts(user.ProductName)
    //click cart
    const cart_checkout = new Cartandcheckout(page)

    await cart_checkout.cartpage()
 
    //const bool = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible()
    //expect(bool).toBeTruthy()
    await cart_checkout.checkout()


    const Oderdetails = new OrderOP(page)
    await Oderdetails.AddPersonalInformation(user.cvvNumber,user.NameOnCard)
    await Oderdetails.AddShippingInformation()
    await page.pause()
    
    

   
    //await page.locator('button span.ng-star-inserted').nth(1).click();
  
    await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.', { timeout: 5000 });

    //await page.locator('.hero-primary').waitFor();
    const OrderId = await page.locator('label.ng-star-inserted').textContent()
    console.log(OrderId)
    await page.locator('nav ul').waitFor();
    expect(page.locator('button.btn-custom .fa-handshake-o')).toBeVisible();
    await page.locator('button.btn-custom .fa-handshake-o').click()


    //const row = await page.locator('.thead-dark')
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr')

    for (let i = 0; i < await rows.count(); ++i) {
        const ID = await rows.nth(i).locator('th').textContent();
        if (OrderId.includes(ID)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }

    await page.locator('div p.tagline').waitFor();
    //await page.locator('div .col-text').toHaveText(ID)
    await page.locator('[class="fa fa-sign-out"]').click()
    await Browser.close()
})



//