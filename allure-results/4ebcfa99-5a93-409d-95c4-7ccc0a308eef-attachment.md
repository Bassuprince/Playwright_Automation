# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: company.spec.js >> Contact Creation >> Add the comapany  with mandatory fields
- Location: Testcontact/company.spec.js:17:7

# Error details

```
ReferenceError: ContactsLoginPage is not defined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { ContactAddcompanyPage } from '../pagecontact/ContactAddcompanyPage';
  3  | import { genCompanyName,genCompanyCode } from '../Util_files_caf/generators';
  4  | test.describe('Contact Creation', () => {
  5  |   let addcontactdata
  6  |   const companyName = genCompanyName()
  7  |   const Companycode = genCompanyCode()
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
> 10 |     const Logintoapplication = new ContactsLoginPage(page)
     |                                ^ ReferenceError: ContactsLoginPage is not defined
  11 |     addcontactdata = new Contactaddcontact(page)
  12 |     await Logintoapplication.goto()
  13 |     await Logintoapplication.login('rajesh1781581987464@idsinternal.com');
  14 |   });
  15 | 
  16 | 
  17 |   test('Add the comapany  with mandatory fields', async ({ page }) => {
  18 |     const addcompanydata = new ContactAddcompanyPage(page)
  19 |     addcompanydata.Addcompanydetails(companyName, Companycode)
  20 |     addcompanydata.LocalizationSection()
  21 |     addcompanydata.companyAddaddress('India')
  22 |   });
  23 |   test('Add the comapany  with all details', async ({ page }) => {
  24 |     const addcompanydata = new ContactAddcompanyPage(page)
  25 |     addcompanydata.Addcompanydetails()
  26 |     await addcompanydata.Addcompanydetails(companyName, Companycode)
  27 |     await addcompanydata.addPhone('+17373848458');
  28 |     await addcompanydata.addEmail('IDS@example.com');
  29 |     // Add second email & Phone number
  30 |     await addcompanydata.addPhone('+17876543210', 2);
  31 |     await addcompanydata.addEmail('support@example.com', 2);
  32 |     await addcompanydata.LocalizationSection()
  33 |     await addcompanydata.uploadCompanyLogo()
  34 |     await addcompanydata.companyAddaddress('India', 'Karnataka')
  35 |     await addcompanydata.saveButton()
  36 | 
  37 |   })
  38 | 
  39 | })
```