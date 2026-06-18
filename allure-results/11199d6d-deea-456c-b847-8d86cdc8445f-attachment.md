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

Locator: getByRole('heading', { name: 'Contacts' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Contacts' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]: contacts QA (US)
  - main [ref=e6]:
    - heading "Sign in to your account" [level=1] [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e10]:
        - generic [ref=e12]: 
        - generic [ref=e13]: Your login attempt timed out. Login will start from the beginning.
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e19]: Username or email
          - textbox "Username or email" [active] [ref=e21]: rajesh1781678350880@idsinternal.com
        - generic [ref=e22]:
          - generic [ref=e24]: Password
          - generic [ref=e25]:
            - textbox "Password" [ref=e28]
            - button "Show password" [ref=e30] [cursor=pointer]:
              - generic [ref=e31]: 
          - link "Forgot Password?" [ref=e36] [cursor=pointer]:
            - /url: /realms/contacts-qa-us/login-actions/reset-credentials?client_id=contacts-spa&tab_id=EJi-Cqn8HFg&client_data=eyJydSI6Imh0dHBzOi8vY29udGFjdHMtYXBwLXFhLmlkc2ludGVybmFsLmNvbS8iLCJydCI6ImNvZGUiLCJybSI6ImZyYWdtZW50Iiwic3QiOiIyOTg1N2IxZi03OWM4LTQ1OGYtODdhMC0yZjNmMjU0MjQ5MWEifQ
        - button "Sign In" [ref=e39] [cursor=pointer]
```

# Test source

```ts
  1  | // Helper functions for Mailpit email retrieval and activation URL extraction
  2  | import { expect } from '@playwright/test';
  3  | export async function getActivationUrl(page, email, options = {}) {
  4  |   const base = options.mailpitBase || 'https://mailpit-dev.idsinternal.com';
  5  |   const api = `${base}/api/v1/messages`;
  6  | 
  7  |   const response = await page.request.get(api);
  8  |   const data = await response.json();
  9  | 
  10 |   const message = data.messages.find(msg =>
  11 |     msg.To?.some(to => to.Address?.trim().toLowerCase() === String(email).trim().toLowerCase())
  12 |   );
  13 |   //  console.log('Matched Email Found:', message);
  14 | 
  15 |   if (!message) {
  16 |     throw new Error('Email not found for move for email: ' + email);
  17 |   }
  18 |   
  19 | 
  20 |   const messageDetails = await page.request.get(
  21 |     `${base}/api/v1/message/${message.ID}`
  22 |   );
  23 |   const body = await messageDetails.json();
  24 |   const html = String(body.HTML || '');
  25 | 
  26 |   const regex = options.regex || /https:\/\/contacts-app-qa\.idsinternal\.com\/[^"]+/;
  27 |   const match = html.match(regex);
  28 |   if (!match) {
  29 |     throw new Error('Activation link not found');
  30 |   }
  31 | 
  32 |   return match[0];
  33 | }
  34 | 
  35 | export async function activateFromMail(page, email, password = 'Password@123', options = {}) {
  36 |   const activationUrl = await getActivationUrl(page, email, options);
  37 |   await page.goto(activationUrl);
  38 |   await page.locator('#password').fill(password);
  39 |   await page.locator('#password_confirm').fill(password);
  40 |   await page.getByRole('button', { name: 'Activate account' }).click();
  41 |   await expect(page.getByText('Account activated')).toBeVisible({timeout :30000});
  42 |   return activationUrl;
  43 | }
  44 | export async function acceptInviteFromMail(page, email,country, userDetails = {}, options = {}) {
  45 |   const { firstName = 'Adithya', middleName = 'A', surname = 'Patils', password = 'Password@123' } = userDetails;
  46 |   const inviteUrl = await getActivationUrl(page, email, options);
  47 |   await page.goto(inviteUrl);
  48 |   await page.waitForLoadState('networkidle');
  49 | 
  50 |   if(country === 'INDIA') {
  51 |     await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
  52 |     await page.getByRole('textbox', { name: 'Middle name' }).fill(middleName);
  53 |     await page.getByRole('textbox', { name: 'Surname' }).fill(surname);
  54 |   } 
  55 |   else if(country === 'USA') {
  56 |     await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
  57 |     await page.getByRole('textbox', { name: 'Last name' }).fill(surname);
  58 |   }
  59 | 
  60 |   //await page.getByRole('textbox', { name: 'Middle name' }).fill(middleName);
  61 |   //await page.getByRole('textbox', { name: 'Surname' }).fill(surname);
  62 |   await page.getByRole('textbox', { name: 'Password *', exact: true }).fill(password);
  63 |   await page.getByRole('textbox', { name: 'Confirm password *' }).fill(password);
  64 |   await page.getByRole('button', { name: 'Accept invite' }).click();
  65 |   await expect(page.getByText('Invite accepted')).toBeVisible({ timeout: 50000 });
  66 |   return inviteUrl;
  67 | }
  68 | 
  69 | export async function Logintoapplication(page,email,password = 'Password@123') {
  70 |         await page.goto('https://contacts-app-qa.idsinternal.com/login');
  71 |         await expect (page).toHaveURL(/login/,{timeout: 10000})
  72 |         //=======================Login to application========================
  73 |         await page.getByRole('textbox', { name: 'Work email' }).fill(email);
  74 |         await page.getByRole('button', { name: 'Continue' }).click();
  75 |         await page.getByRole('textbox', { name: 'Password' }).fill(password);
  76 |         await page.getByRole('button', { name: 'Sign In' }).click();
  77 |         await expect(page).toHaveURL(/contacts/,{timeout: 10000});
> 78 |         await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible({timeout: 15000});
     |                                                                       ^ Error: expect(locator).toBeVisible() failed
  79 |        
  80 |        
  81 |         
  82 | }
  83 | 
```