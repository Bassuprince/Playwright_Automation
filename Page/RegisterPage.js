import { expect } from '@playwright/test';

// Page Object Model for Workspace Registration
export class RegisterPage {
  constructor(page) {
    this.page = page;
    
    // Locators for email and company
    this.emailInput = page.locator('[placeholder="you@company.com"]');
    this.companyNameInput = page.locator('[placeholder="Acme Inc."]');
    this.timeZoneButton = page.locator('[aria-label="Time zone"]');
    this.continueToSignInLink = page.getByRole('link', { name: 'Continue to sign in' });
    
    // Country radio buttons
    this.usaRadio = page.getByRole('radio', { name: 'United States Hosted in NYC1' });
    this.indiaCountryLabel = page.locator('label').filter({ hasText: 'IndiaHosted in BLR1' });
    
    // Form fields for USA
    this.usaFirstNameInput = page.locator('#admin_first_name');
    this.usaLastNameInput = page.locator('#admin_last_name');
    
    // Form fields for INDIA
    this.indiaFirstNameInput = page.locator('#admin_first_name');
    this.indiaMiddleNameInput = page.locator('#admin_middle_name');
    this.indiaSurnameInput = page.locator('#admin_surname');
    
    // Buttons
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.createWorkspaceButton = page.getByRole('button', { name: 'Create my workspace' });
    this.termsCheckbox = page.getByRole('checkbox', { name: 'I have read and agree to the' });
    this.dataProtectionCheckboxes = page.locator('[type="checkbox"]');
    
    // Headings
    this.termsHeading = page.getByRole('heading', { name: 'Terms & Privacy' });
  }




  async goto() {
    await this.page.goto('https://contacts-app-qa.idsinternal.com/');
  }

  async fillEmail(email) 
  {
    await this.emailInput.fill(email);
    console.log(`Email registered: ${email}`);
  }

  async selectCountry(country) 
  {
    if (country === 'USA') {
      await this.usaRadio.click();
    } else if (country === 'INDIA') {
      await this.indiaCountryLabel.click();
    }
  }

  async selectTimeZone(timezone = 'Africa/Abidjan')
   {
    await this.timeZoneButton.click();
    await this.page.getByRole('option', { name: timezone }).click();
  }

  async fillCompanyName(name = 'RTT') 
  {
    await this.companyNameInput.fill(name);
  }

  async registerUSA(firstName = 'Rajesh', lastName = 'R') 
  {
    await this.usaFirstNameInput.fill(firstName);
    await this.usaLastNameInput.fill(lastName);
    
    await this.continueButton.isEnabled();
    await this.continueButton.click();

    //====Privacy policy====
    await this.termsHeading.isVisible();
    await this.termsCheckbox.check();
    await this.createWorkspaceButton.click();
  }

  async registerINDIA(firstName = 'Rajesh', middleName = 'R', surname = 'ghgh') 
  {
    await this.indiaFirstNameInput.fill(firstName);
    await this.indiaMiddleNameInput.fill(middleName);
    await this.indiaSurnameInput.fill(surname);
    
    await this.expectContinueEnabled();
    await this.clickContinue();
    
    // Data protection
    await this.expectContinueDisabled();
    await this.dataProtectionCheckboxes.check();
    await this.expectContinueEnabled();
    await this.clickContinue();
    
    // Privacy policy
    await this.expectCreateWorkspaceDisabled();
    await this.dataProtectionCheckboxes.check();
    await this.expectCreateWorkspaceEnabled();
    await this.clickCreateWorkspace();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCreateWorkspace() {
    await this.createWorkspaceButton.click();
  }

  async expectContinueEnabled() {
    await expect(this.continueButton).toBeEnabled();
  }

  async expectContinueDisabled() {
    await expect(this.continueButton).toBeDisabled();
  }

  async expectCreateWorkspaceDisabled() {
    await expect(this.createWorkspaceButton).toBeDisabled();
  }

  async expectCreateWorkspaceEnabled() {
    await expect(this.createWorkspaceButton).toBeEnabled();
  }



  async completeRegistration(country, email, firstName = 'Rajesh', lastNameOrMiddle = 'R', surname = 'ghgh')
   {
    await this.fillEmail(email);
    await this.selectCountry(country);
    await this.selectTimeZone();
    await this.fillCompanyName();
    
    if (country === 'USA') {
      await this.registerUSA(firstName, lastNameOrMiddle);
    } else if (country === 'INDIA') {
      await this.registerINDIA(firstName, lastNameOrMiddle, surname);
    }
    
    await this.continueToSignInLink.isVisible();
    await this.continueToSignInLink.click();
  }
}
