export class Selectproduct{
    constructor(page){
        this.page=page
        this.productsbody = page.locator('.card-body')

    }
   async selectproducts(Product) {
        const title = await this.page.locator("div.card-body h5 b").allTextContents()
        console.log(title)

        const products = 

        await this.page.locator('div.card-body h5 b').first().waitFor();
        const counts = await this.productsbody.count();
        console.log(counts)
        for (let i = 0; i < counts; ++i) {
            if (await this.productsbody.nth(i).locator("b").textContent() === Product) {
                //add product to cart
                await this.productsbody.nth(i).locator("text= Add To Cart").click()
                break;
            }
        }

    }
}