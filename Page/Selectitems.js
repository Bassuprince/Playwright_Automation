export class Selectitems {
    constructor(page) {
        this.page = page
        this.Select_Dress = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        this.Select_cart = page.locator('[data-test="shopping-cart-link"]')
    }

 async Selectcorder()
{
    await this.Select_Dress.click()
    await this.Select_cart.click()
}
}