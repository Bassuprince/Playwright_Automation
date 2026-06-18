import path from 'path';
import { test, expect } from '@playwright/test';
import { registerWorkspace } from '../Util_files_caf/Contactregister';
import { getActivationUrl, activateFromMail, acceptInviteFromMail } from '../Util_files_caf/mailpitHelper';

test.describe('Contacts Application - End to End Flow', () => {
    test.describe.configure({ mode: 'serial' });
    test.setTimeout(60000);
    const email = `testuser_${Date.now()}@example.com`;
    const storageStatePath = path.resolve(process.cwd(), 'storageState.json');
    // const memberEmail = `Basava${Date.now()}@example.com`
    test('should allow Admin to register and activate account successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://contacts-app-qa.idsinternal.com/');
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Start your workspace' }).first().click();
        await page.waitForLoadState('networkidle');
        await registerWorkspace(page, 'INDIA', email);
        await getActivationUrl(page, email);
        await activateFromMail(page, email);
        await context.close();
    });
    test('should allow Admin to login & logout successfully', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://contacts-app-qa.idsinternal.com/login');
        //=======================Login to application========================
        await page.getByRole('textbox', { name: 'Work email' }).fill(email);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('Password@123');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('networkidle');

        await context.storageState({ path: storageStatePath });
        await context.close();
    });
    test('should create company successfully', async ({ browser }) => {
        const authContext = await browser.newContext({ storageState: storageStatePath });
        const page = await authContext.newPage();
        await page.goto('https://contacts-app-qa.idsinternal.com/');
        console.log('Current URL:', page.url());

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
        await page.getByRole('button', { name: 'Add tax identifier' }).click();
        await page.getByRole('textbox', { name: 'Tax identifier 1 value' }).fill('12-3456789');

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
        await page.getByRole('button', { name: 'Use photo' }).click();
        await page.getByRole('button', { name: 'Use anyway' }).click();
        await expect(page.getByRole('button', { name: 'Replace logo' })).toBeVisible();


        await page.getByRole('button', { name: 'Create company' }).click();
        await expect(page.getByRole('button', { name: 'Create company' })).toBeHidden({ timeout: 5000 });
        await authContext.close();
    })
    test('should edit company successfully', async ({ browser }) => {
        
         //=======================Login to application========================
        const authContext = await browser.newContext({ storageState: storageStatePath });
        const page = await authContext.newPage();
        await page.goto('https://contacts-app-qa.idsinternal.com/');
        console.log('Current URL:', page.url());
          //====================Add company========================
        await page.locator('a .lucide.lucide-building2').click();
        //await expect(page.getByText('No companies yet')).toBeVisible();
        await page.getByRole('button', { name: 'Add company' }).click()
        await page.locator('[id="name"]').fill('IDS Software');
        await page.locator('[id="industry"]').fill('Software');
        await page.locator('[id="company_code"]').fill('IDS123');
        await page.locator('[id="founded_year"]').fill('2010');
        await page.locator('[id="annual_revenue"]').fill('1000000');
        await page.locator('[id="website"]').fill('https://ultimateqa.com');
        await page.getByRole('button', { name: 'Add tax identifier' }).click();
        await page.getByRole('textbox', { name: 'Tax identifier 1 value' }).fill('12-3456789');

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
        await page.getByRole('button', { name: 'Use photo' }).click();
        await page.getByRole('button', { name: 'Use anyway' }).click();
        await expect(page.getByRole('button', { name: 'Replace logo' })).toBeVisible();


        await page.getByRole('button', { name: 'Create company' }).click();
        await expect(page.getByRole('button', { name: 'Create company' })).toBeHidden({ timeout: 5000 });

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
        await authContext.close();
    })

});