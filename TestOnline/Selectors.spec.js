import { test, expect } from '@playwright/test';


test('Selectors', async ({ page }) => {
    await page.goto('https://www.rahulshettyacademy.com/angularpractice/');

    await page.getByLabel('Check me out if you Love IceCreams!').click()
    await page.getByLabel('Student').check()
    await page.getByLabel('Gender').selectOption('Male')
    await page.getByPlaceholder('Password').fill('basav')
    await page.getByRole('button', { name: 'Submit' }).click()
    await page.getByRole('radio', { name: 'Male', exact: true })
    //await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    await page.getByRole("Link", { name: "Shop" }).click()
    await page.getByText("Shop Name").isVisible()
    await page.locator('app-card-list').filter({ hashText: "iphone X" }).getByRole('button', { name: 'Add' }).click()

})

test('Onlineshopping', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByRole('link', { name: 'Register' }).click()
    await page.getByLabel('First Name').fill('Basava102')
    await page.getByLabel('Last Name').fill('Raj')
    await page.getByPlaceholder('email@example.com').fill('basava102@gmail.com')
    await page.getByPlaceholder('enter your number').fill('9876543210')
    await page.getByRole('combobox').selectOption('2: Student');
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByRole('textbox', { name: 'Passsword' }).fill('Password@123');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Password@123');
    await page.locator('.col-md-1').click();
    await page.getByRole('button', { name: 'Register' }).click();
    await page.waitForTimeout(300)
    await page.locator('[class="btn btn-primary"]').click()
    
})



test.only('Login to application',async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByPlaceholder('email@example.com').fill('basava102@gmail.com')
    await page.getByPlaceholder('enter your passsword').fill('Password@123')
    await page.getByRole('button',{name:'Login'}).click()

    await page.locator('div .card-body').filter({ hasText: "iphone 13 pro" }).getByRole('button', { name: ' Add To Cart' }).click()
    await expect(page.locator('[style="margin-top: -28px;"]')).toHaveText('Automation Practice')
    await page.getByRole('listitem').getByRole('button', { name: "Cart" }).click()

    await page.locator('[routerlink="/dashboard/cart"]').click()
    await page.locator('div.cart').waitFor();

    const bool = await page.locator('h3:has-text("iphone 13 pro")').isVisible()
    expect(bool).toBeTruthy()
    await page.getByRole('button', { name: "Checkout" }).click()
    await page.getByPlaceholder('Select Country').pressSequentially('ind')
    await page.getByRole('button', { name: "India" }).nth(1).click()
    await page.getByText('Place Order ').click()
 await page.pause()
   


    //
    const title = await page.locator("div.card-body h5 b").allTextContents()
    console.log(title)

    const ProductTitle = "iphone 13 pro"
    const products = page.locator('.card-body')
    await page.locator('div.card-body h5 b').first().waitFor();
    const counts = await products.count();
    console.log(counts)
    for (let i = 0; i < counts; ++i) {
        if (await products.nth(i).locator("b").textContent() === ProductTitle) {
            //add product to cart
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }
    

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
    await page.locator('[class="btnn action__submit ng-star-inserted"]').click()
    await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.', { timeout: 5000 });

    //await page.locator('.hero-primary').waitFor();
    const OrderId = await page.locator('label.ng-star-inserted').textContent();
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

})