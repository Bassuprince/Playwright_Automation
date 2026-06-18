# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Contcats-regression.spec.js >> Contact regression tests >> Add company with complete details and validate in UI
- Location: Testcontact/Contcats-regression.spec.js:17:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/dashboard" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - link "Skip to main content" [ref=e4] [cursor=pointer]:
      - /url: "#main-content"
    - navigation "Sidebar" [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - img [ref=e8]
          - generic [ref=e13]: Contacts
        - button "Collapse sidebar" [expanded] [ref=e14]:
          - generic [ref=e15]: Collapse sidebar
          - img [ref=e16]
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: Workspace
          - list [ref=e21]:
            - listitem [ref=e22]:
              - link "Contacts" [ref=e23] [cursor=pointer]:
                - /url: /
                - img [ref=e24]
                - generic [ref=e29]: Contacts
            - listitem [ref=e30]:
              - link "Companies" [ref=e31] [cursor=pointer]:
                - /url: /companies
                - img [ref=e32]
                - generic [ref=e36]: Companies
            - listitem [ref=e37]:
              - link "Trash" [ref=e38] [cursor=pointer]:
                - /url: /trash
                - img [ref=e39]
                - generic [ref=e42]: Trash
            - listitem [ref=e43]:
              - link "Tags" [ref=e44] [cursor=pointer]:
                - /url: /tags
                - img [ref=e45]
                - generic [ref=e48]: Tags
        - generic [ref=e49]:
          - generic [ref=e50]: Admin
          - list [ref=e51]:
            - listitem [ref=e52]:
              - link "Custom Fields" [ref=e53] [cursor=pointer]:
                - /url: /admin/custom-fields
                - img [ref=e54]
                - generic [ref=e55]: Custom Fields
            - listitem [ref=e56]:
              - link "User Management" [ref=e57] [cursor=pointer]:
                - /url: /users
                - img [ref=e58]
                - generic [ref=e70]: User Management
        - list [ref=e72]:
          - listitem [ref=e73]:
            - link "Settings" [ref=e74] [cursor=pointer]:
              - /url: /settings
              - img [ref=e75]
              - generic [ref=e78]: Settings
    - generic [ref=e79]:
      - banner [ref=e80]:
        - link "Contacts home" [ref=e81] [cursor=pointer]:
          - /url: /
          - img [ref=e82]
          - generic [ref=e87]: Contacts
        - generic [ref=e88]:
          - button "Create new" [ref=e89]:
            - img [ref=e90]
            - generic [ref=e91]: New
          - link "Notifications" [ref=e92] [cursor=pointer]:
            - /url: /notifications
            - img [ref=e93]
          - button "Open account menu" [ref=e96]:
            - generic [ref=e97]: Open account menu
            - generic [ref=e98]: RR
      - main [ref=e99]:
        - generic [ref=e100]:
          - heading "Contacts" [level=1] [ref=e102]
          - generic [ref=e104]:
            - generic [ref=e105]:
              - generic [ref=e106]: Search contacts
              - generic "Focus search input" [ref=e107]:
                - img [ref=e108]
              - searchbox "Search contacts Focus search input" [ref=e111]
            - combobox "Sort contacts" [ref=e112]:
              - generic: Last Name (A–Z)
              - img
            - combobox "Filter by privacy" [ref=e113]:
              - generic: All
              - img
            - combobox "Filter by status" [ref=e114]:
              - generic: "Status: Active"
              - img
            - combobox "Filter by tag" [ref=e115]:
              - generic: "Tag: All"
              - img
            - combobox "Filter by company" [ref=e117]:
              - generic [ref=e118]: "Company: All"
              - img
            - generic [ref=e119]:
              - button "Import" [ref=e120]:
                - img
                - text: Import
              - button "Export" [ref=e121]:
                - img
                - text: Export
              - button "Add Contact" [ref=e122]:
                - img
                - text: Add Contact
          - status [ref=e123]:
            - img [ref=e124]
            - paragraph [ref=e129]: No contacts yet
            - paragraph [ref=e130]: Use “Add Contact” above to create your first one.
  - region "Notifications alt+T"
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
  17  |     test('Add company with complete details and validate in UI', async ({ page }) => {
  18  | 
  19  |         const email = genEmail('rajesh', 'idsinternal.com');
  20  |         const InviteEmail = genInviteEmail('Basava', 'idsinternal.com');
  21  |         const companyName = genCompanyName();
  22  |         const Companycode = genCompanyCode();
  23  |         const mobileNumber = genMobileNumber('+91');
  24  |         const Tags = genTag();
  25  |         const Tag1 = genTag();
  26  | 
  27  |         await page.goto('https://contacts-app-qa.idsinternal.com/');
  28  |         await page.getByRole('link', { name: 'Start your workspace' }).first().click();
  29  | 
  30  |         await registerWorkspace(page, 'USA', email);
  31  |         await getActivationUrl(page, email);
  32  |         await activateFromMail(page, email);
  33  |         await page.pause()
  34  |         await Logintoapplication(page, email);
  35  | 
> 36  |         await page.waitForURL('**/dashboard');
      |                    ^ TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
  37  | 
  38  |         const logintoapplication = new ContactsLoginPage(page)
  39  |         const addcompanydata = new ContactAddcompanyPage(page)
  40  |         const addcontactdata = new Contactaddcontact(page)
  41  |         const addNewTag = new contactaddTags(page)
  42  |         const addCustonfields = new contactCustomfields(page)
  43  |         const addusermanagement = new contactusermanagement(page)
  44  |         const RestoreContact = new ContactTrash(page)
  45  |         /*
  46  |                 //======Login=====
  47  |                 await logintoapplication.goto()
  48  |                 await logintoapplication.login("rajesh1781256119257@idsinternal.com")
  49  |           */
  50  | 
  51  |         //Add first email & Phone number
  52  |         await addcompanydata.Addcompanydetails(companyName, Companycode)
  53  |         await addcompanydata.addPhone('+17373848458');
  54  |         await addcompanydata.addEmail('IDS@example.com');
  55  |         // Add second email & Phone number
  56  |         await addcompanydata.addPhone('+17876543210', 2);
  57  |         await addcompanydata.addEmail('support@example.com', 2);
  58  |         await addcompanydata.LocalizationSection()
  59  |         await addcompanydata.uploadCompanyLogo()
  60  |         await addcompanydata.companyAddaddress('India', 'Karnataka')
  61  | 
  62  |         const [response] = await Promise.all([
  63  |             page.waitForResponse(
  64  |                 response =>
  65  |                     response.url().includes('/v1/companies') &&
  66  |                     response.request().method() === 'POST' &&
  67  |                     response.status() === 201
  68  |             ),
  69  |             await addcompanydata.saveCompany()
  70  |         ]);
  71  | 
  72  |         expect(response.status()).toBe(201);
  73  | 
  74  | 
  75  | 
  76  | 
  77  |         //  await addcompanydata.saveCompany()
  78  | 
  79  |         //========Edit===========
  80  |         await addcompanydata.EditCompany(companyName)
  81  |         await addcompanydata.addPhone('+17373848458');
  82  |         await addcompanydata.addEmail('IDSsdss@example.com')
  83  |         await addcompanydata.clickSaveButton()
  84  |         await addcompanydata.DeletCompany(companyName)
  85  |         //===Restore====
  86  |         await RestoreContact.RestoreCompany(companyName)
  87  | 
  88  | 
  89  | 
  90  |         //====Add Contact======
  91  |         await addcontactdata.usercontactdetails()
  92  |         await addcontactdata.organisationDetailsandWhatsAppFax()
  93  |         //await addcontactdata.uploadCompanyLogocontact()
  94  |         await addcontactdata.addaddress('India', 'Karnataka')
  95  |         await addcontactdata.Addthemoredetails(mobileNumber)
  96  |         await addcontactdata.addnewtag(Tag1)
  97  |         await addcontactdata.savecontact()
  98  | 
  99  | 
  100 |         //await addcontactdata.Editcontact(mobileNumber)
  101 |         //await addcontactdata.organisationDetailsandWhatsAppFax()
  102 |         //await addcompanydata.clickSaveButton()
  103 |         await addcontactdata.Deletcontact(mobileNumber)
  104 |         //=====Restore=======
  105 |         await RestoreContact.RestoreContact(mobileNumber)
  106 | 
  107 |         //==Create Tags====
  108 |         await addNewTag.createnewtag(Tags)
  109 |         //===AddCustom Fields====
  110 |         await addCustonfields.AddCustomFileds()
  111 |         await addCustonfields.EditCustomfields()
  112 |         await addCustonfields.DeleteCustomfields()
  113 |         //==Add user management===
  114 | 
  115 |         await addusermanagement.InviteUserMnagement(InviteEmail)
  116 |         await logintoapplication.logout()
  117 |         await acceptInviteFromMail(page, InviteEmail, 'USA', { firstName: 'Adithya', middleName: 'A', surname: 'Patils', password: 'Password@123' })
  118 |         await logintoapplication.login(InviteEmail)
  119 |         await logintoapplication.logout()
  120 | 
  121 | 
  122 |     })
  123 | 
  124 | 
  125 | 
  126 | });
```