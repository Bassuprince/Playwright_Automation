import { test } from '@playwright/test';
import { login,logout } from '../Util_files_caf/Login_util';


const data = require('../TestData/cafData.json');

test('CAF Flow - Appeal + Approve', async ({ page }) => {

  await page.goto('https://kpi-dash-staging.indeadesignsystems.com/login');

  // ================= MANAGER =================
  await login(page, data.username_Mng, data.password_Mng);

  await page.locator('[data-testid="sidebar-item-/caf"]').click();
  await page.getByRole('button', { name: 'Create New CAF' }).click();

  await page.locator('#employee-select').click();
  await page.getByRole('option', { name: data.EmployeeName }).click();

  await page.locator('#category-select').click();
  await page.getByRole('option', { name: data.Category }).click();

  await page.locator('#subject-input').fill(data.CaseSubject);
  await page.getByText('Create CAF').click();

  const cafId = await page.locator('tbody tr').first().locator('td').nth(1).textContent();

  await logout(page,logout())
  await page.pause()

  //await page.locator('[data-testid="sidebar-logout-button"]').click();

  // ================= EMPLOYEE =================
  await login(page, data.username_Emp, data.password_Emp);

  await page.locator('[data-testid="sidebar-item-/caf"]').click();

  const rows = page.locator('tbody tr');

  for (let i = 0; i < await rows.count(); i++) {
    const id = await rows.nth(i).locator('td').nth(1).textContent();

    if (id.includes(cafId.trim())) {
      await rows.nth(i).click();
      break;
    }
  }

  await page.getByRole('button', { name: 'Appeal' }).click();
  await page.locator('[placeholder="e.g. HR-2026-001"]').fill('HR-TR726');
  await page.getByRole('button', { name: 'Submit Appeal' }).click();

  await page.locator('[data-testid="sidebar-logout-button"]').click();

  // ================= HR =================
  await login(page, data.username_HR, data.password_HR);

  await page.locator('[data-testid="sidebar-item-/caf"]').click();

  const hrRows = page.locator('tbody tr');

  for (let i = 0; i < await hrRows.count(); i++) {
    const id = await hrRows.nth(i).locator('td').nth(1).textContent();

    if (id.includes(cafId.trim())) {
      await hrRows.nth(i).click();
      break;
    }
  }

  await page.getByRole('button', { name: 'Accept' }).click();
  await expect(page.getByRole('button', { name: 'Accept' })).toBeVisible()
  await page.locator('[placeholder="Provide resolution details (min 200 characters, max 2000)"]').fill('')
  await page.getByRole('button', { name: 'Submit' }).click()

});











/*





import { test, expect } from '@playwright/test'
import { login } from '../Util_files_caf/Login_util'
const userCAF = require('../TestData/cafData.json')

test.describe('KPI for CAF', () => {
    test.describe.configure({ mode: 'serial' });
    let IDcapture;

    test.beforeEach(async ({ page }) => {
        await page.goto(
            'https://kpi-dash-staging.indeadesignsystems.com/login'
        )
    })
    test.only('Manager creates CAF', async ({ page }) => {
        await login(page, userCAF.username_Mng, userCAF.password_Mng)

        await page.locator('[data-testid="sidebar-item-/caf"]').click()
        await expect(page.getByRole('button', { name: 'Create New CAF' })).toBeVisible();
        await page.locator('.inline-flex.items-center.justify-center.whitespace-nowrap').nth(1).click()
        await page.locator('#employee-select').click();
        await page.getByRole('option', { name: userCAF.EmployeeName }).click();
        await page.locator('#category-select').click();
        await page.getByRole('option', { name: userCAF.Category }).click();

        await page.locator('#subject-input').fill(userCAF.CaseSubject)
        await page.locator('#problem-description').fill(userCAF.Problem_Description)
        await page.locator('#impact-input').fill(userCAF.Impact)
        await page.locator('#corrective-action-measure').fill(userCAF.CorrectiveActionMeasure)
        await page.getByText('Create CAF').click()

        IDcapture = await page.locator('tbody tr').first().locator('td').nth(1).textContent();
        console.log(IDcapture);

        await expect(page.getByRole('heading')).toContainText('Corrective Action Forms');
        await page.locator('[data-testid="sidebar-logout-button"]').click()
        await expect(page.locator('div').nth(2)).toBeVisible();

    })
    test('Employee acknowledges CAF process', async ({ page }) => {
        login(page, userCAF.username_Emp, userCAF.password_Emp)

        await page.locator('[data-testid="sidebar-item-/caf"]').click()
        await page.locator('tbody').waitFor()
        const row = page.locator('tbody tr')

        for (let i = 0; i < await row.count(); ++i) {
            const IDs = await row.nth(i).locator('td').nth(1).textContent()
            console.log(IDs);
            if (IDcapture.includes(IDs.trim())) {
                await row.nth(i).click()
                break;
            }
        }

        //Acknowledge
       
            await page.locator('[type="checkbox"]').nth(0).check()
            await page.locator('[type="checkbox"]').nth(1).check()
            await page.locator('[placeholder="Add any remarks or comments about this acknowledgement..."]').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')

            await page.getByRole('button', { name: 'Acknowledge' }).click()
            await expect(page.locator('div').filter({ hasText: /^Corrective Action Form$/ })).toBeVisible();
            //await expect(page.getByRole('heading')).toContainText('Corrective Action Forms');
            await page.locator('[data-testid="sidebar-logout-button"]').click()
            await expect(page.locator('div').nth(2)).toBeVisible();
            await page.waitForTimeout(3000)
        
        //Appeal
            await page.locator('[placeholder="e.g. HR-2026-001"]').fill('HR-TR726')
            await page.getByRole('button', { name: 'Submit Appeal' }).click()
        

    })
    test('HR reviews CAF', async ({ page }) => {
        login(page, userCAF.username_HR, userCAF.password_HR)

        await page.locator('[data-testid="sidebar-item-/caf"]').click()
        await page.locator('tbody').waitFor()
        const row1 = page.locator('tbody tr')

        for (let i = 0; i < await row1.count(); ++i) {
            const IDs = await row1.nth(i).locator('td').nth(1).textContent()
            console.log(IDs);
            if (IDcapture.includes(IDs.trim())) {
                await row1.nth(i).click()
                break;
            }
        }
        await page.getByRole('combobox').click();
        await page.getByRole('option', { name: 'Critical' }).click();
        await page.locator('[placeholder="Summarise your findings (min 100 characters, max 2000)"]').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('div').filter({ hasText: /^Corrective Action Form$/ })).toBeVisible();
        await page.locator('[data-testid="sidebar-logout-button"]').click()
        await expect(page.locator('div').nth(2)).toBeVisible();

        // Approve & Reject
        //Approve
        await page.getByRole('button', { name: 'Accept' }).click()
        await expect(page.getByRole('button', { name: 'Accept' })).toBeVisible()
        await page.locator('[placeholder="Provide resolution details (min 200 characters, max 2000)"]').fill('')
        await page.getByRole('button', { name: 'Submit' }).click()

        //Reject
        await page.getByRole('button', { name: 'Reject' }).click()
        await expect(await page.getByRole('button', { name: 'Reject' }).click()).toBeVisible()
        await page.getByRole('combobox').click();
        await page.getByRole('option', { name: 'Critical' }).click();
        await page.locator('[placeholder="Summarise your findings (min 100 characters, max 2000)"]').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')
        await page.locator('[placeholder="Describe the resolution for the rejected appeal (min 200 characters, max 2000)"]').fill('')
        await page.getByRole('button', { name: 'Submit' }).click()
      
    })


})

*/