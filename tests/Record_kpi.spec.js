import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://kpi-dash-staging.indeadesignsystems.com/login');
  await page.getByTestId('sign-in-button').click();
  await page.getByRole('textbox', { name: 'Email address or mobile number' }).fill('managerman789@gmail.com');
  await page.locator('[id="nextbtn"]').click()
  //await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('Akshay20*');
  await page.locator('[id="nextbtn"]').click()
  //await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByTestId('sidebar-item-Manual Assessment').click();
  await page.getByTestId('sidebar-subitem-/competency-assessment').click();
  await page.getByRole('button', { name: 'Add Assessment' }).click();
  await page.getByTestId('competency-employee-select').click();
  await page.getByRole('option', { name: 'Shreeyan Sushmitha (ESWML005)' }).click();
  await page.getByTestId('competency-year-select').click();
  await page.getByRole('option', { name: '2026' }).click();
  await page.getByTestId('competency-quarter-select').click();
  await page.getByText('Q1 — Jan to Mar').click();
  await page.locator('.relative.h-3').first().click();
  await page.getByRole('textbox', { name: 'Add your comments here...' }).first().fill('dfdf');
  await page.getByRole('slider').nth(1).click();
});

