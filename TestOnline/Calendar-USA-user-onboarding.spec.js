import { test, expect } from '@playwright/test';
const cemail = `test${Date.now()}@example.com`;


test('Calendar test', async ({ browser }) => {
    test.setTimeout(120000); // 2 minutes
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://calendar-app-qa.idsinternal.com/login');

    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByRole('heading', { name: 'Business Details' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Organisation Name' }).click();
    await page.getByRole('textbox', { name: 'Organisation Name' }).fill('IDS');
    await page.getByRole('textbox', { name: 'Admin Email' }).fill(cemail);
    console.log(`Email registered: ${cemail}`);
    await page.getByLabel('Data Storage Region*').selectOption('US');
    // await page.getByLabel('Data Storage Region*').selectOption('IN');
    await page.getByRole('textbox', { name: 'First Name' }).fill('Basava');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('K')
    await expect(page.getByRole('textbox', { name: 'Display Name' })).toBeVisible();
    await page.getByRole('combobox', { name: 'Timezone' }).fill('Asia/Kolkata');
    await page.getByRole('option', { name: 'Asia/Kolkata' }).click();

    //====ensure "Next" is visible and clickable (scroll if needed)======
    await page.getByRole('button', { name: 'Next' }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();

    /*
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }),
      page.getByRole('button', { name: 'Next' }).click(),
    ]);
    */

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible({ timeout: 60000 });


    //====Privacy Policy USA===
    await page.locator('[role="checkbox"]').check();
    await page.getByRole('button', { name: 'Next' }).click();


    //===========Plan Selection===========
    await expect(page.getByRole('heading', { name: 'Select a Plan' })).toBeVisible();
    await page.getByTestId('tier-free').click();
    // await page.getByTestId('tier-starter').click();
    // await page.getByTestId('tier-pro').click();
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByRole('button', { name: 'Complete Registration' }).click();

    // Wait for the Stripe payment iframe to load and click the card option
    const stripeFrame = page.frameLocator('iframe[title="Secure payment input frame"]').first();
    await expect(stripeFrame.getByRole('button', { name: 'Bank' })).toBeVisible({ timeout: 30000 });
    await stripeFrame.getByRole('button', { name: 'Bank' }).click();
    //await stripeFrame.getByRole('combobox', { name: 'Search for your bank' }).fill('success');
    //await stripeFrame.getByRole('option', { name: 'Success' }).click();
    await stripeFrame.locator('div').filter({ hasText: /^Success$/ }).nth(2).click();

   

    const paymentframe = page.frameLocator('iframe[name^="__privateStripeFrame"]');
    await expect(paymentframe.getByRole('heading', { name: 'Log in to Success' })).toBeVisible({ timeout: 30000 });
    await paymentframe.getByTestId('link-email-input').fill('basva@gns.com');

    await expect(paymentframe.getByTestId('link-phone-number-input')).toBeVisible();
    await page.pause();

    const frame = page.frameLocator('iframe[name="__privateStripeFrame63411"]');
    const frm = page.frameLocator('[data-testid="la-app-container"]');

       await expect(frame.getByRole('heading', { name: 'Log in to Success' })).toBeVisible();
       await frame.getByTestId('link-email-input').fill('basva@gns.com');
       await expect(frame.getByTestId('link-phone-number-input')).toBeVisible()``
       await frame.getByTestId('link-phone-number-input').fill('(456) 765-4345');
     


/*
    const framepage3 = page.frameLocator('iframe[name^="__privateStripeFrame"]');
    //const framepage2 = page.frameLocator('[name^="__privateStripeFrame"]');
    await framepage3.locator('#link').click();

   


    await page.locator('iframe[name="__privateStripeFrame7233"]').contentFrame().getByRole('button', { name: 'Bank $16 back' }).click();
    await expect(page.locator('iframe[name="__privateStripeFrame7233"]').contentFrame().getByRole('button', { name: 'Bank $16 back' })).toBeVisible();
    await expect(page.locator('iframe[name="__privateStripeFrame7233"]').contentFrame().getByRole('img', { name: 'Success' })).toBeVisible();
    await page.locator('iframe[name="__privateStripeFrame7233"]').contentFrame().getByRole('img', { name: 'Success' }).click();
    await expect(page.locator('iframe[name="__privateStripeFrame72311"]').contentFrame().getByRole('heading', { name: 'Log in to Success' })).toBeVisible();
    await page.locator('iframe[name="__privateStripeFrame72311"]').contentFrame().getByTestId('agree-button').click();
    await expect(page.locator('iframe[name="__privateStripeFrame72311"]').contentFrame().getByRole('heading', { name: 'Sign up or log in' })).toBeVisible();
    await expect(page.locator('iframe[name="__privateStripeFrame72311"]').contentFrame().locator('label')).toBeVisible();



    await expect(page.locator('form div').filter({ hasText: 'Free₹0.00/mo- Up to 3' })).toBeVisible();
    await page.getByTestId('tier-free').click();
    await page.getByRole('button', { name: 'Next' }).click();


    //====validate text====
    //====iframe handling====
    //await expect(page.locator('dl')).toContainText('Testuser3@example.com');
    await page.getByRole('button', { name: 'Complete Registration' }).click();


    //=====open new tab and handle iframe====


    //======new window tab======= 
    const [childPage] = await Promise.all
        ([
            context.waitForEvent('page'),
            selectBank.click()
        ]);


    //await childPage.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await Promise.all([
        childPage.waitForEvent('close'),
        childPage.getByRole('button', { name: 'Success' }).click()
    ]);
    await expect(page.getByRole('heading', { name: 'Registration complete!' })).toBeVisible({ timeout: 60000 });

    //await page.locator('iframe').contentFrame().locator('.flex.grow.justify-end').click();

    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible({ timeout: 60000 });
    await page.getByRole('link', { name: 'Sign in' }).click();


    //===============mail pit==========
    const response = await page.request.get(
        'https://mailpit-dev.idsinternal.com/api/v1/messages'
    );

    const data = await response.json();

    const email = data.messages.find(msg => {
        const subj = (msg.Subject || '').toLowerCase();
        const toAddrs = (msg.To || []).map(t => (t.Address || '').toLowerCase());

        return (
            (subj.includes('password') ||
                subj.includes('activate') ||
                subj.includes('activation')) &&
            toAddrs.includes(cemail.toLowerCase())
        );
    });

    if (!email) {
        throw new Error(`Activation email not found for ${cemail}`);
    }

    console.log(`Email found: ${email.Subject}`);

    // Fetch full message
    const messageResponse = await page.request.get(
        `https://mailpit-dev.idsinternal.com/api/v1/message/${email.ID}`
    );

    const messageData = await messageResponse.json();

    // Extract activation URL
    const html = messageData.HTML || '';

    const match = html.match(
        /https:\/\/calendar-app-qa\.idsinternal\.com\/activate\/[^"\s<]+/
    );

    if (!match) {
        throw new Error('Activation link not found in email');
    }

    const activationUrl = match[0];

    console.log(`Activation URL: ${activationUrl}`);

    await page.goto(activationUrl);



    // ==================== Set Password ====================
    await expect(page.getByText('Activate your account', { exact: true })).toBeVisible();
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Password@123');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Password@123');
    // ==================== Verify Success ====================
    await page.getByRole('button', { name: 'Activate Account' }).click();
    await expect(page.getByRole('heading', { name: 'Account Activated' })).toBeVisible();

*/

    await page.context().close();
    page.getByPlaceholder("Search or create a tag…").fill('ABS_546')
    page.getByPlaceholder()
    page.getByAltText()
    page.getByTestId()
    page.getByTitle()
    page.getByRole('link',)




})