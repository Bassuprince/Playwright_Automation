# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Contcats-regression.spec.js >> Contact regression tests >> @Regression Add company with complete details and validate in UI
- Location: Testcontact/Contcats-regression.spec.js:17:9

# Error details

```
Error: page.goto: net::ERR_NETWORK_CHANGED at https://contacts-app-qa.idsinternal.com/
Call log:
  - navigating to "https://contacts-app-qa.idsinternal.com/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { registerWorkspace } from '../Util_files_caf/Contactregister';
  3   | import { genEmail, genInviteEmail, genCompanyName, genCompanyCode, genMobileNumber, genTag } from '../Util_files_caf/generators';
  4   | import { getActivationUrl, activateFromMail, acceptInviteFromMail, Logintoapplication } from '../Util_files_caf/mailpitHelper';
  5   | import { ContactsLoginPage } from '../pagecontact/ContactsLoginPage'
  6   | import { ContactAddcompanyPage } from '../pagecontact/ContactAddcompanyPage'
  7   | import { Contactaddcontact } from '../pagecontact/Contactaddcontact'
  8   | import { contactaddTags } from '../pagecontact/contactaddTags'
  9   | import { contactCustomfields } from '../pagecontact/contactCustomfields'
  10  | import { contactusermanagement } from '../pagecontact/contactuserusermanagement'
  11  | import { ContactTrash } from '../pagecontact/ContactTrash';
  12  | //import { companypage } from '../pagecontact/companypage';
  13  | 
  14  | test.describe('Contact regression tests', () => {
  15  |     test.setTimeout(600000);
  16  | 
  17  |     test('@Regression Add company with complete details and validate in UI', async ({ page }) => {
  18  | 
  19  |         const email = genEmail('rajesh', 'idsinternal.com');
  20  |         const InviteEmail = genInviteEmail('Basava', 'idsinternal.com');
  21  |         const companyName = genCompanyName();
  22  |         const Companycode = genCompanyCode();
  23  |         const mobileNumber = genMobileNumber('+91');
  24  |         const Tags = genTag();
  25  |         const Tag1 = genTag();
  26  | 
> 27  |         await page.goto('https://contacts-app-qa.idsinternal.com/');
      |                    ^ Error: page.goto: net::ERR_NETWORK_CHANGED at https://contacts-app-qa.idsinternal.com/
  28  |         await page.getByRole('link', { name: 'Start your workspace' }).first().click();
  29  | 
  30  |         await registerWorkspace(page, 'USA', email);
  31  |         await getActivationUrl(page, email);
  32  |         await activateFromMail(page, email);
  33  |         await Logintoapplication(page, email);
  34  | 
  35  |         const logintoapplication = new ContactsLoginPage(page)
  36  |         const addcompanydata = new ContactAddcompanyPage(page)
  37  |         const addcontactdata = new Contactaddcontact(page)
  38  |         const addNewTag = new contactaddTags(page)
  39  |         const addCustonfields = new contactCustomfields(page)
  40  |         const addusermanagement = new contactusermanagement(page)
  41  |         const RestoreContact = new ContactTrash(page)
  42  |         /*
  43  |                 //======Login=====
  44  |                 await logintoapplication.goto()
  45  |                 await logintoapplication.login("rajesh1781256119257@idsinternal.com")
  46  |           */
  47  | 
  48  |         //Add first email & Phone number
  49  |         await addcompanydata.Addcompanydetails(companyName, Companycode)
  50  |         await addcompanydata.addPhone('+17373848458');
  51  |         await addcompanydata.addEmail('IDS@example.com');
  52  |         // Add second email & Phone number
  53  |         await addcompanydata.addPhone('+17876543210', 2);
  54  |         await addcompanydata.addEmail('support@example.com', 2);
  55  |         await addcompanydata.LocalizationSection()
  56  |         await addcompanydata.uploadCompanyLogo()
  57  |         await addcompanydata.companyAddaddress('India', 'Karnataka')
  58  | 
  59  |         const [response] = await Promise.all([
  60  |             page.waitForResponse(
  61  |                 response =>
  62  |                     response.url().includes('/v1/companies') &&
  63  |                     response.request().method() === 'POST' &&
  64  |                     response.status() === 201
  65  |             ),
  66  |             await addcompanydata.saveCompany()
  67  |         ]);
  68  | 
  69  |         expect(response.status()).toBe(201);
  70  | 
  71  | 
  72  | 
  73  | 
  74  |         //  await addcompanydata.saveCompany()
  75  | 
  76  |         //========Edit===========
  77  |         await addcompanydata.EditCompany(companyName)
  78  |         await addcompanydata.addPhone('+17373848458');
  79  |         await addcompanydata.addEmail('IDSsdss@example.com')
  80  |         await addcompanydata.clickSaveButton()
  81  |         await addcompanydata.deleteCompany(companyName)
  82  |         //===Restore====
  83  |         await RestoreContact.RestoreCompany(companyName)
  84  | 
  85  | 
  86  | 
  87  |         //====Add Contact======
  88  |         await addcontactdata.usercontactdetails()
  89  |         await addcontactdata.organisationDetailsandWhatsAppFax()
  90  |         //await addcontactdata.uploadCompanyLogocontact()
  91  |         await addcontactdata.addaddress('India', 'Karnataka')
  92  |         await addcontactdata.Addthemoredetails(mobileNumber)
  93  |         await addcontactdata.addnewtag(Tag1)
  94  |         await addcontactdata.savecontact()
  95  | 
  96  | 
  97  |         //await addcontactdata.Editcontact(mobileNumber)
  98  |         //await addcontactdata.organisationDetailsandWhatsAppFax()
  99  |         //await addcompanydata.clickSaveButton()
  100 |         await addcontactdata.deleteContact(mobileNumber)
  101 |         //=====Restore=======
  102 |         await RestoreContact.RestoreContact(mobileNumber)
  103 | 
  104 |         //==Create Tags====
  105 |         await addNewTag.createnewtag(Tags)
  106 |         //===AddCustom Fields====
  107 |         await addCustonfields.addCustomFields()
  108 |         await addCustonfields.editCustomFields()
  109 |         await addCustonfields.deleteCustomFields()
  110 |         //==Add user management===
  111 | 
  112 |         await addusermanagement.inviteUserManagement(InviteEmail)
  113 |         await logintoapplication.logout()
  114 |         await acceptInviteFromMail(page, InviteEmail, 'USA', { firstName: 'Adithya', middleName: 'A', surname: 'Patils', password: 'Password@123' })
  115 |         await logintoapplication.login(InviteEmail)
  116 |         await logintoapplication.logout()
  117 | 
  118 | 
  119 |     })
  120 | 
  121 | 
  122 | 
  123 | });
```