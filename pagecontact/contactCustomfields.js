import { expect } from '@playwright/test';
export class contactCustomfields{
    constructor(page){
    this.page = page;
    this.customfieldmenu = page.getByRole('link', { name: 'Custom Fields' })
    this.viewcustomfield = page.getByRole('heading', { name: 'Custom Contact Fields' })
    //Create
    this.selectaddcustom = page.getByRole('button', { name: 'Add field' })
    this.addcustom =  page.getByRole('textbox', { name: 'Label' })
    this.addcustomDescription = page.getByRole('textbox', { name: 'Description (optional)' })
    this.createButton = page.getByRole('button', { name: 'Create', exact: true })
    //Edit
    this.EditButton = page.getByRole('button', { name: /Edit/i })
    this.editsaveButton = page.getByRole('button', { name: 'Save' })
    //Delet
    this.DeletButton = page.getByRole('button', { name: /Delete/i })
    this.viewDeletButton = page.getByRole('button', { name: 'Delete' })



}
async addCustomFields(){

  await this.customfieldmenu.click();
  await expect(this.viewcustomfield ).toBeVisible();

  await this.selectaddcustom.click();
  await this.addcustom.fill('Gender');
  await this.addcustomDescription.fill('Please mention your gender');
  await this.createButton.click();
}
async editCustomFields(){
    await this.EditButton.click()
    await this.addcustomDescription.fill('Please mention your gender')
    await this.editsaveButton.click()
    await expect(this.viewcustomfield ).toBeVisible();
}
async deleteCustomFields(){
     await this.DeletButton.click()
     await expect(this.viewDeletButton).toBeVisible()
     await this.viewDeletButton.click()
     await expect(this.viewcustomfield ).toBeVisible();
}

}