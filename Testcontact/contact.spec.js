import {test,expect} from '@playwright/test'
import { ContactsLoginPage } from '../pagecontact/ContactsLoginPage';
import { Contactaddcontact } from '../pagecontact/Contactaddcontact';
import { genTag } from '../Util_files_caf/generators';
test.describe('Contact Creation', () => {
  test.describe.configure({mode:'parallel'})
    let addcontactdata ;
    //const mobileNumber = `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  test.beforeEach(async ({ page }) => {
    const Logintoapplication = new ContactsLoginPage(page)
    addcontactdata = new Contactaddcontact(page)
    await  Logintoapplication.goto()
    await  Logintoapplication.login('rajesh1781756892998@idsinternal.com');
  });

  test('@sanity Add contact with mandatory fields', async ({ page }) => {
    const mobileNumber = `98${Date.now().toString().slice(-8)}`;
    
        await addcontactdata.usercontactdetails()
        await addcontactdata.organisationDetailsandWhatsAppFax()
        await addcontactdata.Addthemoredetails(mobileNumber)
        await addcontactdata.savecontact()
        await expect(page.locator('tbody tr').first()).toBeVisible()
  });
  test('Add contact with all fields', async ({ page }) => {
     const mobileNumber = `98${Date.now().toString().slice(-8)}`;
        await addcontactdata.usercontactdetails()
        await addcontactdata.organisationDetailsandWhatsAppFax()
        await addcontactdata.addaddress('India', 'Karnataka')
        await addcontactdata.Addthemoredetails(mobileNumber)
        await addcontactdata.savecontact()
        await expect(page.locator('tbody tr').first()).toBeVisible()
  });
  test('@sanity Add contact with profile image', async ({ page }) => {
     const mobileNumber = `98${Date.now().toString().slice(-8)}`;
        await addcontactdata.usercontactdetails()
        await addcontactdata.organisationDetailsandWhatsAppFax()
        await addcontactdata.uploadCompanyLogocontact()
        await addcontactdata.addaddress('India', 'Karnataka')
        await addcontactdata.Addthemoredetails(mobileNumber)
        await addcontactdata.savecontact()
        await expect(page.locator('tbody tr').first()).toBeVisible()
  });
test('@sanity Add contact with create tag in in contact screen ', async ({ page }) => {
     const mobileNumber = `98${Date.now().toString().slice(-8)}`;
     const taglable = genTag()
        await addcontactdata.usercontactdetails()
        await addcontactdata.organisationDetailsandWhatsAppFax()
        await addcontactdata.uploadCompanyLogocontact()
        await addcontactdata.addaddress('India', 'Karnataka')
        await addcontactdata.Addthemoredetails(mobileNumber)
        await addcontactdata.addnewtag(taglable)
        await addcontactdata.savecontact()
        await expect(page.locator('tbody tr').first()).toBeVisible()
})
test('@sanity Add public contact with all details ', async ({ page }) => {
     const mobileNumber = `98${Date.now().toString().slice(-8)}`;
     const taglable = genTag()
        await addcontactdata.usercontactdetails()
        await page.pause()
        await addcontactdata.organisationDetailsandWhatsAppFax()
        await addcontactdata.uploadCompanyLogocontact()
        await addcontactdata.addaddress('India', 'Karnataka')
        await addcontactdata.Addthemoredetails(mobileNumber)
        await addcontactdata. selectccontactprivacyPublic()
        await addcontactdata.addnewtag(taglable)
        await addcontactdata.savecontact()
        await expect(page.locator('tbody tr').first()).toBeVisible()
})

});