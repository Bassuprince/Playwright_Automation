export class ManagerPage{
    constructor(page) {
        this.page = page;
        
        
        //IdentificationDetails
        this.selectTheCAFTab = page.locator('[data-testid="sidebar-item-/caf"]');
        this.createNewCAF = page .locator('.inline-flex.items-center.justify-center.whitespace-nowrap').nth(1);
        this.clickEmployeeName = page.locator('#employee-select');
        this.clickCategory = page.locator('#category-select');
        
        //CaseSubject
        this.addSubject = page.locator('#subject-input')
        this.addProblemDescription = page.locator('#problem-description')
        this.addImpact = page.locator('#impact-input')
        this.addCorrectiveAction = page.locator('#corrective-action-measure')
        this.clickCreateCAFButton = page.getByText('Create CAF')

    }
    
    async identificationDetails(employeeName,category) {

        await this.selectTheCAFTab.click();

        //await expect( this.page.getByRole('button', { name: 'Create New CAF' })  ).toBeVisible();

        await this.createNewCAF.click();

        await this.clickEmployeeName.click();
        await this. page.getByRole('option', { name: employeeName}).click();
        
        await this.clickCategory.click();
        await this.page.getByRole('option', {name: category}).click();
    }
    async caseSubject(Subject,Description,Impact,CorrectiveAction)
    {
        await this.addSubject.fill(Subject);
        await this.addProblemDescription.fill(Description);
        await this.addImpact.fill(Impact);
        await this.addCorrectiveAction.fill(CorrectiveAction);
        await this.clickCreateCAFButton.click();
    }
    async captureCAFIDA(){
         const IDcapture = await this.page.locator('tbody tr').first().locator('td').nth(1).textContent();
        console.log("capture ID is",IDcapture);

        return IDcapture;

    }
}
//module.exports = {ManagerPage}
               