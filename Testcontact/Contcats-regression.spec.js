import { test, expect } from '@playwright/test';
import { registerWorkspace } from '../Util_files_caf/Contactregister';
import { genEmail, genInviteEmail, genCompanyName, genCompanyCode, genMobileNumber, genTag } from '../Util_files_caf/generators';
import { getActivationUrl, activateFromMail, acceptInviteFromMail, Logintoapplication } from '../Util_files_caf/mailpitHelper';
import { ContactsLoginPage } from '../pagecontact/ContactsLoginPage'
import { ContactAddcompanyPage } from '../pagecontact/ContactAddcompanyPage'
import { Contactaddcontact } from '../pagecontact/Contactaddcontact'
import { contactaddTags } from '../pagecontact/contactaddTags'
import { contactCustomfields } from '../pagecontact/contactCustomfields'
import { contactusermanagement } from '../pagecontact/contactuserusermanagement'
import { ContactTrash } from '../pagecontact/ContactTrash';
//import { companypage } from '../pagecontact/companypage';

test.describe('Contact regression tests', () => {
    test.setTimeout(600000);

    test('@Regression Add company with complete details and validate in UI', async ({ page }) => {

        const email = genEmail('rajesh', 'idsinternal.com');
        const InviteEmail = genInviteEmail('Basava', 'idsinternal.com');
        const companyName = genCompanyName();
        const Companycode = genCompanyCode();
        const mobileNumber = genMobileNumber('+91');
        const Tags = genTag();
        const Tag1 = genTag();

        await page.goto('https://contacts-app-qa.idsinternal.com/');
        await page.getByRole('link', { name: 'Start your workspace' }).first().click();

        await registerWorkspace(page, 'USA', email);
        await getActivationUrl(page, email);
        await activateFromMail(page, email);
        await Logintoapplication(page, email);

        const logintoapplication = new ContactsLoginPage(page)
        const addcompanydata = new ContactAddcompanyPage(page)
        const addcontactdata = new Contactaddcontact(page)
        const addNewTag = new contactaddTags(page)
        const addCustonfields = new contactCustomfields(page)
        const addusermanagement = new contactusermanagement(page)
        const RestoreContact = new ContactTrash(page)
        /*
                //======Login=====
                await logintoapplication.goto()
                await logintoapplication.login("rajesh1781256119257@idsinternal.com")
          */

        //Add first email & Phone number
        await addcompanydata.Addcompanydetails(companyName, Companycode)
        await addcompanydata.addPhone('+17373848458');
        await addcompanydata.addEmail('IDS@example.com');
        // Add second email & Phone number
        await addcompanydata.addPhone('+17876543210', 2);
        await addcompanydata.addEmail('support@example.com', 2);
        await addcompanydata.LocalizationSection()
        await addcompanydata.uploadCompanyLogo()
        await addcompanydata.companyAddaddress('India', 'Karnataka')

        const [response] = await Promise.all([
            page.waitForResponse(
                response =>
                    response.url().includes('/v1/companies') &&
                    response.request().method() === 'POST' &&
                    response.status() === 201
            ),
            await addcompanydata.saveCompany()
        ]);

        expect(response.status()).toBe(201);




        //  await addcompanydata.saveCompany()

        //========Edit===========
        await addcompanydata.EditCompany(companyName)
        await addcompanydata.addPhone('+17373848458');
        await addcompanydata.addEmail('IDSsdss@example.com')
        await addcompanydata.clickSaveButton()
        await addcompanydata.deleteCompany(companyName)
        //===Restore====
        await RestoreContact.RestoreCompany(companyName)



        //====Add Contact======
        await addcontactdata.usercontactdetails()
        await addcontactdata.organisationDetailsandWhatsAppFax()
        //await addcontactdata.uploadCompanyLogocontact()
        await addcontactdata.addaddress('India', 'Karnataka')
        await addcontactdata.Addthemoredetails(mobileNumber)
        await addcontactdata.addnewtag(Tag1)
        await addcontactdata.savecontact()


        //await addcontactdata.Editcontact(mobileNumber)
        //await addcontactdata.organisationDetailsandWhatsAppFax()
        //await addcompanydata.clickSaveButton()
        await addcontactdata.deleteContact(mobileNumber)
        //=====Restore=======
        await RestoreContact.RestoreContact(mobileNumber)

        //==Create Tags====
        await addNewTag.createnewtag(Tags)
        //===AddCustom Fields====
        await addCustonfields.addCustomFields()
        await addCustonfields.editCustomFields()
        await addCustonfields.deleteCustomFields()
        //==Add user management===

        await addusermanagement.inviteUserManagement(InviteEmail)
        await logintoapplication.logout()
        await acceptInviteFromMail(page, InviteEmail, 'USA', { firstName: 'Adithya', middleName: 'A', surname: 'Patils', password: 'Password@123' })
        await logintoapplication.login(InviteEmail)
        await logintoapplication.logout()


    })



});