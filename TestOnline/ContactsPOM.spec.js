import { test, expect } from '@playwright/test';
import { RegisterPage } from '../Page/RegisterPage';
import { ContactsLoginPage } from '../Page/ContactsLoginPage';
import { ContactsPage } from '../Page/ContactsPageMain';
import { getActivationUrl, activateFromMail, acceptInviteFromMail } from '../Util_files_caf/mailpitHelper';

test.describe('Contacts Application - POM Example', () => {
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(60000);

  const email = `testuser_${Date.now()}@example.com`;
  const memberEmail = `member_${Date.now()}@example.com`;
  const targetNumber = '+917634526178';

  test('should register and activate account (POM)', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Using RegisterPage POM
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await page.getByRole('link', { name: 'Start your workspace' }).first().click();
    await page.waitForLoadState('networkidle');
    await registerPage.completeRegistration('USA', email);

    // Activate account
    await getActivationUrl(page, email);
    await activateFromMail(page, email);

    await context.close();
  });

  test('should login and logout (POM)', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Using ContactsLoginPage POM
    const loginPage = new ContactsLoginPage(page);
    await loginPage.goto();
    await loginPage.login(email);
    await loginPage.logout();

    await context.close();
  });

  test('should CRUD contact (POM)', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new ContactsLoginPage(page);
    const contactsPage = new ContactsPage(page);

    await loginPage.goto();
    await loginPage.login(email);

    // Add contact
    await contactsPage.contactsHeading.isVisible();
    await contactsPage.addContact('Rajesh', 'IN', '+917634526178');

    // Edit contact
    await contactsPage.editContact('Rajesha', targetNumber);

    // Delete contact
    await contactsPage.deleteContact(targetNumber);
    await contactsPage.verifyContactInTrash(targetNumber);

    await context.close();
  });
});
