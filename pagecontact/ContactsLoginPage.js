import { expect } from '@playwright/test'
export class ContactsLoginPage {
  constructor(page) {
    this.page = page;
    
    // Login
    this.workEmailInput = page.getByRole('textbox', { name: 'Work email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });


    //Logout
    this.openlogoutmenu = page.getByRole('button', { name: 'Open account menu' })
    this.selectLogoutButton = page.getByRole('menuitem', { name: 'Sign out' })
    this.viewSignInScreen = page.getByRole('heading', { name: 'Sign in to your account' })


  }

  async goto() {
    await this.page.goto('https://contacts-app-qa.idsinternal.com/login', { waitUntil: 'networkidle', timeout: 60000 });
    await expect(this.page).toHaveURL(/login/, { timeout: 60000 });
  }

  async login(email, password = 'Password@123') {
    await this.workEmailInput.fill(email);
    await this.continueButton.click();
    await this.passwordInput.fill(password);
    
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }),
      this.signInButton.click()
    ]);
    await expect(this.page.getByRole('heading', { name: 'Contacts' })).toBeVisible({ timeout: 60000 });
  }

  async logout() {
    await this.openlogoutmenu.click();
    await expect(this.selectLogoutButton).toBeVisible();
    await this.selectLogoutButton.click();
    await expect(this.viewSignInScreen).toBeVisible({timeout: 5000});
  }
}
