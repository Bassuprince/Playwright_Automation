import { test, expect } from '@playwright/test';
import { registerWorkspace } from '../Util_files_caf/Contactregister';
import { getActivationUrl, activateFromMail, acceptInviteFromMail, Logintoapplication } from '../Util_files_caf/mailpitHelper';
import { log } from 'node:console';

test.describe('Contacts Application - End to End Flow', () => {
    test.describe.configure({ mode: 'serial' });
    test.setTimeout(60000);
    const email = `testuser_${Date.now()}@example.com`;
    const memberEmail = `Basava${Date.now()}@example.com`
    test('should allow Admin to register and activate account successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://contacts-app-qa.idsinternal.com/');
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Start your workspace' }).first().click();
        await page.waitForLoadState('networkidle');
        await registerWorkspace(page,'USA', email);
        await getActivationUrl(page, email);
        await activateFromMail(page, email);
        await context.close();
    });
    test(' should allow Admin to login & logout successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await Logintoapplication(page, email);
        // await expect(page).toHaveURL(/contacts-app-qa\.idsinternal\.com\/?$/);
        await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();

        //====================Logout from application========================
        await page.getByRole('button', { name: 'Open account menu' }).click();
        await expect(page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();
        await page.getByRole('menuitem', { name: 'Sign out' }).click();
        await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
        await context.close();

    });
    test('should create edit and delete a company successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await Logintoapplication(page, email);
        //====================Add company========================
        await page.locator('a .lucide.lucide-building2').click();
        await expect(page.getByText('No companies yet')).toBeVisible();
        await page.getByRole('button', { name: 'Add company' }).click()
        await page.locator('[id="name"]').fill('IDS Software');
        await page.locator('[id="industry"]').fill('Software');
        await page.locator('[id="company_code"]').fill('IDS123');
        await page.locator('[id="founded_year"]').fill('2010');
        await page.locator('[id="annual_revenue"]').fill('1000000');
        await page.locator('[id="website"]').fill('https://ultimateqa.com');


        //usa
      //  await page.getByRole('button', { name: 'Add tax identifier' }).click();
       // await page.getByRole('textbox', { name: 'Tax identifier 1 value' }).fill('12-3456789');

        await page.getByRole('button', { name: 'Add phone' }).click();
        await page.getByRole('textbox', { name: 'Phone 1 number' }).fill('+17373848458');
        //await page.getByRole('radio', { name: 'Phone 1 is primary' }).check();
        await expect(page.locator('[aria-label="Phone 1 is the primary number"]')).toBeVisible()
        await page.getByRole('button', { name: 'Add email' }).click();
        await page.getByRole('textbox', { name: 'Email 1 address' }).fill('IDS@example.com');
        await expect(page.locator('[aria-label="Email 1 is the primary address"]')).toBeVisible()
        //await page.getByRole('radio', { name: 'Email 1 is primary' }).check();
        //=========Profile image=====

        // await page.getByRole('button', { name: 'Upload logo' }).setInputFiles('3135715.png');
        await page.getByRole('textbox', { name: 'billing address line 1' }).fill('Managalore');
        await page.getByRole('textbox', { name: 'billing address line 2' }).fill('Balmata Road');
        await page.getByRole('textbox', { name: 'billing city' }).fill('Managlore');
        await page.locator('[id="addr-billing-country"]').click()
        await page.locator('[placeholder="Search country…"]').fill('ind');
        const countrylist = page.locator('div [data-slot="command-list"] div span')


        for (let i = 0; i < await countrylist.count(); i++) {
            const country = await countrylist.nth(i).textContent();
            if (country?.trim() === 'India') {
                await countrylist.nth(i).click();
                break;
            }
        }
        /*
        await page.getByRole('combobox', { name: 'State / Province' }).click();
        const option1 =  page.getByRole('option', { name: 'Karnataka' })
        await option1.scrollIntoViewIfNeeded();
        await option1.click();
      */
        await page.getByRole('textbox', { name: 'billing postal code' }).fill('678765');
        await page.getByRole('tab', { name: 'Mailing' }).click();
        await page.getByRole('checkbox', { name: 'Same as billing address' }).check();
        await page.getByRole('tab', { name: 'Headquarters' }).click();
        await page.getByRole('checkbox', { name: 'Same as billing address' }).check();


        //=========localize company details and verify========
        await page.getByRole('combobox', { name: 'Currency' }).click();
        await page.getByLabel('USD — United States Dollar').getByText('USD — United States Dollar').click();
        await page.getByRole('combobox', { name: 'Language' }).click();
        await page.getByLabel('English').getByText('English').click();
        await page.getByRole('combobox', { name: 'Locale' }).click();
        await page.getByLabel('English (United States) — en-').getByText('English (United States) — en-').click();

        //===========upload company logo========
        //  await page.getByRole('button', { name: 'Upload logo' }).click();
        await page.locator('input[type="file"]').setInputFiles('TestData/Company.jpeg');

        await expect(page.getByRole('button', { name: 'Use photo' })).toBeVisible();
        await page.pause();
        await page.getByRole('button', { name: 'Use photo' }).click();
        await page.getByRole('button', { name: 'Use anyway' }).click();
        await expect(page.getByRole('button', { name: 'Replace logo' })).toBeVisible();


        await page.getByRole('button', { name: 'Create company' }).click();
        await expect(page.getByRole('button', { name: 'Create company' })).toBeHidden({ timeout: 6000 });

        //====================Edit company creation========================
        await page.locator('[aria-label^="Edit"]').click();
        await expect(page.getByText('Edit company')).toBeVisible();
        await page.locator('[id="annual_revenue"]').fill('5000000');
        await page.locator('[id="website"]').fill('https://ultimateqaIDS.com');
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByRole('button', { name: 'Save' })).toBeHidden({ timeout: 5000 });

        //====================Delete company========================
        await page.locator('[aria-label^="Delete"]').click();
        await expect(page.getByText('Move "IDS Software" to Trash?')).toBeVisible();
        await page.getByRole('button', { name: 'Move to Trash' }).click();
        await expect(page.getByRole('button', { name: 'Move to Trash' })).toBeHidden({ timeout: 5000 });
        await page.context().close();
    })
    test('should create and manage tags successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await Logintoapplication(page, email);
        //====================Add tags========================
        await page.locator('a .lucide.lucide-tag.h-4').click();
        //await expect(page.getByText('Click New Tag to create the')).toBeVisible();
        await page.getByRole('button', { name: 'New Tag' }).click();
        await page.getByRole('textbox', { name: 'New tag label' }).fill('Important');
        await page.getByRole('button', { name: 'Create', exact: true }).click();
        //await page.locator('[id="new-tag-label"]').fill('Important');
        //await expect(page.locator('.truncate.text-sm')).toBeVisible();
        await context.close();

    })
    test('should create edit and delete a contact successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const targetNumber = "+917634526178";
        await Logintoapplication(page, email);
        await expect(page).toHaveURL('https://contacts-app-qa.idsinternal.com/');

        //=====================Add contact========================
        await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
        await page.getByRole('button', { name: 'Add Contact' }).click();
        //=========Profile image=====
        await page.locator('input[type="file"]').setInputFiles('TestData/Profilelogo.png');
        await expect(page.getByRole('button', { name: 'Use photo' })).toBeVisible();
        await page.getByRole('button', { name: 'Use photo' }).click();
        await expect(page.getByText('cropped.png · 41 KB')).toBeVisible();

        await page.getByRole('textbox', { name: 'First name (required)' }).fill('Rajesh');
        await page.locator('[id="last_name"]').fill('Kumar');
        await page.locator('[id="middle_name"]').fill('A');
        //=====================organization details========================
        await page.locator('[id="job_title"]').fill('Software Engineer');
        await page.locator('[id="department"]').fill('Engineering');
        await page.locator('[id="assistant_name"]').fill('Suresh');
        //=====================contact details========================
        await page.locator('[id="add-phone-0-country"]').click();
        await page.getByRole('option', { name: 'IN' }).click();
        await page.locator('[id="phones.0.value"]').fill('+917634526178');
        //=====================email and other details========================
        await page.getByRole('button', { name: 'Add email' }).click();
        await page.locator('[id="emails.0.value"]').fill('RAJESH.KUMAR@EXAMPLE.COM');
        //=====================social media details========================
        await page.locator('[id="whatsapp.value"]').fill('+917634526178');
        await page.locator('[id="fax.value"]').fill('+917634526178');
        //=====================address details========================
        await page.locator('[id="billing_address.line_1"]').fill('Balmata Road');
        await page.locator('[id="billing_address.line_2"]').fill('Managalore');
        await page.locator('[id="billing_address.city"]').fill('Managalore');


        await page.getByRole('button', { name: 'Country' }).click();
        await page.locator('[placeholder="Search country…"]').fill('ind');
        const countrylist = page.locator('div [data-slot="command-list"] div span')
        for (let i = 0; i < await countrylist.count(); i++) {
            const country = await countrylist.nth(i).textContent();
            if (country?.trim() === 'India') {
                await countrylist.nth(i).click();
                break;
            }
        }
        await page.getByRole('combobox', { name: 'State / Province' }).click();
        const option = page.getByRole('option', { name: 'Karnataka' });
        await option.scrollIntoViewIfNeeded();
        await option.click();
        //=====================More details========================
        await page.locator('[id="preferred_language"]').fill('English');
        await page.locator('[id="website"]').fill('https://ultimateqa.com');
        await page.locator('[id="notes"]').fill('This is a test contact');
        await page.locator('[id="birthday"]').fill('1990-01-01');

        // await page.getByRole('textbox', { name: 'Number', exact: true }).fill('+917634526178');
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByRole('button', { name: 'Save' })).toBeHidden()

        //=========Edit contact========================
        // await page.getByRole('button', { name: 'Edit Rajesh' }).click();
        //await page.locator('button[aria-label="Edit jghkh"]').click();             // dynamic elements change every time, so we can use aria-label with partial text match  
        //await page.getByRole('button', { name: /Edit/i }).click();
        await page.locator('[aria-label^="Edit"]').click();                          // partial match with starts with
        await expect(page.getByText('Edit Contact')).toBeVisible();
        await page.getByRole('textbox', { name: 'First name (required)' }).fill('Rajesha');
        await page.locator('[id="edit-phone-0-value"]').fill(targetNumber);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('Contact updated successfully.')).toBeVisible();
    

        //====================Move contact to trash========================
        //await page.getByRole('button', { name: /More actions/i },).click();
        // await page.locator('[aria-label="More actions for jghkh"]').click();   // dynamic elements change every time, so we can use aria-label with partial text match
        await page.locator('[aria-label^="More actions"]').click();              // partial match with starts with

        await expect(page.getByRole('menuitem', { name: 'Send to Trash' })).toBeVisible();
        await page.getByRole('menuitem', { name: 'Send to Trash' }).click();
        await expect(page.getByText("Move to Trash?")).toBeVisible();
        await page.getByRole('button', { name: 'Move to Trash' }).click();
        await expect(page.getByRole('button', { name: 'Move to Trash' })).toBeHidden({ timeout: 5000 });

        //====================Verify contact in trash========================

        await page.locator('a .lucide-trash-2').click();
        await expect(page.locator('tbody tr').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Trash' })).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Contacts' })).toBeVisible();

        const row = page.locator('tbody tr').filter({ hasText: targetNumber })         //Filter with hasTesx
        console.log(row)
        await expect(row).toBeVisible();
        await row.getByRole('button', { name: /Restore/i }).click();



        /*
                const row = page.locator('tbody tr')
                for (let i = 0; i < await row.count(); i++) {
                    const getNumber = await row.nth(i).locator('td').nth(2).textContent();
                    if (getNumber?.trim() === targetNumber) {
                        console.log('Contact found in trash:' + getNumber);
                        await row.nth(i).getByRole('button', { name: '/Restore/i'}).click();
                        break;
                    }
                }
                await expect (page.getByText)
              */
        await page.getByRole('button', { name: 'Restore', exact: true }).click();
        await expect(page.getByText('Trash is empty')).toBeVisible();

        await context.close();
    })
      test('should invite a new member from user management', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await Logintoapplication(page, email);

        //====================Navigate to user management========================
        await page.locator('a .lucide.lucide-user-cog').click();
        await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();
        await page.getByRole('button', { name: 'Invite member' }).click();

        await expect(page.getByText('Invite a member')).toBeVisible();
        await page.locator('[id="invite-email"]').fill(memberEmail);
        console.log("Invite email: " + memberEmail);
        await page.getByRole('button', { name: 'Send invite' }).click();
        await expect(page.getByRole('button', { name: 'Send invite' })).toBeHidden({ timeout: 5000 });
        await expect(page.getByRole('button', { name: 'Invite member' })).toBeVisible();

        //====================Verify email invitation and complete member registration========================


        //====================Accept invite from mailpit and complete member registration========================
        await acceptInviteFromMail(page, memberEmail, "USA", { firstName: 'Adithya', middleName: 'A', surname: 'Patils', password: 'Password@123' });
        await context.close();
        //{firstName: 'Adithya',middleName: 'A', surname: 'Patils', password: 'Password@123'}
    })
    test('should allow invited member to login & logout successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await Logintoapplication(page, memberEmail);

        await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible({ timeout: 10000 });

        //====================Logout from application========================
        await page.getByRole('button', { name: 'Open account menu' }).click();
        await expect(page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();
        await page.getByRole('menuitem', { name: 'Sign out' }).click();
        await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
        await context.close();
    })
    test('should allow invited member to create a contact successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await Logintoapplication(page, memberEmail);

        //=====================Add contact========================
        await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible({ timeout: 10000 });
        await page.getByRole('button', { name: 'Add Contact' }).click();
        await page.getByRole('textbox', { name: 'First name (required)' }).fill('Basava');
        await page.locator('[id="add-phone-0-country"]').click();
        await page.getByRole('option', { name: 'IN' }).click();
        await page.locator('[id="phones.0.value"]').fill('+917634526178');
        await page.getByRole('button', { name: 'Save' }).click();
        await context.close();
    })
})
