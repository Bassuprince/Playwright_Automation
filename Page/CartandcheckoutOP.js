export class Cartandcheckout{
    constructor(page){
        this.page = page
        this.Addtocart = page.locator('[routerlink="/dashboard/cart"]')
        this. Checkoutproduct =  page.locator('text=checkout')
    }
   async cartpage(){

            await this.Addtocart.click()
            await this.page.locator('div.cart').waitFor();
        
    }
    async checkout(){
        await this.Checkoutproduct.click()
    }
}