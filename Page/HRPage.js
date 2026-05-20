export class HRPage{
    constructor(page){
        this.page=page
        this.caftab = page.locator('[data-testid="sidebar-item-/caf"]')
        this.row = page.locator('tbody tr')

        this.clickseverity = page.getByRole('combobox')
        this.addcomment =  page.locator('[placeholder="Summarise your findings (min 100 characters, max 2000)"]');
        this.submitacknowledgmentbutton = page.getByRole('button', { name: 'Submit' });

        this.acceptbutton = page.getByRole('button', { name: 'Accept' });
        this.Resolutioncomment = page.locator('[placeholder="Provide resolution details (min 200 characters, max 2000)"]');
        this.approvesubmit = page.getByRole('button', { name: 'Submit' });

        this.rejectbutton = page.getByRole('button', { name: 'Reject' });
        this.clickseverityR = page.getByRole('combobox');
        //this.ghh = page.locator('[placeholder="Summarise your findings (min 100 characters, max 2000)"]');
        this.Describeresolution = page.locator('[placeholder="Describe the resolution for the rejected appeal (min 200 characters, max 2000)"]')
        this.rejectsubmit = page.getByRole('button', { name: 'Submit' })

    }

   async openCAFUsingID(cafID){
        await this.caftab .click()
        await this.page.locator('tbody').waitFor()

        for (let i = 0; i < await this.row.count(); ++i) {
            const currentID = await this.row.nth(i).locator('td').nth(1).textContent()
             console.log("current ID",currentID);
            if (currentID.includes(cafID.trim())) {
                await this.row.nth(i).click()
                break;
            }
        }
    }
    async HRacknowledgeflow(commentA){

        await this.clickseverity.click();
        await this.page.getByRole('option', { name: 'Critical' }).click();
        await this.addcomment.fill(commentA)
        await this.submitacknowledgmentbutton.click();

    }
    async HRapproveflow(comment){

        await this.acceptbutton.click()
        await this.Resolutioncomment.fill(comment)
        await this.approvesubmit.click()
    }
    async HRrejectflow(commentR,CommentRsolution) {

       // await expect(page.getByRole('button', { name: 'Reject' })).toBeVisible()

        await this.rejectbutton.click()
        await this.clickseverityR.click();
        await this.page.getByRole('option', { name: 'Critical' }).click();
        await this.addcomment.fill(commentR)
        await this.Describeresolution.fill(CommentRsolution)
        await this.rejectsubmit.click()
    }
}
//module.exports = {HRPage}