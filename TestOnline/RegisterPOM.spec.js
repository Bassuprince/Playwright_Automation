import { test } from '@playwright/test';
import { RegisterPage } from '../Page/RegisterPage';
import { RegisterSteps } from '../Page/RegisterSteps';

const randomEmail = (prefix) => `${prefix}_${Date.now()}@example.com`;

test.describe('Contacts Registration - POM', () => {
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(90000);

  test('should register with valid India data', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    const steps = new RegisterSteps(page);
    const email = randomEmail('india');

    await steps.openRegistrationPage();
    await steps.registerIndia({ email, company: 'RTT', firstName: 'Rajesh', middleName: 'R', surname: 'Patils' });

    await registerPage.expectContinueToSignInVisible();
    await context.close();
  });

  test('should register with valid USA data', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    const steps = new RegisterSteps(page);
    const email = randomEmail('usa');

    await steps.openRegistrationPage();
    await steps.registerUSA({ email, company: 'RTT', firstName: 'Rajesh', lastName: 'R' });

    await registerPage.expectContinueToSignInVisible();
    await context.close();
  });

  test('should show validation for invalid email', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    const steps = new RegisterSteps(page);

    await steps.openRegistrationPage();
    await registerPage.fillEmail('invalid-email');
    await registerPage.selectCountry('INDIA');
    await registerPage.selectTimeZone();
    await registerPage.fillCompanyName('RTT');

    await registerPage.expectContinueDisabled();
    await context.close();
  });

  test('should require mandatory fields', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    const steps = new RegisterSteps(page);

    await steps.openRegistrationPage();
    await registerPage.fillEmail('');
    await registerPage.selectCountry('INDIA');
    await registerPage.selectTimeZone();

    await registerPage.expectContinueDisabled();
    await context.close();
  });

  test('should accept other text in company name', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    const steps = new RegisterSteps(page);
    const email = randomEmail('othertext');

    await steps.openRegistrationPage();
    await registerPage.fillEmail(email);
    await registerPage.selectCountry('INDIA');
    await registerPage.selectTimeZone();
    await registerPage.fillCompanyName('My Company 123! #Test');
    await registerPage.fillIndiaAdminDetails('Rajesh', 'R', 'Patils');

    await registerPage.expectContinueEnabled();
    await context.close();
  });

  test('should require terms and privacy checkbox for India registration', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    const steps = new RegisterSteps(page);
    const email = randomEmail('checkbox');

    await steps.openRegistrationPage();
    await registerPage.fillEmail(email);
    await registerPage.selectCountry('INDIA');
    await registerPage.selectTimeZone();
    await registerPage.fillCompanyName('RTT');
    await registerPage.fillIndiaAdminDetails('Rajesh', 'R', 'Patils');
    await registerPage.clickContinue();

    await registerPage.expectCreateWorkspaceDisabled();
    await context.close();
  });
});
