// Helper functions for Mailpit email retrieval and activation URL extraction
import { expect } from '@playwright/test';
export async function getActivationUrl(page, email, options = {}) {
  const base = options.mailpitBase || 'https://mailpit-dev.idsinternal.com';
  const api = `${base}/api/v1/messages`;

  const response = await page.request.get(api);
  const data = await response.json();

  const message = data.messages.find(msg =>
    msg.To?.some(to => to.Address?.trim().toLowerCase() === String(email).trim().toLowerCase())
  );
  //  console.log('Matched Email Found:', message);

  if (!message) {
    throw new Error('Email not found for move for email: ' + email);
  }
  

  const messageDetails = await page.request.get(
    `${base}/api/v1/message/${message.ID}`
  );
  const body = await messageDetails.json();
  const html = String(body.HTML || '');

  const regex = options.regex || /https:\/\/contacts-app-qa\.idsinternal\.com\/[^"]+/;
  const match = html.match(regex);
  if (!match) {
    throw new Error('Activation link not found');
  }

  return match[0];
}

export async function activateFromMail(page, email, password = 'Password@123', options = {}) {
  const activationUrl = await getActivationUrl(page, email, options);
  await page.goto(activationUrl);
  await page.locator('#password').fill(password);
  await page.locator('#password_confirm').fill(password);
  await page.getByRole('button', { name: 'Activate account' }).click();
  await expect(page.getByText('Account activated')).toBeVisible({timeout :30000});
  return activationUrl;
}
export async function acceptInviteFromMail(page, email,country, userDetails = {}, options = {}) {
  const { firstName = 'Adithya', middleName = 'A', surname = 'Patils', password = 'Password@123' } = userDetails;
  const inviteUrl = await getActivationUrl(page, email, options);
  await page.goto(inviteUrl);
  await page.waitForLoadState('networkidle');

  if(country === 'INDIA') {
    await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Middle name' }).fill(middleName);
    await page.getByRole('textbox', { name: 'Surname' }).fill(surname);
  } 
  else if(country === 'USA') {
    await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last name' }).fill(surname);
  }

  //await page.getByRole('textbox', { name: 'Middle name' }).fill(middleName);
  //await page.getByRole('textbox', { name: 'Surname' }).fill(surname);
  await page.getByRole('textbox', { name: 'Password *', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm password *' }).fill(password);
  await page.getByRole('button', { name: 'Accept invite' }).click();
  await expect(page.getByText('Invite accepted')).toBeVisible({ timeout: 50000 });
  return inviteUrl;
}

export async function Logintoapplication(page,email,password = 'Password@123') {
        await page.goto('https://contacts-app-qa.idsinternal.com/login');
        await expect (page).toHaveURL(/login/,{timeout: 10000})
        //=======================Login to application========================
        await page.getByRole('textbox', { name: 'Work email' }).fill(email);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page).toHaveURL(/contacts/,{timeout: 10000});
        await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
       
       
        
}
