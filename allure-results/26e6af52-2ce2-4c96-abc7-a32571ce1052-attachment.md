# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Contcats-regression.spec.js >> Contact regression tests >> Add company with complete details and validate in UI
- Location: Testcontact/Contcats-regression.spec.js:17:9

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Companies' })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - generic [ref=e5]:
        - img [ref=e6]
        - generic [ref=e11]: Contacts
      - generic [ref=e12]:
        - heading "Get your team onboarded in minutes." [level=2] [ref=e13]
        - paragraph [ref=e14]: A contacts module that runs independently of any other product on the platform — your data stays yours.
      - generic [ref=e15]: Available in US and India regions.
    - main [ref=e16]:
      - generic [ref=e18]:
        - status [ref=e19]:
          - img [ref=e20]
          - generic [ref=e23]:
            - paragraph [ref=e24]: Account activated
            - paragraph [ref=e25]: Your contacts workspace is ready. Sign in below to continue.
        - generic [ref=e26]:
          - img [ref=e28]
          - heading "Sign in to your account" [level=1] [ref=e31]
          - paragraph [ref=e32]: Sign in with your work account.
        - form "Sign in" [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]:
              - generic [ref=e36]: Work email
              - link "Forgot password?" [ref=e37] [cursor=pointer]:
                - /url: /forgot-password
            - textbox "Work email" [ref=e38]:
              - /placeholder: you@company.com
          - button "Continue" [disabled]
        - paragraph [ref=e39]:
          - text: Don't have an account?
          - link "Sign up" [ref=e40] [cursor=pointer]:
            - /url: /onboarding
  - region "Notifications alt+T"
```

# Test source

```ts
  1   | import { expect } from '@playwright/test'
  2   | export class ContactAddcompanyPage {
  3   |     constructor(page) {
  4   |         this.page = page;
  5   | 
  6   |         // Navigation
  7   |         this.companyMenuIcon = page.getByRole('link', { name: 'Companies' })
  8   |         // Messages
  9   |         this.noCompaniesMessage = page.getByText('No companies yet');
  10  |         // Buttons
  11  |          this.addCompanyButton = page.getByRole('button', { name: 'Add company' });
  12  | 
  13  |         // Form Fields
  14  |        
  15  |         this.companyNameInput = page.locator('#name');
  16  |         this.industryInput = page.locator('#industry');
  17  |         this.companyCodeInput = page.locator('#company_code');
  18  |         this.foundedYearInput = page.locator('#founded_year');
  19  |         this.annualRevenueInput = page.locator('#annual_revenue');
  20  |         this.websiteInput = page.locator('#website');
  21  |         //Localization
  22  |         this.currencyDropdown = page.getByRole('combobox', { name: 'Currency' });
  23  |         this.languageDropdown = page.getByRole('combobox', { name: 'Language' });
  24  |         this.localeDropdown = page.getByRole('combobox', { name: 'Locale' });
  25  | 
  26  | 
  27  |         // Company Logo Upload
  28  |         this.companyLogoUploadInput = page.locator('input[type="file"]');
  29  |         this.usePhotoButton = page.getByRole('button', { name: 'Use photo' });
  30  |         this.useAnywayButton = page.getByRole('button', { name: 'Use anyway' });
  31  |         this.replaceLogoButton = page.getByRole('button', { name: 'Replace logo' });
  32  | 
  33  | 
  34  |         
  35  | 
  36  | 
  37  |         this.addPhoneButton = page.getByRole('button', { name: 'Add phone' });
  38  |         this.addEmailButton = page.getByRole('button', { name: 'Add email' });
  39  | 
  40  |         this.primaryPhoneIndicator = page.locator('[aria-label="Phone 1 is the primary number"]');
  41  |         this.primaryEmailIndicator = page.locator('[aria-label="Email 1 is the primary address"]');
  42  | 
  43  | 
  44  | 
  45  |         
  46  |         // Phone
  47  |         this.addPhoneButton = page.getByRole('button', { name: 'Add phone' });
  48  |         this.phoneNumberInput = page.getByRole('textbox', { name: 'Phone 1 number' });
  49  |         this.primaryPhoneIndicator = page.locator('[aria-label="Phone 1 is the primary number"]');
  50  |         // Email
  51  |         this.addEmailButton = page.getByRole('button', { name: 'Add email' });
  52  |         this.emailAddressInput = page.getByRole('textbox', { name: 'Email 1 address' });
  53  |         this.primaryEmailIndicator = page.locator('[aria-label="Email 1 is the primary address"]');
  54  |         // Billing Address
  55  |         this.billingAddressLine1Input = page.getByRole('textbox', { name: 'billing address line 1' });
  56  |         this.billingAddressLine2Input = page.getByRole('textbox', { name: 'billing address line 2' });
  57  |         this.billingCityInput = page.getByRole('textbox', { name: 'billing city' });
  58  |         // Country Dropdown
  59  |         this.billingCountryDropdown = page.locator('#addr-billing-country');
  60  |         this.countrySearchInput = page.locator('[placeholder="Search country…"]');
  61  |         this.countryListOptions = page.locator('div [data-slot="command-list"] div span');
  62  |         //Stte
  63  |         this.stateProvinceDropdown = page.getByRole('combobox', { name: 'State / Province' });
  64  | 
  65  |         // Billing Address
  66  |         this.billingPostalCodeInput = page.getByRole('textbox', { name: 'billing postal code' });
  67  | 
  68  |         // Address Tabs
  69  |         this.mailingTab = page.getByRole('tab', { name: 'Mailing' });
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
> 90  |         await this.companyMenuIcon.click();
      |                                    ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
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
  170 |         //await expect(this.addCompanyButton).toBeVisible({ timeout: 4000 })
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
```