import { test, expect } from '@playwright/test';
const Adminemail = `test${Date.now()}@example.com`;

// Helper to select a date in the visible calendar widget.
// Usage: await selectDate(page, 'August 2026', '15')
async function selectDate(page, targetMonthAndYear, day) {
  const monthLabel = page.locator('span.text-xs.font-medium').first();
  // try up to 24 months to avoid infinite loop
  for (let i = 0; i < 24; i++) {
    const text = (await monthLabel.textContent())?.trim();
    if (text === targetMonthAndYear) {
      break;
    }
    await page.locator('[aria-label="Next month"]').click();
    await page.waitForTimeout(200);
  }

  const dateLocator = page.locator('.h-7.rounded.text-xs', { hasText: day }).first();
  await dateLocator.waitFor({ state: 'visible', timeout: 10000 });
  await dateLocator.click();
}

// Helper to select date/time from the datetime picker.
// Accepts `monthOffset` (0 = this month, 1 = next month, ...), and optional `day`
test.describe ('Calendar',()=>{
 test.describe.configure({ mode: 'serial' });


test('Calendar test', async ({ browser }) => {
  test.setTimeout(120000); // 2 minutes
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://calendar-app-qa.idsinternal.com/login');


  //await page.locator('#email').fill('test@example.com');
  //await page.locator('button[type="submit"]').click();

  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Business Details' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Organisation Name' }).click();
  await page.getByRole('textbox', { name: 'Organisation Name' }).fill('IDS');
  await page.getByRole('textbox', { name: 'Admin Email' }).fill(Adminemail);
  console.log(`Email registered: ${Adminemail}`);
  //await page.getByLabel('Data Storage Region*').selectOption('US');
  await page.getByLabel('Data Storage Region*').selectOption('IN');
  await page.getByRole('textbox', { name: 'First Name' }).fill('Basava');
  //await page.getByRole('textbox',{name:'Last Name'}).fill('K')

  await page.getByRole('textbox', { name: 'Middle Name (optional)' }).fill('K');
  await page.getByRole('textbox', { name: 'Surname' }).fill('AC');
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
  // await expect(page.getByRole('heading', { name: /Privacy Policy/i })).toBeVisible({ timeout: 30000 });
  await expect(page.getByRole('heading', { name: 'GSTIN (Optional)'})).toBeVisible({ timeout: 60000 });

  //=====GSTIN=====


 await expect(page.getByRole('heading', { name: 'GSTIN (Optional)'})).toBeVisible({ timeout: 60000 });
  await page.getByRole('textbox', { name: 'GSTIN' }).fill('TRUH76543456788');
  // await page.getByRole('button', { name: 'Next' }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('heading', { name: 'DPDP Consent' })).toBeVisible();

  //====DPDP Consent====
  await page.getByRole('checkbox', { name: 'I consent to the collection' }).click();
  //await page.getByRole('button', { name: 'Next' }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Next' }).click();
  
  //===========Plan Selection===========
  //await expect(page.locator('form div').filter({ hasText: 'Free₹0.00/mo- Up to 3' })).toBeVisible();
   await expect(page.getByTestId('tier-free')).toBeVisible();
   await page.getByTestId('tier-free').click();
 

  await page.getByRole('button', { name: 'Next' }).click();
  
  //====validate text====
  //====iframe handling====
  //await expect(page.locator('dl')).toContainText('Testuser3@example.com');
  await page.getByRole('button', { name: 'Complete Registration' }).click();


  ///open new tab and handle iframe

  const framepage = page.frameLocator('.razorpay-checkout-frame')

  await expect(framepage.locator('.flex.gap-4')).toBeVisible({ timeout: 60000 });
  await expect(framepage.getByRole('button', { name: 'Continue' })).toBeVisible();



  await framepage.getByTestId('contactNumber').fill('8722872873');
  await framepage.getByRole('button', { name: 'Continue' }).click();
  await expect(framepage.getByTestId('title')).toBeVisible();



  await expect(framepage.getByTestId('netbanking')).toBeVisible();
  await framepage.getByTestId('netbanking').click();
  const selectBank = framepage.locator('div [data-value="BARB_R"]').nth(0)


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
    toAddrs.includes(Adminemail.toLowerCase())
  );
});

if (!email) {
  throw new Error(`Activation email not found for ${Adminemail}`);
}

console.log(`Email found: ${Adminemail.Subject}`);

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
  await page.context().close();
})

  
  test.only('ctive the passworod link',async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://calendar-app-qa.idsinternal.com/login')
    await page.locator('[id="email"]').fill('test1781351824753@example.com')
    await page.getByRole('button',{name:'Continue'}).click()
    await page.locator('[id="password"]').fill('Password@123')
   
    await page.locator('[id="kc-login"]').click()
    await expect(page.getByRole('button', { name: 'New Event' })).toBeVisible();
  
    
    await page.getByRole('button',{name:'New Event'}).click()
    await page.locator('[id="title"]').fill('Events')
    await page.locator('[id="description"]').fill('Description')
    await page.locator('[id="location"]').fill('Managolre')


// time 
  await page.getByRole('button', { name: 'Open Start time picker' }).click();
  const targetMonthAndYear = 'August 2026'; // passable variable
  const targetDay = '26'; // passable variable
  await selectDate(page, targetMonthAndYear, targetDay);
  await page.getByTestId('datetime-picker').getByLabel('Hour').selectOption('10');
  await page.getByTestId('datetime-picker').getByLabel('Minute').selectOption('30');


  await page.getByRole('button', { name: 'Open End time picker' }).click();
  await selectDate(page, targetMonthAndYear, targetDay);

  // Wait for datetime picker and set hour/minute directly (avoid brittle button label)
 // const dtPicker = page.getByTestId('datetime-picker');
 // await dtPicker.waitFor({ state: 'visible', timeout: 10000 });
  await page.getByTestId('datetime-picker').getByLabel('Hour').selectOption('11');
  await page.getByTestId('datetime-picker').getByLabel('Minute').selectOption('00');
  await page.pause()
//=======recuring=====
  await page.getByRole('checkbox', { name: 'Repeat' }).check();
  await page.getByRole('combobox').nth(2).selectOption('monthly');
  await page.locator('input[type="date"]').fill('2026-08-31');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Event created')).toBeVisible();






    })
  })


