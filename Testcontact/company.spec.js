import { test, expect } from '@playwright/test'
import { ContactsLoginPage } from '../pagecontact/ContactsLoginPage'
import { ContactAddcompanyPage } from '../pagecontact/ContactAddcompanyPage';
import { genCompanyName,genCompanyCode } from '../Util_files_caf/generators';
import { ContactTrash } from '../pagecontact/ContactTrash';
test.describe('Contact Creation', () => {
  
  test.beforeEach(async ({ page }) => {
    const Logintoapplication = new ContactsLoginPage(page)
    await Logintoapplication.goto()
    await Logintoapplication.login('rajesh1781756892998@idsinternal.com');
  });


  test('Add the comapany  with mandatory fields', async ({ page }) => {
    const addcompanydata = new ContactAddcompanyPage(page)
    const companyName = genCompanyName()
    const Companycode = genCompanyCode()
    await addcompanydata.Addcompanydetails(companyName, Companycode)
    await addcompanydata.LocalizationSection()
    await addcompanydata.companyAddaddress('India')
    await addcompanydata.saveCompany()
  });
  test('@sanity Add the comapany  with all details', async ({ page }) => {
    const addcompanydata = new ContactAddcompanyPage(page)
    const companyName = genCompanyName()
    const Companycode = genCompanyCode()
    await addcompanydata.Addcompanydetails(companyName, Companycode)
    await addcompanydata.addPhone('+17373848458');
    await addcompanydata.addEmail('IDS@example.com');
    // Add second email & Phone number
    await addcompanydata.addPhone('+17876543210', 2);
    await addcompanydata.addEmail('support@example.com', 2);
    await addcompanydata.LocalizationSection()
    await addcompanydata.uploadCompanyLogo()
    await addcompanydata.companyAddaddress('India', 'Karnataka')
    await addcompanydata.saveCompany()

  })
  test('edit the company details',async ({page})=>{
    const addcompanydata = new ContactAddcompanyPage(page)
    const companyName = genCompanyName()
    const Companycode = genCompanyCode()
    await addcompanydata.Addcompanydetails(companyName, Companycode)
    await addcompanydata.addPhone('+17373848458');
    await addcompanydata.addEmail('IDS@example.com');
    // Add second email & Phone number
    await addcompanydata.addPhone('+17876543210', 2);
    await addcompanydata.addEmail('support@example.com', 2);
    await addcompanydata.LocalizationSection()
    await addcompanydata.uploadCompanyLogo()
    await addcompanydata.companyAddaddress('India', 'Karnataka')
    await addcompanydata.saveCompany()
    await addcompanydata.EditCompany(companyName)
    await addcompanydata.LocalizationSection()
    await addcompanydata.clickSaveButton()
  })
  test('@sanity deleted company recover from trash ', async ({page})=>{
    const getTrashdata = new ContactTrash(page)
    const addcompanydata = new ContactAddcompanyPage(page)
    const companyName = genCompanyName()
    const Companycode = genCompanyCode()
    await addcompanydata.Addcompanydetails(companyName, Companycode)
    await addcompanydata.addPhone('+17373848458');
    await addcompanydata.addEmail('IDS@example.com');
    // Add second email & Phone number
    await addcompanydata.addPhone('+17876543210', 2);
    await addcompanydata.addEmail('support@example.com', 2);
    await addcompanydata.LocalizationSection()
    await addcompanydata.uploadCompanyLogo()
    await addcompanydata.companyAddaddress('India', 'Karnataka')
    await addcompanydata.saveCompany()
    await addcompanydata.deleteCompany(companyName)
    await getTrashdata.RestoreCompany(companyName)


  })

})