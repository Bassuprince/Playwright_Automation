# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Contcats-regression.spec.js >> Contact regression tests >> Add company with complete details and validate in UI
- Location: Testcontact/Contcats-regression.spec.js:17:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Add company' })
Expected: visible
Timeout: 4000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 4000ms
  - waiting for getByRole('button', { name: 'Add company' })

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
          - generic [ref=e101]:
            - generic [ref=e102]:
              - heading "Companies" [level=1] [ref=e103]
              - paragraph [ref=e104]: Click a row to view details.
            - generic [ref=e105]:
              - button "Import" [ref=e106]:
                - img
                - text: Import
              - button "Export" [ref=e107]:
                - img
                - text: Export
              - button "Add company" [ref=e108]:
                - img
                - text: Add company
          - generic [ref=e110]:
            - generic [ref=e111]:
              - generic "Focus search input" [ref=e112]:
                - img [ref=e113]
              - searchbox "Search companies" [ref=e116]
            - combobox "Sort companies" [ref=e117]:
              - generic: Name (A–Z)
              - img
          - generic [ref=e118]:
            - table "Companies" [ref=e119]:
              - rowgroup [ref=e120]:
                - row "Select all on this page Name Industry Website Country Linked contacts Actions" [ref=e121]:
                  - columnheader "Select all on this page" [ref=e122]:
                    - checkbox "Select all on this page" [ref=e123] [cursor=pointer]
                  - columnheader "Name" [ref=e124]
                  - columnheader "Industry" [ref=e125]
                  - columnheader "Website" [ref=e126]
                  - columnheader "Country" [ref=e127]
                  - columnheader "Linked contacts" [ref=e128]
                  - columnheader "Actions" [ref=e129]
              - rowgroup [ref=e130]:
                - row "Select IDS-Internal30JJ IDS-Internal30JJ Software https://ultimateqa.com India 0 Edit IDS-Internal30JJ Delete IDS-Internal30JJ" [ref=e131] [cursor=pointer]:
                  - cell "Select IDS-Internal30JJ" [ref=e132]:
                    - checkbox "Select IDS-Internal30JJ" [ref=e133]
                  - cell "IDS-Internal30JJ" [ref=e134]:
                    - generic [ref=e135]:
                      - generic [ref=e136]: I
                      - generic "IDS-Internal30JJ" [ref=e137]
                  - cell "Software" [ref=e138]
                  - cell "https://ultimateqa.com" [ref=e139]:
                    - generic "https://ultimateqa.com" [ref=e140]
                  - cell "India" [ref=e141]
                  - cell "0" [ref=e142]
                  - cell "Edit IDS-Internal30JJ Delete IDS-Internal30JJ" [ref=e143]:
                    - generic [ref=e144]:
                      - button "Edit IDS-Internal30JJ" [ref=e145]:
                        - img
                      - button "Delete IDS-Internal30JJ" [ref=e146]:
                        - img
            - paragraph [ref=e148]: 1 company
  - region "Notifications alt+T":
    - list:
      - listitem [ref=e149]:
        - button "Close toast" [ref=e150] [cursor=pointer]:
          - img [ref=e151]
        - img [ref=e155]
        - generic [ref=e158]: Company created successfully.
```

# Test source

```ts
  70  |         this.headquartersTab = page.getByRole('tab', { name: 'Headquarters' });
  71  | 
  72  |         // Checkboxes
  73  |         this.sameAsBillingAddressCheckbox = page.getByRole('checkbox', { name: 'Same as billing address' });
  74  | 
  75  |         // Buttons
  76  |         this.createCompanyButton = page.getByRole('button', { name: 'Create company' });
  77  | 
  78  |         //this.editCompanyButton = page.locator('[aria-label^="Edit"]')
  79  |         this.saveButton = page.getByRole('button', { name: 'Save' })
  80  | 
  81  |         // Delete Company
  82  |        // this.deleteCompanyButton = page.locator('[aria-label^="Delete"]');
  83  |         this.moveToTrashButton = page.getByRole('button', { name: 'Move to Trash' })
  84  | 
  85  | 
  86  | 
  87  |     }
  88  | 
  89  |     async Addcompanydetails(companyName,companycode) {
  90  |         await this.companyMenuIcon.click();
  91  |         //await expect(this.noCompaniesMessage).toBeVisible();
  92  | 
  93  |         await this.addCompanyButton .click();
  94  | 
  95  |         
  96  |         await this.companyNameInput.fill(companyName);
  97  |         await this.industryInput.fill('Software');
  98  |         await this.companyCodeInput.fill(companycode);
  99  |         await this.foundedYearInput.fill('2010');
  100 |         await this.annualRevenueInput.fill('1000000');
  101 |         await this.websiteInput.fill('https://ultimateqa.com');
  102 |     }
  103 |     async LocalizationSection() {
  104 |         await this.currencyDropdown.click();
  105 |         await this.page.getByRole('option', { name: 'USD — United States Dollar' }).click()
  106 |         await this.languageDropdown.click();
  107 |         await this.page.getByRole('option', { name: 'English' }).click();
  108 |         await this.localeDropdown.click();
  109 |         await this.page.getByRole('option', { name: 'English (United States) — en-US' }).click();
  110 |     }
  111 |     async uploadCompanyLogo() {
  112 |         //await companyPage.uploadCompanyLogo('TestData/Company.jpeg');
  113 |         await this.companyLogoUploadInput.setInputFiles('TestData/Company.jpeg');
  114 |         await this.usePhotoButton.click();
  115 |         await this.useAnywayButton.click();
  116 |         await expect(this.replaceLogoButton).toBeVisible();
  117 |     }
  118 |     getPhoneNumberInput(index) {
  119 |         return this.page.getByRole('textbox', {
  120 |             name: `Phone ${index} number`
  121 |         });
  122 |     }
  123 |     async addPhone(phoneNumber, index = 1) {
  124 |         await this.addPhoneButton.click();
  125 |         await this.getPhoneNumberInput(index).fill(phoneNumber);
  126 |     }
  127 |     getEmailAddressInput(index) {
  128 |         return this.page.getByRole('textbox', {
  129 |             name: `Email ${index} address`
  130 |         });
  131 |     }
  132 |     async addEmail(email, index = 1) {
  133 |         await this.addEmailButton.click();
  134 |         await this.getEmailAddressInput(index).fill(email);
  135 |     }
  136 |    
  137 |     async companyAddaddress(countryName, stateName) {
  138 |         await this.billingAddressLine1Input.fill('Managalore');
  139 |         await this.billingAddressLine2Input.fill('Balmata Road');
  140 |         await this.billingCityInput.fill('Managlore');
  141 |         await this.billingCountryDropdown.click();
  142 |         await this.countrySearchInput.fill(countryName);
  143 |         const options = this.countryListOptions;
  144 | 
  145 |         for (let i = 0; i < await options.count(); i++) {
  146 |             const text = await options.nth(i).textContent();
  147 | 
  148 |             if (text?.trim() === countryName) {
  149 |                 await options.nth(i).click();
  150 |                 break;
  151 |             }
  152 |         }
  153 |         /*
  154 |         await this.stateProvinceDropdown.click();
  155 |         const option = this.page.getByRole('option', { name: stateName });
  156 |         await option.scrollIntoViewIfNeeded();
  157 |         await option.click();
  158 |         */
  159 |         await this.billingPostalCodeInput.fill('678765');
  160 | 
  161 |         await this.mailingTab.click()
  162 |         await this.sameAsBillingAddressCheckbox.check()
  163 |         await this.headquartersTab.click()
  164 |         await this.sameAsBillingAddressCheckbox.check()
  165 | 
  166 |     }
  167 |     async saveCompany() {
  168 |         await this.createCompanyButton.click();
  169 |         await expect(this.createCompanyButton).toBeHidden({ timeout: 8000 });
> 170 |         await expect(this.addCompanyButton).toBeVisible({ timeout: 4000 })
      |                                             ^ Error: expect(locator).toBeVisible() failed
  171 | 
  172 |     }
  173 |     async EditCompany(companyName) {
  174 |         const companyRow = this.page.locator('tbody tr').filter({ hasText: companyName });
  175 |         await companyRow.scrollIntoViewIfNeeded();
  176 |         await expect(companyRow).toHaveCount(1);
  177 |         await companyRow.locator('[aria-label^="Edit"]').click();
  178 |         await expect(this.page.getByText('Edit company')).toBeVisible();
  179 |     }
  180 |     async clickSaveButton() {
  181 |         await this.saveButton.click();
  182 |         await expect(this.saveButton).toBeHidden({ timeout: 5000 });
  183 |     }
  184 |     // Confirmation Message (dynamic)
  185 |     async DeletCompany(companyName) {
  186 |         const companyRow = this.page.locator('tbody tr').filter({ hasText: companyName });
  187 |         await companyRow.scrollIntoViewIfNeeded();
  188 |         await expect(companyRow).toHaveCount(1);
  189 |         await companyRow.locator('[aria-label^="Delete"]').click()
  190 |         await expect(this.page.getByText(`Move "${companyName}" to Trash?`)).toBeVisible({ timeout: 5000 });
  191 |         await this.moveToTrashButton.click()
  192 |         await expect(this.moveToTrashButton).toBeHidden({ timeout: 6000 })
  193 |         await expect(this.addCompanyButton ).toBeVisible({ timeout: 6000 })
  194 |         //await expect(this.page.getByText('No companies yet')).toBeVisible();
  195 |     }
  196 | }
  197 | 
  198 | 
  199 | 
  200 | 
```