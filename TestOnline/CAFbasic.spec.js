import { test, expect } from '@playwright/test'
const subjectText = 'When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation.';

test('manager create the CAF taak to Employee', async ({ page }) => {

    await page.goto("https://kpi-dash-staging.indeadesignsystems.com/login")
    await page.locator('[data-testid="sign-in-button"]').click()
    await page.locator('[placeholder="Email address or mobile number"]').fill('managerman789@gmail.com')
    await page.locator('[id="nextbtn"]').click()
    await page.locator('[placeholder="Enter password"]').fill('Akshay20*')
    await page.locator('[id="nextbtn"]').click()

    await page.locator('[data-testid="sidebar-item-/caf"]').click()
    await expect(page.getByRole('button', { name: 'Create New CAF' })).toBeVisible();
    await page.locator('.inline-flex.items-center.justify-center.whitespace-nowrap').nth(1).click()
    await page.locator('#employee-select').click();
    await page.getByRole('option', { name: 'Akshay U (ESWML006)' }).click();
    await page.locator('#category-select').click();
    await page.getByRole('option', { name: 'Disciplinary' }).click();

    await page.locator('#subject-input').fill(subjectText)
    await page.locator('#problem-description').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')
    await page.locator('#impact-input').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')
    await page.locator('#corrective-action-measure').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')
    await page.getByText('Create CAF').click()

    const IDcapture = await page
        .locator('tbody tr')
        .first()
        .locator('td')
        .nth(1)
        .textContent();

    console.log(IDcapture);

    //  await page.locator('tbody').waitFor()
    //     const IDcapture = await locator('tbody tr').first().locator('td').nth(1).textContent()
    //    console.log(IDcapture)

    await expect(page.getByRole('heading')).toContainText('Corrective Action Forms');
    await page.locator('[data-testid="sidebar-logout-button"]').click()
    await page.waitForTimeout(3000)


    await page.goto("https://kpi-dash-staging.indeadesignsystems.com/login")
    await page.locator('[data-testid="sign-in-button"]').click()
    await page.locator('[placeholder="Email address or mobile number"]').fill('akshayidsinternal@gmail.com')
    await page.locator('[id="nextbtn"]').click()
    await page.locator('[placeholder="Enter password"]').fill('12345@Qwerty12345')
    await page.locator('[id="nextbtn"]').click()


    await page.locator('[data-testid="sidebar-item-/caf"]').click()
    //await expect(page.getByRole('button', { name: 'Create New CAF' })).toBeVisible();

    await page.locator('tbody').waitFor()
    const row = page.locator('tbody tr')

    for (let i = 0; i < await row.count(); ++i) {
        const IDs = await row.nth(i).locator('td').nth(1).textContent()
        console.log(IDs);
        if (IDcapture.includes(IDs.trim()))
        {
            await row.nth(i).click()
            break;
        }
    }

    await page.locator('[type="checkbox"]').nth(0).check()
    await page.locator('[type="checkbox"]').nth(1).check()
    await page.locator('[placeholder="Add any remarks or comments about this acknowledgement..."]').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')

    await page.getByRole('button', { name: 'Acknowledge' }).click()
    await expect(page.locator('div').filter({ hasText: /^Corrective Action Form$/ })).toBeVisible();
    //await expect(page.getByRole('heading')).toContainText('Corrective Action Forms');
    await page.locator('[data-testid="sidebar-logout-button"]').click()
    await page.waitForTimeout(3000)

    //await page.getByText('Acknowledge').click()



    await page.goto("https://kpi-dash-staging.indeadesignsystems.com/login")
    await page.locator('[data-testid="sign-in-button"]').click()
    await page.locator('[placeholder="Email address or mobile number"]').fill('devteam@indeadesignsystems.com')
    await page.locator('[id="nextbtn"]').click()
    await page.locator('[placeholder="Enter password"]').fill('BDCCMc8P3yFiYl0H')
    await page.locator('[id="nextbtn"]').click()
    await page.waitForTimeout(4000)

    await page.locator('[data-testid="sidebar-item-/caf"]').click()
    //await expect(page.getByRole('button', { name: 'Create New CAF' })).toBeVisible();

    await page.locator('tbody').waitFor()
    const row1 = page.locator('tbody tr')

    for (let i = 0; i < await row1.count(); ++i) {
        const IDs = await row1.nth(i).locator('td').nth(1).textContent()
        console.log(IDs);
        if (IDcapture.includes(IDs.trim())){
            await row1.nth(i).click()
            break;
        }
    }

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Critical' }).click();
    await page.locator('[placeholder="Summarise your findings (min 100 characters, max 2000)"]').fill('When an employee acknowledges the CAF and enters a lengthy comment, the acknowledgment comment in the Identification Details section is displayed in full without proper formatting or truncation. This causes UI alignment and layout issues within the Identification Details section.')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('OVERVIEWKPI dashboardReportsASSESSMENTSManual AssessmentCAF6Innovation &')).toBeVisible();
    await page.pause()


})


