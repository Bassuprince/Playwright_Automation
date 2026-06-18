# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.js >> Contact Creation >> Add contact with all fields
- Location: Testcontact/contact.spec.js:24:7

# Error details

```
Error: expect.toBeVisible: Target page, context or browser has been closed
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
  15 |     this.selsctlogoutButton = page.getByRole('menuitem', { name: 'Sign out' })
  16 |     this.viewsinginscreen = page.getByRole('heading', { name: 'Sign in to your account' })
  17 | 
  18 | 
  19 |   }
  20 | 
  21 |   async goto() {
  22 |     await this.page.goto('https://contacts-app-qa.idsinternal.com/login');
  23 |      //await expect (page).toHaveURL(/login/,{timeout: 10000})
  24 |   }
  25 | 
  26 |   async login(email, password = 'Password@123') {
  27 |     await this.workEmailInput.fill(email);
  28 |     await this.continueButton.click();
  29 |     await this.passwordInput.fill(password);
  30 |     await this.signInButton.click();
  31 |     //await expect(page).toHaveURL(/contacts/,{timeout: 10000});
> 32 |     await expect(this.page.getByRole('heading', { name: 'Contacts' })).toBeVisible({timeout: 10000});
     |                                                                        ^ Error: expect.toBeVisible: Target page, context or browser has been closed
  33 |   }
  34 | 
  35 |   async logout() {
  36 |     await this.openlogoutmenu.click();
  37 |     await expect(this.selsctlogoutButton).toBeVisible();
  38 |     await this.selsctlogoutButton.click();
  39 |     await expect(this.viewsinginscreen).toBeVisible({timeout: 5000});
  40 |   }
  41 | }
  42 | 
```