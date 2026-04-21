export class checkout{
    constructor(page){
        this.page=page()
        checkout_item= page.locator('[data-test="checkout"]');
        add_name = page.locator('[data-test="firstName"]');
        add_lastanme =page.locator('[data-test="lastName"]');
        add_pin = locator('[data-test="continue"]').click();
        add_continue_button = page.locator('[data-test="continue"]').click();
        add_finsh_button = page.locator('[data-test="finish"]').click();
    }

    async checkout_product(name,lastname,pin){
        await this.checkout_item.click()
        await this.add_name.fill(name)
        await this.add_lastanme.fill(lastname)
        await this.add_pin.fill(pin)
        await this.add_continue_button.click()
    }
//   //checkout
//   await page.locator('[data-test="checkout"]').click();
//   await page.locator('[data-test="firstName"]').fill('ram');
//   await page.locator('[data-test="lastName"]').fill('k');
//   await page.locator('[data-test="postalCode"]').fill('34234');
//   await page.locator('[data-test="continue"]').click();
//   await page.locator('[data-test="finish"]').click();


}