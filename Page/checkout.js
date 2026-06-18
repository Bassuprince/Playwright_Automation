export class checkout{
    constructor(page){
        this.page=page
        this.checkout_item = page.locator('[data-test="checkout"]');
        this.add_name = page.locator('[data-test="firstName"]');
        this.add_lastname = page.locator('[data-test="lastName"]');
        this.add_pin = page.locator('[placeholder="Zip/Postal Code"]');
        this.add_continue_button = page.locator('[data-test="continue"]');
    }

    async checkout_product(name,lastname,pin){
        await this.checkout_item.click()
        await this.add_name.fill(name)
        await this.add_lastname.fill(lastname)
        await this.add_pin.fill(pin)
        await this.add_continue_button.click()
    }

}