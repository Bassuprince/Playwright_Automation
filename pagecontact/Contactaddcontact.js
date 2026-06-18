import { expect } from '@playwright/test'
export class Contactaddcontact {

    constructor(page) {
     
        this.page = page;
        // Navigation
        this.companyMenuIcon = page.getByRole('link', { name: 'Contacts', exact: true })
        // Messages
        // Contact Page
        this.contactsHeading = page.getByRole('heading', { name: 'Contacts' });
        this.addContactButton = page.getByRole('button', { name: 'Add Contact' });

        // Profile Image
        this.profileImageUploadInput = page.locator('input[type="file"]');
        //this.selectusephoto = page.getByRole('button', { name: 'Use photo' });
        this.usePhotoButton = page.getByRole('button', { name: 'Use photo' });
        this.uploadedImagePreview = page.getByText(/cropped\.png/i);

        // Personal Details
        
        this.selectsalutation = page.getByRole('combobox', { name: 'Salutation' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name (required)' });
        this.lastNameInput = page.locator('#last_name');
        this.middleNameInput = page.locator('#middle_name');

        // Organization Details
        this.jobTitleInput = page.locator('#job_title');
        this.departmentInput = page.locator('#department');
        this.assistantNameInput = page.locator('#assistant_name');

        // Contact Details
        this.phoneCountryDropdown = page.locator('#add-phone-0-country');
        this.indiaCountryOption = page.getByRole('option', { name: 'IN' });
        this.primaryPhoneInput = page.locator('#phones\\.0\\.value');

        // Email
        this.addEmailButton = page.getByRole('button', { name: 'Add email' });
        this.primaryEmailInput = page.locator('#emails\\.0\\.value');

        // Social Media / Communication
        this.whatsAppInput = page.locator('#whatsapp\\.value');
        this.faxInput = page.locator('#fax\\.value');

        // Address
        this.billingAddressLine1Input = page.locator('#billing_address\\.line_1');
        this.billingAddressLine2Input = page.locator('#billing_address\\.line_2');
        this.billingCityInput = page.locator('#billing_address\\.city');

        //country&state
        this.seleccountry = page.getByRole('button', { name: 'Country' })
        this.countrySearchInput = page.locator('[placeholder="Search country…"]')
        this.countryListOptions = page.locator('div [data-slot="command-list"] div span')

        this.stateProvinceDropdown = page.getByRole('combobox', { name: 'State / Province' })

        //number
        this.selectCountrycode = page.locator('[id="add-phone-0-country"]')
        this.page.getByRole('option', { name: 'IN' })
        this.selectnumber = page.locator('[id="phones.0.value"]')


        //privacy
        this.selectpublic = page.getByRole('radio', { name: 'Public Visible to everyone in' })
        this.selectprivate = page.getByRole('radio', { name: 'Private Only you and admins' })

        //more details
        this.selectlanguage = page.locator('[id="preferred_language"]')
        this.Birthdate = page.locator('[id="birthday"]')
        this.website = page.locator('[id="website"]')
        this.addnotes = page.locator('[id="notes"]')

        //Add Tag in contact
        this.AddtagButton = page.getByRole('combobox', { name: 'Add tag' })
        this.Searchtag = page.getByPlaceholder('Search or create a tag…')
        this.selectaddButton = page.getByText('Create new tag')
       // this.taglist = page.locator('[data-slot="command-item"]')

        //save
        this.saveButton = page.getByRole('button', { name: 'Save' })

        //Delete
        this.sendtoTrash = page.getByRole('menuitem', { name: 'Send to Trash' })
        this.movetoTrash = page.getByRole('heading', { name: 'Move to Trash?' })
        this.selectmovetoTrashButton = page.getByRole('button', { name: 'Move to Trash' })

    }
    async usercontactdetails() {
        await this.companyMenuIcon.click()
        //await expect(this.contactsHeading ).toBeVisible();
        await this.addContactButton.click();

        await this.selectsalutation.click()
        await this.page.getByRole('option', { name: 'Mr', exact: true }).click();
        await this.firstNameInput.fill('Basava');
        await this.lastNameInput.fill('Raj');
        await this.middleNameInput.fill('K');
    }
    async organisationDetailsandWhatsAppFax() {
        await this.jobTitleInput.fill('Software Engineer');
        await this.departmentInput.fill('Engineering');
        await this.assistantNameInput.fill('Suresh');

        await this.whatsAppInput.fill('+12365895623');
        await this.faxInput.fill('+12763452652');
    }
    async uploadCompanyLogocontact(){
        await this.profileImageUploadInput.setInputFiles('TestData/Profilelogo.png');
        await expect(this.usePhotoButton).toBeVisible();
        await this.usePhotoButton.click()
        await expect(this.uploadedImagePreview).toBeVisible();
    }
    async addaddress(country, stateName) {
        await this.billingAddressLine1Input.fill('Balmata Road')
        await this.billingAddressLine2Input.fill('Mangalore')
        await this.billingCityInput.fill('Managalore')

        await this.seleccountry.click();
        await this.countrySearchInput.fill(country);
        const countrylist = this.countryListOptions
        for (let i = 0; i < await countrylist.count(); i++) {
            const selectcountry = await countrylist.nth(i).textContent();
            if (selectcountry?.trim() === country) {
                await countrylist.nth(i).click();
                break;
            }
        }

        await this.stateProvinceDropdown.click();
        const option = this.page.getByRole('option', { name: stateName });
        await option.scrollIntoViewIfNeeded();
        await option.click();
    }
    async Addthemoredetails(number){
        await this.selectCountrycode.click()
        await this.page.getByRole('option', { name: 'IN' }).click();
        await this.selectnumber.fill(number);
        await this.selectlanguage.fill('English');
        await this.Birthdate.fill('1990-01-01');
        await this.website.fill('https://ultimateqa.com');
        await this.addnotes.fill('This is a test contact');
    }

    async selectccontactprivacyPublic(){
        await this.selectpublic.click()
    }
    async addnewtag(taglabel){
       await this.AddtagButton.click()
       await this.Searchtag.fill(taglabel)
       await this.selectaddButton.click()
       //await this.taglist.filter({hasText:taglabel}).click()

        }
    async savecontact(){
        await this.saveButton.click();
        await expect(this.saveButton).toBeHidden({ timeout: 60000 })

    }
    // Edit contact by visible name text
    async editContactByName(companyName) {
        const companyRow = this.page.locator('tbody tr').filter({ hasText: companyName });
        await expect(companyRow).toHaveCount(1);
        await companyRow.locator('[aria-label^="Edit"]').click();
        await expect(this.page.getByText('Edit Contact')).toBeVisible();
    }

    // Edit contact by mobile number or other unique identifier
    async editContactByMobile(mobileNumber) {
        const companyRow = this.page.locator('tbody tr').filter({ hasText: mobileNumber });
        await expect(companyRow).toHaveCount(1);
        await companyRow.locator('[aria-label^="Edit"]').click();
        await expect(this.page.getByRole('heading', { name: 'Edit Contact' })).toBeVisible();
    }
   
    async deleteContact(mobileNumber) {
        const companyRow = this.page.locator('tbody tr').filter({ hasText: mobileNumber });
        await expect(companyRow).toHaveCount(1);
        await companyRow.locator('[aria-label^="More actions"]').click();
        await this.sendtoTrash.click();
        await expect(this.movetoTrash).toBeVisible();
        await this.selectmovetoTrashButton.click();
        await expect(this.page.getByText('Contact moved to Trash.')).toBeVisible({timeout:5000});
        await expect(this.addContactButton).toBeVisible({ timeout: 6000 })

    }

}
