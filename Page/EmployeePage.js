export default class EmployeePage{
    constructor(page) {
        this.page = page;

        this.cafTab = page.locator('[data-testid="sidebar-item-/caf"]');
        this.rows = page.locator('tbody tr');

        this.acknowledge1 = page.locator('[type="checkbox"]').nth(0)
        this.acknowledge2 = page.locator('[type="checkbox"]').nth(1)
        this.commentfield = page.locator('[placeholder="Add any remarks or comments about this acknowledgement..."]')
        this.acknowledgebutton = page.getByRole('button', { name: 'Acknowledge' })

        this.appealID = page.locator('[placeholder="e.g. HR-2026-001"]')
        this.submitappealbutton = page.getByRole('button', { name: 'Submit Appeal' })
    }
   
    async openCAFUsingID(cafId) {

        await this.cafTab.click();

        await this.page.locator('tbody').waitFor();

        for (let i = 0; i < await this.rows.count(); i++) {

            const currentId = await this.rows
                .nth(i)
                .locator('td')
                .nth(1)
                .textContent();

            console.log("Current ID is",currentId);

            if (currentId.includes(cafId.trim())) {

                await this.rows.nth(i).click();

                break;
            }
        }
    }
    async employeeactionacknowledge(accknowledgecomment) {

        await this.acknowledge1.check()
        await this.acknowledge2.check()
        await this.commentfield.fill(accknowledgecomment)
        await this.acknowledgebutton.click()
    }
    async employeeactionappeal(appealID) {

        await this.appealID.fill(appealID);
        await this.submitappealbutton.click()

    }
    
}
//module.exports = {EmployeePage}
   

        

        