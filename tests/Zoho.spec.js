import { test, expect } from '@playwright/test';

async function setSlider(page, index, value) {

    const slider = page.locator('[role="slider"]').nth(index);

    await slider.scrollIntoViewIfNeeded();

    await expect(slider).toBeVisible();

    // Parent slider track
    const track = slider.locator('xpath=ancestor::span[@data-orientation="horizontal"]');

    const box = await track.boundingBox();

    if (!box) throw new Error('Slider not visible');

    // Slider min/max
    const min = Number(await slider.getAttribute('aria-valuemin')) || 1;
    const max = Number(await slider.getAttribute('aria-valuemax')) || 5;

    // Calculate position
    const percentage = (value - min) / (max - min);

    const targetX = box.x + (box.width * percentage);
    const targetY = box.y + (box.height / 2);

    // Drag slider
    await page.mouse.move(box.x + 5, targetY);
    await page.mouse.down();

    await page.mouse.move(targetX, targetY, {
        steps: 10
    });

    await page.mouse.up();

    // Validation
    await expect(slider).toHaveAttribute(
        'aria-valuenow',
        String(value)
    );

    console.log(`Slider ${index} set to ${value}`);
}


test('KPI Slider Test', async ({ page }) => {
  test.setTimeout(120000);

  //  Login Flow
  await page.goto('https://kpi-dash-staging.indeadesignsystems.com/login');

  await page.getByTestId('sign-in-button').click();

  await page.getByRole('textbox', { name: 'Email address or mobile number' })
    .fill('shriyansushmitha12@gmail.com');

  await page.locator('#nextbtn').click();

  await expect(page.getByPlaceholder('Enter password')).toBeVisible({ timeout: 10000 });

  await page.getByRole('textbox', { name: 'Enter password' }).fill('Sushmitha12*');

  await expect(page.locator('#nextbtn')).toBeVisible();
  await page.locator('[id="nextbtn"]').click()


  //  Navigation
  await page.getByTestId('sidebar-item-Manual Assessment').click();
  await page.getByTestId('sidebar-subitem-/competency-assessment').click();

  await page.getByRole('button', { name: 'Add Assessment' }).click();


  //  Form Selection
  await page.getByTestId('competency-employee-select').click();
  await page.getByRole('option', { name: 'Prathik Akshay Pai (ESWML002)' }).click();
  //await page.getByRole('option', { name: 'Ravindra Naikanakatte (ESWML003)' }).click();
  //await page.getByRole('option', { name: 'Akshay U (ESWML006)' }).click();
  //await page.getByRole('option', { name: 'Shreeyan Sushmitha (ESWML005)' }).click();

  await page.getByTestId('competency-year-select').click();
  await page.getByRole('option', { name: '2026' }).click();

  await page.getByTestId('competency-quarter-select').click();
  await page.getByRole('option', { name: 'Q1 — Jan to Mar' }).click();

  //slider
  await setSlider(page, 0, 3);
  await setSlider(page, 1, 4);
  await setSlider(page, 2, 2);
  await setSlider(page, 3, 5);
  await setSlider(page, 4, 1);

  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(0).fill('Clearly expresses ideas, issues, and updates');
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(1).fill('Adapts to changing requirements');
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(2).fill('Proactively handles tasks and improvements');
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(3).fill('Makes timely and effective decisions');
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(4).fill('Takes ownership and mentors others')

  //save Draft
  await page.getByRole('button', { name: 'Save Draft' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Update Draft' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Send to HR' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByTestId('sidebar-logout-button').click();


});
