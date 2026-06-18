import { test, expect } from '@playwright/test';
import { registerWorkspace } from '../Util_files_caf/Contactregister';
import { getActivationUrl,activateFromMail } from '../Util_files_caf/mailpitHelper';
test.describe('Contacts Application - End to End Flow', () => {
 test.describe.configure({ mode: 'serial' });
  test.setTimeout(60000);
  const email = `rajesh${Date.now()}@example.com`;
  const memberEmail = `Basava${Date.now()}@example.com`;

  test("should register a new workspace successfully", async ({ browser }) => {
    const targetNumber = "+917634526178";
    const context = await browser.newContext();
    const page = await context.newPage()

    await page.goto('https://contacts-app-qa.idsinternal.com/')
    await page.getByRole('link', { name: 'Start your workspace' }).first().click();
    await page.waitForLoadState('networkidle');
    await registerWorkspace(page, 'INDIA', email);
   // await getActivationUrl(page, email);
  //  await activateFromMail(page, email);


    //====================Mailpit API call========================
    const response = await page.request.get('https://mailpit-dev.idsinternal.com/api/v1/messages');
    

    const data = await response.json();

    //=====================Find matching email========================
    const message = data.messages.find(msg =>
      msg.To[0].Address === email
    );


    if (!message) {
      throw new Error('Email not found');
    }

    //=====================Get email details========================
    const messageDetails = await page.request.get(
      `https://mailpit-dev.idsinternal.com/api/v1/message/${message.ID}`
    );

    const body = await messageDetails.json();

    //================Extract activation URL from email body====================
    const html = body.HTML;

    const match = html.match(
      /https:\/\/contacts-app-qa\.idsinternal\.com\/activate\/[^\"]+/
    );

    if (!match) {
      throw new Error('Activation link not found');
    }

    const activationUrl = match[0];
    console.log(activationUrl);
    //======================Open activation page========================
    await page.goto(activationUrl);

    await page.locator('#password').fill('Password@123')
    await page.locator('#password_confirm').fill('Password@123')
    await page.getByRole('button', { name: 'Activate account' }).click()
    await page.context().close();

  });
  test('should allow Admin to login successfully', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://contacts-app-qa.idsinternal.com/login')

    //=======================Login to application========================
    await page.getByRole('textbox', { name: 'Work email' }).fill(email);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
   //====================Logout from application========================
    await page.getByRole('button', { name: 'Open account menu' }).click();
    await expect(page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    await context.close();
  })

  test('should create edit and delete a contact successfully', async ({ browser }) => {
    const targetNumber = "+917634526178";
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://contacts-app-qa.idsinternal.com/login')

    //=======================Login to application========================
    await page.getByRole('textbox', { name: 'Work email' }).fill(email);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    //=====================Add contact========================
    await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Contact' }).click();
    // await page.getByRole('button', { name: 'Upload photo' }).setInputFiles('3135715.png');
    await page.getByRole('textbox', { name: 'First name (required)' }).fill('Rajesh');
    await page.locator('[id="add-phone-0-country"]').click();
    await page.getByRole('option', { name: 'IN' }).click();
    await page.locator('[id="phones.0.value"]').fill('+917634526178');
    // await page.getByRole('textbox', { name: 'Number', exact: true }).fill('+917634526178');
    await page.getByRole('button', { name: 'Save' }).click();


    //=========Edit contact========================

    // await page.getByRole('button', { name: 'Edit Rajesh' }).click();
    //await page.locator('button[aria-label="Edit jghkh"]').click(); // dynamic elements change every time, so we can use aria-label with partial text match  
    //await page.getByRole('button', { name: /Edit/i }).click();
    await page.locator('[aria-label^="Edit"]').click(); // partial match with starts with
    await expect(page.getByText('Edit Contact')).toBeVisible();
    await page.getByRole('textbox', { name: 'First name (required)' }).fill('Rajesha');
    await page.locator('[id="edit-phone-0-value"]').fill(targetNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Contact updated successfully.')).toBeVisible();


    //====================Move contact to trash========================
    //await page.getByRole('button', { name: /More actions/i },).click();
    // await page.locator('[aria-label="More actions for jghkh"]').click();   // dynamic elements change every time, so we can use aria-label with partial text match
    await page.locator('[aria-label^="More actions"]').click();              // partial match with starts with

    //await page.locator('[aria-labelledby="radix-_r_7d_"]').waitFor(); // wait for menu to appear

    await expect(page.getByRole('menuitem', { name: 'Send to Trash' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Send to Trash' }).click();

    await expect(page.getByText("Move to Trash?")).toBeVisible();
    await page.getByRole('button', { name: 'Move to Trash' }).click();



    //====================Verify contact in trash========================

    await page.locator('a .lucide-trash-2').click();
    await expect(page.locator('tbody tr').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Trash' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Contacts' })).toBeVisible();

    const row = page.locator('tbody tr')
    for (let i = 0; i < await row.count(); i++) {
      const getNumber = await row.nth(i).locator('td').nth(2).textContent();
      if (getNumber?.trim() === targetNumber) {
        console.log('Contact found in trash:' + getNumber);
        await row.nth(i).getByRole('button', { name: 'Restore' }).click();
        break;
      }
    }
    await page.getByRole('button', { name: 'Restore' }).click();
    await page.context().close();
  });

  test('should create edit and delete a company successfully', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://contacts-app-qa.idsinternal.com/login')  


     //=======================Login to application========================
    await page.getByRole('textbox', { name: 'Work email' }).fill(email);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
    await page.getByRole('button', { name: 'Sign In' }).click();


    //====================Add company========================
    await page.locator('a .lucide.lucide-building2').click();
    await page.getByRole('button', { name: 'Add company' }).click()
    await page.locator('[id="name"]').fill('IDS Software');
    await page.locator('[id="industry"]').fill('Software');
    await page.locator('[id="company_code"]').fill('IDS123');
    await page.locator('[id="founded_year"]').fill('2010');
    await page.locator('[id="annual_revenue"]').fill('1000000');
     await page.locator('[id="website"]').fill('https://ultimateqa.com');

    await page.getByRole('button', { name: 'Add phone' }).click();
    await page.getByRole('textbox', { name: 'Phone 1 number' }).fill('+17373848458');
    await page.getByRole('radio', { name: 'Phone 1 is primary' }).check();
    await page.getByRole('button', { name: 'Add email' }).click();
    await page.getByRole('textbox', { name: 'Email 1 address' }).fill('IDS@example.com');
    await page.getByRole('radio', { name: 'Email 1 is primary' }).check();
    // await page.getByRole('button', { name: 'Upload logo' }).setInputFiles('3135715.png');
    await page.getByRole('textbox', { name: 'billing address line 1' }).fill('Managalore');
    await page.getByRole('textbox', { name: 'billing address line 2' }).fill('Balmata Road');
    await page.getByRole('textbox', { name: 'billing city' }).fill('Managlore');
    await page.getByRole('textbox', { name: 'billing state' }).fill('Karnataka');
    await page.getByRole('textbox', { name: 'billing postal code' }).fill('678765');
    await page.getByRole('tab', { name: 'Mailing' }).click();
    await page.getByRole('checkbox', { name: 'Same as billing address' }).check();
    await page.getByRole('tab', { name: 'Headquarters' }).click();
    await page.getByRole('checkbox', { name: 'Same as billing address' }).check();
    await page.getByRole('button', { name: 'Create company' }).click();

    //====================Edit company creation========================
    await page.locator('[aria-label^="Edit"]').click();
    await expect(page.getByText('Edit company')).toBeVisible();
    await page.locator('[id="annual_revenue"]').fill('5000000');
    await page.locator('[id="website"]').fill('https://ultimateqaIDS.com');
    await page.getByRole('button', { name: 'Save' }).click();
    
    //====================Delete company========================
    await page.locator('[aria-label^="Delete"]').click();
    await expect(page.getByText('Move "IDS Software" to Trash?')).toBeVisible();
    await page.getByRole('button', { name: 'Move to Trash' }).click();
    await page.context().close();
  });
  test('should create and manage tags successfully', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://contacts-app-qa.idsinternal.com/login')
   
     //=======================Login to application========================
    await page.getByRole('textbox', { name: 'Work email' }).fill(email);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    //====================Add tags========================
    await page.locator('a .lucide.lucide-tag.h-4').click();
    //await expect(page.getByText('Click New Tag to create the')).toBeVisible();
    await page.getByRole('button',{name:'New Tag'}).click();
    await page.getByRole('textbox', { name: 'New tag label' }).fill('Important');
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    //await page.locator('[id="new-tag-label"]').fill('Important');
    //await expect(page.locator('.truncate.text-sm')).toBeVisible();
    await context.close();
  

  });
    
    test('should invite a new member from user management', async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage()
      await page.goto('https://contacts-app-qa.idsinternal.com/login')
      //const memberEmail = `rajesh${Date.now()}@example.com`;

       //=======================Login to application========================
      await page.getByRole('textbox', { name: 'Work email' }).fill(email);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
      await page.getByRole('button', { name: 'Sign In' }).click();
      
      //====================Navigate to user management========================
      await page.locator('a .lucide.lucide-user-cog').click();
      await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();
      await page.getByRole('button', { name: 'Invite member' }).click();
      await expect(page.getByText('Invite a member')).toBeVisible();
      await page.locator('[id="invite-email"]').fill(memberEmail);
      console.log("Invite email: " + memberEmail);
      await page.getByRole('button', { name: 'Send invite' }).click();


      //====================Mailpit API call========================
    const response = await page.request.get('https://mailpit-dev.idsinternal.com/api/v1/messages');
    


    const data = await response.json();

    //=====================Find matching email========================
    const message = data.messages.find(msg =>
    msg.To?.some(to =>
      to.Address?.trim().toLowerCase() === memberEmail.trim().toLowerCase()
    )
  );


    if (!message) {
      throw new Error('Email not found');
    }

    //=====================Get email details========================
const messageDetails = await page.request.get(
  `https://mailpit-dev.idsinternal.com/api/v1/message/${message.ID}`
);

const body = await messageDetails.json();

// Convert safely to string
const html = String(body.HTML);

// Debug actual email content
//console.log(html);

// Match any contacts-app URL
const match = html.match(
  /https:\/\/contacts-app-qa\.idsinternal\.com\/[^\s"]+/ 
);

if (!match) {
  throw new Error('Activation link not found');
}

const activationUrl = match[0];

console.log('Activation URL:', activationUrl);

await page.goto(activationUrl);
    //====================Complete member registration========================
  await page.getByRole('textbox', { name: 'First name' }).fill('Adithya');
  await page.getByRole('textbox', { name: 'Middle name' }).fill('A');
  await page.getByRole('textbox', { name: 'Surname' }).fill('Patils');
  await page.getByRole('textbox', { name: 'Password *', exact: true }).fill('Password@123');
  await page.getByRole('textbox', { name: 'Confirm password *' }).fill('Password@123');
  await page.getByRole('button', { name: 'Accept invite' }).click();
  await page.context().close();



});

test('should allow invited member to login successfully', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://contacts-app-qa.idsinternal.com/login')

   //=======================Login to application========================
  await page.getByRole('textbox', { name: 'Work email' }).fill(memberEmail);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await context.close();
});

  test('should allow invited member to create a contact successfully', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://contacts-app-qa.idsinternal.com/login')

    //=======================Login to application========================
    await page.getByRole('textbox', { name: 'Work email' }).fill(memberEmail);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    //=====================Add contact========================
    await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Contact' }).click();
    // await page.getByRole('button', { name: 'Upload photo' }).setInputFiles('3135715.png');
    await page.getByRole('textbox', { name: 'First name (required)' }).fill('Rajesh');
    await page.locator('[id="add-phone-0-country"]').click();
    await page.getByRole('option', { name: 'IN' }).click();
    await page.locator('[id="phones.0.value"]').fill('+917634526178');
    // await page.getByRole('textbox', { name: 'Number', exact: true }).fill('+917634526178');
    await page.getByRole('button', { name: 'Save' }).click();
    await context.close();


});
})





// removed stray top-level await expect.poll — tests should use test(...) blocks