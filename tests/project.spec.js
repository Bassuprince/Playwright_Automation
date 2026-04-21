import { test, expect } from '@playwright/test';
import {Loginpage} from '../Page/login'
import { Selectitems } from '../Page/Selectitem';
import { checkout } from '../Page/checkout';

test('test', async ({ page }) => {
    const Login = new Loginpage(page)
    const selectitem = new Selectitems(page)
    const check = new checkout(page)
    
    await Login.LaunchURL()
    await Login.login('standard_user','secret_sauce')
    await selectitem.Selectcorder()
    await check.checkout_product('basava','raj',2637)
   


 


//   //confirmation
//   await page.locator('[data-test="back-to-products"]').click();
 });