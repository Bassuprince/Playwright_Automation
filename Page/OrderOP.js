export class OrderOP{
    constructor(page){
        this.page=page
        this.AddCVV =  page.getByRole('textbox').nth(1)
        this.AddCardname = page.getByRole('textbox').nth(2)

        this. selectdropdown =  page.locator("[placeholder*='Country']")
        this.Dropdownvalves = page.locator(".ta-results");

    }

      async  AddPersonalInformation(cvvNumber,NameOnCard){
             await this.AddCVV.fill(cvvNumber) //cvv number
             await this.AddCardname .fill(NameOnCard) //name on card
             
        
        }
     async AddShippingInformation(){

                await this.page.waitForLoadState('networkidle');
                await this.page.locator('div.payment__shipping').waitFor();
            
                await this. selectdropdown.pressSequentially("ind", { delay: 350 });

               
                await this.Dropdownvalves.waitFor();
                const optionsCount = await this.Dropdownvalves.locator("button").count();
            
                for (let i = 0; i < optionsCount; ++i) {
                    const text = await this.Dropdownvalves.locator("button").nth(i).textContent();
                    if (text === " India") {
                        await this.Dropdownvalves.locator("button").nth(i).click();
                        break;
                    }
                }
                //await page.locator('button span.ng-star-inserted').nth(1).click();
                await this.page.locator('[class="btnn action__submit ng-star-inserted"]').click()
               // await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.', { timeout: 5000 });

        }

    
}