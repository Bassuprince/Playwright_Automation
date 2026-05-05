export class confirmorder{
    constructor(page){
        this.page=page
        this.Finish_button =page.locator('[id="finish"]');
        this.Back_to_home = page.locator('[id="back-to-products"]');
    }
    async confirmation(){
        await this.Finish_button.click()
        await this.Back_to_home.click()
    }
}