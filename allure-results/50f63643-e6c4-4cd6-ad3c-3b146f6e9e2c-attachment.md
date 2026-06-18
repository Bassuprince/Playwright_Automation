# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.js >> Contact Creation >> @sanity Add contact with profile image
- Location: Testcontact/contact.spec.js:32:7

# Error details

```
Error: page.goto: net::ERR_NETWORK_CHANGED at https://contacts-app-qa.idsinternal.com/login
Call log:
  - navigating to "https://contacts-app-qa.idsinternal.com/login", waiting until "networkidle"

```

# Test source

```ts
  1  | import { expect } from '@playwright/test'
  2  | export class ContactsLoginPage {
  3  |   constructor(page) {
  4  |     this.page = page;
  5  |     
  6  |     // Login
  7  |     this.workEmailInput = page.getByRole('textbox', { name: 'Work email' });
  8  |     this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  9  |     this.continueButton = page.getByRole('button', { name: 'Continue' });
  10 |     this.signInButton = page.getByRole('button', { name: 'Sign In' });
  11 | 
  12 | 
  13 |     //Logout
  14 |     this.openlogoutmenu = page.getByRole('button', { name: 'Open account menu' })
  15 |     this.selectLogoutButton = page.getByRole('menuitem', { name: 'Sign out' })
  16 |     this.viewSignInScreen = page.getByRole('heading', { name: 'Sign in to your account' })
  17 | 
  18 | 
  19 |   }
  20 | 
  21 |   async goto() {
> 22 |     await this.page.goto('https://contacts-app-qa.idsinternal.com/login', { waitUntil: 'networkidle', timeout: 60000 });
     |                     ^ Error: page.goto: net::ERR_NETWORK_CHANGED at https://contacts-app-qa.idsinternal.com/login
  23 |     await expect(this.page).toHaveURL(/login/, { timeout: 60000 });
  24 |   }
  25 | 
  26 |   async login(email, password = 'Password@123') {
  27 |     await this.workEmailInput.fill(email);
  28 |     await this.continueButton.click();
  29 |     await this.passwordInput.fill(password);
  30 |     
  31 |     await Promise.all([
  32 |       this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }),
  33 |       this.signInButton.click()
  34 |     ]);
  35 |     await expect(this.page.getByRole('heading', { name: 'Contacts' })).toBeVisible({ timeout: 60000 });
  36 |   }
  37 | 
  38 |   async logout() {
  39 |     await this.openlogoutmenu.click();
  40 |     await expect(this.selectLogoutButton).toBeVisible();
  41 |     await this.selectLogoutButton.click();
  42 |     await expect(this.viewSignInScreen).toBeVisible({timeout: 5000});
  43 |   }
  44 | }
  45 | 
```