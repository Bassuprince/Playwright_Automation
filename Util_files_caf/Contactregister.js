import { test, expect } from '@playwright/test';
export async function registerWorkspace(page, country, email) {

    await page.locator('[placeholder="you@company.com"]').fill(email);
    console.log("Registered email New Email: " + email);

    // ================= Country Selection =================
    if (country === 'USA') {
        await page.locator('label').filter({ hasText: 'United States' }).click();

     
    } else if (country === 'INDIA') {

        await page.locator('label').filter({ hasText: 'India' }).click();
    }

    // ================= Common Fields =================
    await page.locator('[aria-label="Time zone"]').click();
    await page.getByRole('option', { name: 'Africa/Abidjan' }).click();
    await page.locator('[placeholder="Acme Inc."]').fill('RTT');


    // ================= USA Flow =================
    if (country === 'USA') {

        await page.locator('#admin_first_name').fill('Rajesh');
        await page.locator('#admin_last_name').fill('R');

        await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();

        await page.getByRole('button', { name: 'Continue' }).click();

        // Terms & Privacy
        await expect(page.getByRole('heading', { name: 'Terms & Privacy' })).toBeVisible();

        await page.getByRole('checkbox', {name: 'I have read and agree to the'}).check();

        await page.getByRole('button', {name: 'Create my workspace'}).click();
        await expect(page.getByRole('button', { name: 'Create my workspace' })).toBeHidden({ timeout: 15000 });

    }

    // ================= INDIA Flow =================
    else if (country === 'INDIA') {

        await page.locator('#admin_first_name').fill('Rajesh');
        await page.locator('#admin_middle_name').fill('R');
        await page.locator('#admin_surname').fill('ghgh');

        await expect(page.getByRole('button', { name: 'Continue' }) ).toBeEnabled();

        await page.getByRole('button', { name: 'Continue' }).click();

        // Data protection
        await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();

        await page.locator('[type="checkbox"]').check();

        await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();

        await page.getByRole('button', { name: 'Continue' }).click();

        // Privacy policy
        await expect(page.getByRole('button', {name: 'Create my workspace'})).toBeDisabled();

        await page.locator('[type="checkbox"]').check();

        await expect(page.getByRole('button', {name: 'Create my workspace'})).toBeEnabled();

        await page.getByRole('button', {name: 'Create my workspace'}).click();
    }

    // ================= Confirmation =================
    await expect(page.getByRole('link', {name: 'Continue to sign in'}) ).toBeVisible();

    await page.getByRole('link', {name: 'Continue to sign in'}).click();
}