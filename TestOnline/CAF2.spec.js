import { test } from '@playwright/test';
import { login } from '../Util_files_caf/Login_util';
const data = require('../TestData/cafData.json');

test('CAF Flow - Appeal + Reject', async ({ page }) => {

  await page.goto('https://kpi-dash-staging.indeadesignsystems.com/login');

  // ================= MANAGER =================
  await login(page, data.username_Mng, data.password_Mng);
  await page.locator('[data-testid="sidebar-item-/caf"]').click();
  await expect(page.getByRole('button', { name: 'Create New CAF' })).toBeVisible();
  await page.locator('.inline-flex.items-center.justify-center.whitespace-nowrap').nth(1).click()

  await page.locator('#employee-select').click();
  await page.getByRole('option', { name: data.EmployeeName }).click();

  await page.locator('#category-select').click();
  await page.getByRole('option', { name: data.Category }).click();

  await page.locator('#subject-input').fill(data.CaseSubject);
  

 // await page.locator('#subject-input').fill(userCAF.CaseSubject)
  await page.locator('#problem-description').fill(data.Problem_Description)
  await page.locator('#impact-input').fill(data.Impact)
  await page.locator('#corrective-action-measure').fill(data.CorrectiveActionMeasure)
  await page.getByText('Create CAF').click()


  const cafId = await page.locator('tbody tr').first().locator('td').nth(1).textContent();
  console.log("Task ID", cafId)

  await page.locator('[data-testid="sidebar-logout-button"]').click();
     await expect(page.locator('div').nth(2)).toBeVisible();

  // ================= EMPLOYEE =================
  await login(page, data.username_Emp, data.password_Emp);

  await page.locator('[data-testid="sidebar-item-/caf"]').click();
  const rows = page.locator('tbody tr');

  for (let i = 0; i < await rows.count(); i++) {
    const id = await rows.nth(i).locator('td').nth(1).textContent();
    console.log("Checking ID:", id);

    if (id.includes(cafId.trim())) {
      await rows.nth(i).click();
      break;
    }
  }

 // await page.getByRole('button', { name: 'Appeal' }).click();
  await page.locator('[placeholder="e.g. HR-2026-001"]').fill('HR-TR726');
  await page.getByRole('button', { name: 'Submit Appeal' }).click();

  await page.locator('[data-testid="sidebar-logout-button"]').click();
  await expect(page.locator('div').nth(2)).toBeVisible();

  // ================= HR =================
  await login(page, data.username_HR, data.password_HR);

  await page.locator('[data-testid="sidebar-item-/caf"]').click();

  const hrRows = page.locator('tbody tr');

  for (let i = 0; i < await hrRows.count(); i++) {
    const id = await hrRows.nth(i).locator('td').nth(1).textContent();
    console.log("Checking ID:", id);

    if (id.includes(cafId.trim())) {
      await hrRows.nth(i).click();
      break;
    }
  }
    await page.getByRole('button', { name: 'Reject' }).click()
    await expect(await page.getByRole('button', { name: 'Reject' }).click()).toBeVisible()
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Critical' }).click();
    await page.locator('[placeholder="Summarise your findings (min 100 characters, max 2000)"]').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')
    await page.locator('[placeholder="Describe the resolution for the rejected appeal (min 200 characters, max 2000)"]').fill('')
    await page.getByRole('button', { name: 'Submit' }).click()
});