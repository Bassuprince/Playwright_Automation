import { expect } from '@playwright/test'
export class ContactAddcompanyPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.companyMenuIcon = page.getByRole('link', { name: 'Companies' })
        // Messages
        this.noCompaniesMessage = page.getByText('No companies yet');
        // Buttons
         this.addCompanyButton = page.getByRole('button', { name: 'Add company' });

        // Form Fields
       
        this.companyNameInput = page.locator('#name');
        this.industryInput = page.locator('#industry');
        this.companyCodeInput = page.locator('#company_code');
        this.foundedYearInput = page.locator('#founded_year');
        this.annualRevenueInput = page.locator('#annual_revenue');
        this.websiteInput = page.locator('#website');
        //Localization
        this.currencyDropdown = page.getByRole('combobox', { name: 'Currency' });
        this.languageDropdown = page.getByRole('combobox', { name: 'Language' });
        this.localeDropdown = page.getByRole('combobox', { name: 'Locale' });


        // Company Logo Upload
        this.companyLogoUploadInput = page.locator('input[type="file"]');
        this.usePhotoButton = page.getByRole('button', { name: 'Use photo' });
        this.useAnywayButton = page.getByRole('button', { name: 'Use anyway' });
        this.replaceLogoButton = page.getByRole('button', { name: 'Replace logo' });


        


        this.addPhoneButton = page.getByRole('button', { name: 'Add phone' });
        this.addEmailButton = page.getByRole('button', { name: 'Add email' });

        this.primaryPhoneIndicator = page.locator('[aria-label="Phone 1 is the primary number"]');
        this.primaryEmailIndicator = page.locator('[aria-label="Email 1 is the primary address"]');



        
        // Phone
        this.addPhoneButton = page.getByRole('button', { name: 'Add phone' });
        this.phoneNumberInput = page.getByRole('textbox', { name: 'Phone 1 number' });
        this.primaryPhoneIndicator = page.locator('[aria-label="Phone 1 is the primary number"]');
        // Email
        this.addEmailButton = page.getByRole('button', { name: 'Add email' });
        this.emailAddressInput = page.getByRole('textbox', { name: 'Email 1 address' });
        this.primaryEmailIndicator = page.locator('[aria-label="Email 1 is the primary address"]');
        // Billing Address
        this.billingAddressLine1Input = page.getByRole('textbox', { name: 'billing address line 1' });
        this.billingAddressLine2Input = page.getByRole('textbox', { name: 'billing address line 2' });
        this.billingCityInput = page.getByRole('textbox', { name: 'billing city' });
        // Country Dropdown
        this.billingCountryDropdown = page.locator('#addr-billing-country');
        this.countrySearchInput = page.locator('[placeholder="Search country…"]');
        this.countryListOptions = page.locator('div [data-slot="command-list"] div span');
        //Stte
        this.stateProvinceDropdown = page.getByRole('combobox', { name: 'State / Province' });

        // Billing Address
        this.billingPostalCodeInput = page.getByRole('textbox', { name: 'billing postal code' });

        // Address Tabs
        this.mailingTab = page.getByRole('tab', { name: 'Mailing' });
        this.headquartersTab = page.getByRole('tab', { name: 'Headquarters' });

        // Checkboxes
        this.sameAsBillingAddressCheckbox = page.getByRole('checkbox', { name: 'Same as billing address' });

        // Buttons
        this.createCompanyButton = page.getByRole('button', { name: 'Create company' });

        //this.editCompanyButton = page.locator('[aria-label^="Edit"]')
        this.saveButton = page.getByRole('button', { name: 'Save' })

        // Delete Company
       // this.deleteCompanyButton = page.locator('[aria-label^="Delete"]');
        this.moveToTrashButton = page.getByRole('button', { name: 'Move to Trash' })



    }

    async Addcompanydetails(companyName,companycode) {
        await this.companyMenuIcon.click();
        //await expect(this.noCompaniesMessage).toBeVisible();

        await this.addCompanyButton .click();

        
        await this.companyNameInput.fill(companyName);
        await this.industryInput.fill('Software');
        await this.companyCodeInput.fill(companycode);
        await this.foundedYearInput.fill('2010');
        await this.annualRevenueInput.fill('1000000');
        await this.websiteInput.fill('https://ultimateqa.com');
    }
    async LocalizationSection() {
        await this.currencyDropdown.click();
        await this.page.getByRole('option', { name: 'USD — United States Dollar' }).click()
        await this.languageDropdown.click();
        await this.page.getByRole('option', { name: 'English' }).click();
        await this.localeDropdown.click();
        await this.page.getByRole('option', { name: 'English (United States) — en-US' }).click();
    }
    async uploadCompanyLogo() {
        //await companyPage.uploadCompanyLogo('TestData/Company.jpeg');
        await this.companyLogoUploadInput.setInputFiles('TestData/Company.jpeg');
        await this.usePhotoButton.click();
        await this.useAnywayButton.click();
        await expect(this.replaceLogoButton).toBeVisible();
    }
    getPhoneNumberInput(index) {
        return this.page.getByRole('textbox', {
            name: `Phone ${index} number`
        });
    }
    async addPhone(phoneNumber, index = 1) {
        await this.addPhoneButton.click();
        await this.getPhoneNumberInput(index).fill(phoneNumber);
    }
    getEmailAddressInput(index) {
        return this.page.getByRole('textbox', {
            name: `Email ${index} address`
        });
    }
    async addEmail(email, index = 1) {
        await this.addEmailButton.click();
        await this.getEmailAddressInput(index).fill(email);
    }
   
    async companyAddaddress(countryName, stateName) {
        await this.billingAddressLine1Input.fill('Managalore');
        await this.billingAddressLine2Input.fill('Balmata Road');
        await this.billingCityInput.fill('Managlore');
        await this.billingCountryDropdown.click();
        await this.countrySearchInput.fill(countryName);
        const options = this.countryListOptions;

        for (let i = 0; i < await options.count(); i++) {
            const text = await options.nth(i).textContent();

            if (text?.trim() === countryName) {
                await options.nth(i).click();
                break;
            }
        }
        /*
        await this.stateProvinceDropdown.click();
        const option = this.page.getByRole('option', { name: stateName });
        await option.scrollIntoViewIfNeeded();
        await option.click();
        */
        await this.billingPostalCodeInput.fill('678765');

        await this.mailingTab.click()
        await this.sameAsBillingAddressCheckbox.check()
        await this.headquartersTab.click()
        await this.sameAsBillingAddressCheckbox.check()

    }
    async saveCompany() {
        await this.createCompanyButton.click();
        await expect(this.createCompanyButton).toBeHidden({ timeout: 8000 });
        //await expect(this.addCompanyButton).toBeVisible({ timeout: 4000 })

    }
    async EditCompany(companyName) {
        const companyRow = this.page.locator('tbody tr').filter({ hasText: companyName });
        await companyRow.scrollIntoViewIfNeeded();
        await expect(companyRow).toHaveCount(1);
        await companyRow.locator('[aria-label^="Edit"]').click();
        await expect(this.page.getByText('Edit company')).toBeVisible();
    }
    async clickSaveButton() {
        await this.saveButton.click();
        await expect(this.saveButton).toBeHidden({ timeout: 5000 });
    }
    // Confirmation Message (dynamic)
    async deleteCompany(companyName) {
        const companyRow = this.page.locator('tbody tr').filter({ hasText: companyName });
        await companyRow.scrollIntoViewIfNeeded();
        await expect(companyRow).toHaveCount(1);
        await companyRow.locator('[aria-label^="Delete"]').click()
        await expect(this.page.getByText(`Move "${companyName}" to Trash?`)).toBeVisible({ timeout: 5000 });
        await this.moveToTrashButton.click()
        await expect(this.moveToTrashButton).toBeHidden({ timeout: 6000 })
        await expect(this.addCompanyButton ).toBeVisible({ timeout: 6000 })
        //await expect(this.page.getByText('No companies yet')).toBeVisible();
    }
}



