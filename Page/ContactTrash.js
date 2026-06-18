import { expect } from '@playwright/test'
class ContactTrash {
    constructor(page) {
        this.page = this.page;
        this.trashMenu = page.getByRole('link', { name: 'Trash' });
        this.trashHeading = page.getByRole('heading', { name: 'Trash' });

        this.contactsTab = page.getByRole('tab', { name: 'Contacts' });
        this.companiesTab = page.getByRole('tab', { name: 'Companies' });
        this.locationsTab = page.getByRole('tab', { name: 'Locations' });

        //contacts

    }
async trash()
{
    await this.trashMenu.click()
    await  this.contactsTab .click()
    const row = page.locator('tbody tr').nth(i);
   await this.row.getByRole('button', { name: /Restore/i }).click();
}
}