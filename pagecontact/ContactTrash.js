import {expect} from '@playwright/test'
export class ContactTrash{
    constructor(page){
        this.page = page
        this.TrashmenuButton = page.getByRole('link', { name: 'Trash' });
        this.viewTrashScreen = page.getByRole('heading', { name: 'Trash' });
        this.viewContact = page.getByRole('tab', { name: 'Contacts' });
        this.viewCompanies = page.getByRole('tab', { name: 'Companies' });
        this.selectRestore = page.getByRole('button',{name:/Restore/i});
        this.SelectRetextButton = page.getByRole('button', { name: 'Restore' });
        //companies
        this.companiesRestoreButton = page.getByRole('button', { name: /Restore/i });
    }

async RestoreContact(mobileNumber){
    await this.TrashmenuButton.click();
    await expect(this.viewTrashScreen).toBeVisible();
    //await expect(this.viewContact).toBeVisible();
    await expect(this.page.locator('tbody tr').first()).toBeVisible();
    const contactTrashRow = this.page.locator('tbody tr').filter({hasText: mobileNumber})
    await contactTrashRow.scrollIntoViewIfNeeded();
    await contactTrashRow.getByRole('button', { name: /Restore/i }).click({ timeout: 6000 });
    await expect(contactTrashRow).toHaveCount(1);
    await expect(this.SelectRetextButton).toBeVisible()
    await this.SelectRetextButton.click({ timeout: 6000 })
}
async RestoreCompany(companyName){
    await this.TrashmenuButton.click();
    await expect(this.viewTrashScreen).toBeVisible();
    await this.viewCompanies.click()
   // await expect(this.viewCompanies).toBeVisible();
    await expect(this.page.locator('tbody tr').first()).toBeVisible();
    const companiesTrashRow = this.page.locator('tbody tr').filter({hasText:companyName})
    await companiesTrashRow.scrollIntoViewIfNeeded();
    await expect(companiesTrashRow).toHaveCount(1);
    await companiesTrashRow.getByRole('button', { name: /Restore/i }).click({ timeout: 6000 })



}
}

  