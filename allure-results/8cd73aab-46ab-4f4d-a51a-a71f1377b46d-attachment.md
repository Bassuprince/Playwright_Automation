# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.js >> Contact Creation >> @sanity Add public contact with all details 
- Location: Testcontact/contact.spec.js:57:6

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('tbody tr')
Expected: visible
Error: strict mode violation: locator('tbody tr') resolved to 7 elements:
    1) <tr class="cursor-pointer bg-surface hover:bg-surface-tertiary">…</tr> aka getByText('BRBasava K Raj+916719156215Rajesh RPrivate')
    2) <tr class="cursor-pointer bg-surface hover:bg-surface-tertiary">…</tr> aka getByText('BRBasava K Raj+919863557751Rajesh RPrivate')
    3) <tr class="cursor-pointer bg-surface hover:bg-surface-tertiary">…</tr> aka getByText('Basava K Raj+919863562645Rajesh RPrivate')
    4) <tr class="cursor-pointer bg-surface hover:bg-surface-tertiary">…</tr> aka getByText('BRBasava K Raj+919863568058Rajesh RPrivate')
    5) <tr class="cursor-pointer bg-surface hover:bg-surface-tertiary">…</tr> aka getByText('Basava K Raj+919863576980Rajesh RPrivate')
    6) <tr class="cursor-pointer bg-surface hover:bg-surface-tertiary">…</tr> aka getByText('Basava K RajIDS_Internal321+')
    7) <tr class="cursor-pointer bg-surface hover:bg-surface-tertiary">…</tr> aka getByText('Basava K RajIDS_Internal156+')

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for locator('tbody tr')

```

# Page snapshot

```yaml
- generic:
  - generic:
    - generic:
      - link:
        - /url: "#main-content"
        - text: Skip to main content
      - navigation:
        - generic:
          - generic:
            - img
            - generic: Contacts
          - button [expanded]:
            - generic: Collapse sidebar
            - img
        - generic:
          - generic:
            - generic: Workspace
            - list:
              - listitem:
                - link:
                  - /url: /
                  - img
                  - generic: Contacts
              - listitem:
                - link:
                  - /url: /companies
                  - img
                  - generic: Companies
              - listitem:
                - link:
                  - /url: /trash
                  - img
                  - generic: Trash
              - listitem:
                - link:
                  - /url: /tags
                  - img
                  - generic: Tags
          - generic:
            - generic: Admin
            - list:
              - listitem:
                - link:
                  - /url: /admin/custom-fields
                  - img
                  - generic: Custom Fields
              - listitem:
                - link:
                  - /url: /users
                  - img
                  - generic: User Management
          - generic:
            - list:
              - listitem:
                - link:
                  - /url: /settings
                  - img
                  - generic: Settings
      - generic:
        - banner:
          - link:
            - /url: /
            - img
            - generic: Contacts
          - generic:
            - button:
              - img
              - generic: New
            - link:
              - /url: /notifications
              - img
              - generic: "1"
            - button:
              - generic: Open account menu
              - generic: RR
        - main:
          - generic:
            - generic:
              - heading [level=1]: Contacts
            - generic:
              - generic:
                - generic:
                  - generic: Search contacts
                  - generic:
                    - img
                  - searchbox
                - combobox:
                  - generic: Last Name (A–Z)
                  - img
                - combobox:
                  - generic: All
                  - img
                - combobox:
                  - generic: "Status: Active"
                  - img
                - combobox:
                  - generic: "Tag: All"
                  - img
                - generic:
                  - combobox:
                    - generic: "Company: All"
                    - img
                - generic:
                  - button:
                    - img
                    - text: Import
                  - button:
                    - img
                    - text: Export
                  - button:
                    - img
                    - text: Add Contact
            - generic:
              - table:
                - rowgroup:
                  - row:
                    - columnheader:
                      - checkbox
                    - columnheader:
                      - generic: Avatar
                    - columnheader: Name
                    - columnheader: Phone
                    - columnheader: Email
                    - columnheader: Owner
                    - columnheader: Privacy
                    - columnheader:
                      - generic: Actions
                - rowgroup:
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - generic: BR
                    - cell:
                      - generic: Basava K Raj
                    - cell: "+916719156215"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Private
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - generic: BR
                    - cell:
                      - generic: Basava K Raj
                    - cell: "+919863557751"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Private
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - button:
                        - img
                    - cell:
                      - generic: Basava K Raj
                    - cell: "+919863562645"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Private
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - generic: BR
                    - cell:
                      - generic: Basava K Raj
                    - cell: "+919863568058"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Private
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - button:
                        - img
                    - cell:
                      - generic: Basava K Raj
                    - cell: "+919863576980"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Private
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - button:
                        - img
                    - cell:
                      - generic: Basava K Raj
                      - generic:
                        - generic: IDS_Internal321
                    - cell: "+919864136281"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Private
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - button:
                        - img
                    - cell:
                      - generic: Basava K Raj
                      - generic:
                        - generic: IDS_Internal156
                    - cell: "+919864336400"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Public
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
                  - row:
                    - cell:
                      - checkbox
                    - cell:
                      - generic: BR
                    - cell:
                      - generic: Basava K Raj
                      - generic:
                        - generic: IDS_Internal657
                    - cell: "+919864757954"
                    - cell
                    - cell: Rajesh R
                    - cell:
                      - generic:
                        - img
                        - text: Public
                    - cell:
                      - generic:
                        - button:
                          - img
                        - button:
                          - img
              - paragraph: 8 contacts
    - region "Notifications alt+T"
  - dialog "Add Contact" [active] [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - heading "Add Contact" [level=2] [ref=e6]
          - paragraph [ref=e7]: All fields marked * are required.
        - button "Close" [ref=e8]:
          - img [ref=e9]
      - generic [ref=e12]:
        - generic [ref=e13]:
          - button "Start from existing — optional" [disabled]:
            - generic:
              - img
              - text: Start from existing
              - generic: — optional
            - img
        - region "Profile picture" [ref=e14]:
          - heading "Profile picture" [level=3] [ref=e15]
          - generic [ref=e16]:
            - generic "Profile picture drop zone" [ref=e17] [cursor=pointer]:
              - img "Profile preview" [ref=e18]
              - button "Profile picture" [ref=e19]
            - generic [ref=e20]:
              - paragraph [ref=e21]: Any image — we'll help you crop it to a square. Drop, paste, or click to upload.
              - generic [ref=e22]:
                - button "Replace photo" [ref=e23]
                - button "Remove" [ref=e24]:
                  - img
                  - text: Remove
              - paragraph [ref=e25]: cropped.png · 41 KB
        - region "Name" [ref=e26]:
          - heading "Name" [level=3] [ref=e27]
          - generic [ref=e28]:
            - generic [ref=e29]: Salutation
            - combobox "Salutation" [ref=e30]:
              - generic: Mr
              - img
            - combobox [ref=e31]
          - generic [ref=e32]:
            - generic [ref=e33]:
              - generic [ref=e34]:
                - text: First name
                - generic [ref=e35]: "*"
                - generic [ref=e36]: (required)
              - textbox "First name (required)" [ref=e37]: Basava
              - paragraph [ref=e38]: Up to 50 characters.
            - generic [ref=e39]:
              - generic [ref=e40]: Last name
              - textbox "Last name" [ref=e41]: Raj
              - paragraph [ref=e42]: Up to 50 characters.
          - generic [ref=e43]:
            - generic [ref=e44]: Middle name
            - textbox "Middle name" [ref=e45]: K
            - paragraph [ref=e46]: Up to 50 characters.
        - region "Organisation" [ref=e47]:
          - heading "Organisation" [level=3] [ref=e48]
          - generic [ref=e49]:
            - generic [ref=e50]: Company
            - combobox "Company" [disabled]:
              - generic: No company
              - img
          - generic [ref=e51]:
            - generic [ref=e52]:
              - generic [ref=e53]: Job title
              - textbox "Job title" [ref=e54]: Software Engineer
            - generic [ref=e55]:
              - generic [ref=e56]: Department
              - textbox "Department" [ref=e57]: Engineering
          - generic [ref=e58]:
            - generic [ref=e59]: Assistant name
            - textbox "Assistant name" [ref=e60]: Suresh
        - region "Phone (required)" [ref=e61]:
          - heading "Phone (required)" [level=3] [ref=e63]:
            - text: Phone*
            - generic [ref=e64]: (required)
          - generic [ref=e66]:
            - generic [ref=e67]:
              - generic [ref=e68]:
                - generic [ref=e69]: Type
                - combobox "Type" [ref=e70]:
                  - generic: Mobile
                  - img
                - combobox [ref=e71]
              - generic [ref=e72]:
                - generic [ref=e73]: Country
                - combobox "Country" [ref=e74]:
                  - generic: IN
                  - img
                - combobox [ref=e75]
            - generic [ref=e76]:
              - generic [ref=e78]:
                - generic [ref=e79]: Number
                - textbox "Number" [ref=e80]:
                  - /placeholder: +91 81234 56789
                  - text: "9864757954"
              - generic [ref=e83]:
                - switch "Phone 1 is the primary number" [checked] [ref=e84]: ★ Primary
                - button "Remove phone 1" [disabled]:
                  - img
          - button "Add phone number" [ref=e85]:
            - img
            - text: Add phone number
        - region "Email" [ref=e86]:
          - heading "Email" [level=3] [ref=e87]
          - button "Add email" [ref=e88]:
            - img
            - text: Add email
        - region "WhatsApp & Fax" [ref=e89]:
          - heading "WhatsApp & Fax" [level=3] [ref=e91]
          - generic [ref=e92]:
            - generic [ref=e93]:
              - generic [ref=e94]: Country
              - combobox "WhatsApp country" [ref=e95]:
                - generic: CA
                - img
              - combobox [ref=e96]
            - generic [ref=e97]:
              - generic [ref=e98]: WhatsApp number
              - textbox "WhatsApp number" [ref=e99]:
                - /placeholder: +1 506 234 5678
                - text: "+12365895623"
          - generic [ref=e100]:
            - generic [ref=e101]:
              - generic [ref=e102]: Country
              - combobox "Fax country" [ref=e103]:
                - generic: US
                - img
              - combobox [ref=e104]
            - generic [ref=e105]:
              - generic [ref=e106]: Fax number
              - textbox "Fax number" [ref=e107]:
                - /placeholder: +1 201 555 0123
                - text: "+12763452652"
        - region "Address" [ref=e108]:
          - heading "Address" [level=3] [ref=e109]
          - tablist "Address type" [ref=e110]:
            - tab "Billing" [selected] [ref=e111]
            - tab "Mailing" [ref=e112]
          - tabpanel [ref=e113]:
            - generic [ref=e114]:
              - generic [ref=e115]:
                - generic [ref=e116]: Address line 1
                - textbox "Address line 1" [ref=e117]: Balmata Road
              - generic [ref=e118]:
                - generic [ref=e119]: Address line 2
                - textbox "Address line 2" [ref=e120]: Mangalore
              - generic [ref=e121]:
                - generic [ref=e122]:
                  - generic [ref=e123]: City
                  - textbox "City" [ref=e124]: Managalore
                - generic [ref=e125]:
                  - generic [ref=e126]: State / Province
                  - combobox "State / Province" [ref=e127]:
                    - generic: Karnataka
                    - img
                  - combobox [ref=e128]
                - generic [ref=e129]:
                  - generic [ref=e130]: Postal code
                  - textbox "Postal code" [ref=e131]:
                    - /placeholder: "560001"
                - generic [ref=e132]:
                  - generic [ref=e133]: Country
                  - button "Country" [ref=e134]:
                    - generic [ref=e135]: India (IN)
                    - img [ref=e136]
            - button "Clear billing address" [ref=e139]
        - region "Privacy" [ref=e140]:
          - heading "Privacy" [level=3] [ref=e141]
          - radiogroup "Privacy" [ref=e142]:
            - radio "Private Only you and admins can see this contact." [ref=e143]:
              - img [ref=e144]
              - generic [ref=e149]:
                - generic [ref=e150]: Private
                - generic [ref=e151]: Only you and admins can see this contact.
            - radio "Public Visible to everyone in your organization." [checked] [ref=e152]:
              - img [ref=e153]
              - generic [ref=e156]:
                - generic [ref=e157]: Public
                - generic [ref=e158]: Visible to everyone in your organization.
        - region "More details" [ref=e159]:
          - heading "More details" [level=3] [ref=e160]
          - generic [ref=e161]:
            - generic [ref=e162]:
              - generic [ref=e163]: Birthday
              - textbox "Birthday" [ref=e164]: 1990-01-01
            - generic [ref=e165]:
              - generic [ref=e166]: Preferred language
              - textbox "Preferred language" [ref=e167]: English
          - generic [ref=e168]:
            - generic [ref=e169]: Website
            - textbox "Website" [ref=e170]:
              - /placeholder: https://acme.example.com
              - text: https://ultimateqa.com
          - generic [ref=e171]:
            - generic [ref=e172]: Notes
            - textbox "Notes" [ref=e173]: This is a test contact
            - paragraph [ref=e174]: Plain text, max 10,000 characters.
        - region "Tags" [ref=e175]:
          - heading "Tags" [level=3] [ref=e176]
          - generic [ref=e178]:
            - generic [ref=e179]:
              - generic [ref=e180]: IDS_Internal657
              - button "Remove tag IDS_Internal657" [ref=e181]:
                - img [ref=e182]
            - combobox "Add tag" [ref=e185]:
              - img
              - text: Add tag
        - region "Custom Fields" [ref=e186]:
          - heading "Custom Fields" [level=3] [ref=e188]
          - generic [ref=e189]:
            - img [ref=e190]
            - paragraph [ref=e191]:
              - text: No custom fields have been set up yet. An Admin can add fields under
              - link "Settings" [ref=e192] [cursor=pointer]:
                - /url: /admin/custom-fields
              - text: .
      - generic [ref=e193]:
        - button "Cancel" [disabled]
        - button "Saving…" [disabled]
      - generic:
        - complementary:
          - generic:
            - generic:
              - heading [level=2]:
                - img
                - text: Start from existing
              - paragraph: Copy details from an existing company or contact into this form.
            - button [disabled]:
              - img
          - generic:
            - region:
              - tablist:
                - tab [disabled] [selected]: Company
                - tab [disabled]: Existing contact
              - generic:
                - img
                - textbox [disabled]:
                  - /placeholder: Search companies (min. 2 characters)…
              - listbox:
                - list:
                  - listitem:
                    - option:
                      - generic: IDS-InternalDH96
                      - generic: Pick
                  - listitem:
                    - option:
                      - generic: IDS-InternalHW8E
                      - generic: Pick
                  - listitem:
                    - option:
                      - generic: IDS-InternalVD2M
                      - generic: Pick
              - paragraph: Pick a Company to copy its phones, emails, and addresses into this contact. No link is preserved beyond the company assignment itself.
          - generic:
            - button [disabled]: Done
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | import { ContactsLoginPage } from '../pagecontact/ContactsLoginPage';
  3  | import { Contactaddcontact } from '../pagecontact/Contactaddcontact';
  4  | import { genTag } from '../Util_files_caf/generators';
  5  | test.describe('Contact Creation', () => {
  6  |   test.describe.configure({mode:'parallel'})
  7  |     let addcontactdata ;
  8  |     //const mobileNumber = `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  9  | 
  10 |   test.beforeEach(async ({ page }) => {
  11 |     const Logintoapplication = new ContactsLoginPage(page)
  12 |     addcontactdata = new Contactaddcontact(page)
  13 |     await  Logintoapplication.goto()
  14 |     await  Logintoapplication.login('rajesh1781756892998@idsinternal.com');
  15 |   });
  16 | 
  17 |   test('@sanity Add contact with mandatory fields', async ({ page }) => {
  18 |     const mobileNumber = `98${Date.now().toString().slice(-8)}`;
  19 |     
  20 |         await addcontactdata.usercontactdetails()
  21 |         await addcontactdata.organisationDetailsandWhatsAppFax()
  22 |         await addcontactdata.Addthemoredetails(mobileNumber)
  23 |         await addcontactdata.savecontact()
  24 |         await expect(page.locator('tbody tr')).toBeVisible()
  25 |   });
  26 |   test('Add contact with all fields', async ({ page }) => {
  27 |      const mobileNumber = `98${Date.now().toString().slice(-8)}`;
  28 |         await addcontactdata.usercontactdetails()
  29 |         await addcontactdata.organisationDetailsandWhatsAppFax()
  30 |         await addcontactdata.addaddress('India', 'Karnataka')
  31 |         await addcontactdata.Addthemoredetails(mobileNumber)
  32 |         await addcontactdata.savecontact()
  33 |         await expect(page.locator('tbody tr')).toBeVisible()
  34 |   });
  35 |   test('@sanity Add contact with profile image', async ({ page }) => {
  36 |      const mobileNumber = `98${Date.now().toString().slice(-8)}`;
  37 |         await addcontactdata.usercontactdetails()
  38 |         await addcontactdata.organisationDetailsandWhatsAppFax()
  39 |         await addcontactdata.uploadCompanyLogocontact()
  40 |         await addcontactdata.addaddress('India', 'Karnataka')
  41 |         await addcontactdata.Addthemoredetails(mobileNumber)
  42 |         await addcontactdata.savecontact()
  43 |         await expect(page.locator('tbody tr')).toBeVisible()
  44 |   });
  45 | test('@sanity Add contact with create tag in in contact screen ', async ({ page }) => {
  46 |      const mobileNumber = `98${Date.now().toString().slice(-8)}`;
  47 |      const taglable = genTag()
  48 |         await addcontactdata.usercontactdetails()
  49 |         await addcontactdata.organisationDetailsandWhatsAppFax()
  50 |         await addcontactdata.uploadCompanyLogocontact()
  51 |         await addcontactdata.addaddress('India', 'Karnataka')
  52 |         await addcontactdata.Addthemoredetails(mobileNumber)
  53 |         await addcontactdata.addnewtag(taglable)
  54 |         await addcontactdata.savecontact()
  55 |         await expect(page.locator('tbody tr')).toBeVisible()
  56 | })
  57 | test.only('@sanity Add public contact with all details ', async ({ page }) => {
  58 |      const mobileNumber = `98${Date.now().toString().slice(-8)}`;
  59 |      const taglable = genTag()
  60 |         await addcontactdata.usercontactdetails()
  61 |         await page.pause()
  62 |         await addcontactdata.organisationDetailsandWhatsAppFax()
  63 |         await addcontactdata.uploadCompanyLogocontact()
  64 |         await addcontactdata.addaddress('India', 'Karnataka')
  65 |         await addcontactdata.Addthemoredetails(mobileNumber)
  66 |         await addcontactdata. selectccontactprivacyPublic()
  67 |         await addcontactdata.addnewtag(taglable)
  68 |         await addcontactdata.savecontact()
> 69 |         await expect(page.locator('tbody tr')).toBeVisible()
     |                                                ^ Error: expect(locator).toBeVisible() failed
  70 | })
  71 | 
  72 | });
```