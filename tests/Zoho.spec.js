import { test, expect } from '@playwright/test';

// ✅ Reusable Slider Function (FINAL VERSION)
async function setSlider(page, index, value) {
  const slider = page.locator('[role="slider"]').nth(index);

  await slider.scrollIntoViewIfNeeded();
  await expect(slider).toBeVisible({ timeout: 10000 });

  const track = slider.locator('xpath=ancestor::span[@data-orientation="horizontal"]');

  const box = await track.boundingBox();
  if (!box) throw new Error(`Slider ${index} not visible`);

  const min = Number(await slider.getAttribute('aria-valuemin'));
  const max = Number(await slider.getAttribute('aria-valuemax'));

  const percent = (value - min) / (max - min);
  const x = box.x + percent * box.width;
  const y = box.y + box.height / 2;

  await page.waitForTimeout(500);

  await page.mouse.click(x, y);

  // ✅ SMART WAIT (this replaces 2 sec wait)
  await expect(slider).toHaveAttribute('aria-valuenow', String(value));

  console.log(`✅ Slider ${index} set to ${value}`);
}


test('KPI Slider Test', async ({ page }) => {

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

  //await page.getByRole('button', { name: 'Sign in' }).click();
  // Wait for dashboard load
  //await page.waitForLoadState('networkidle');
  //await page.getByRole('link', { name: 'I Understand' }).click();

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

  //  Wait for sliders to load
  await page.waitForSelector('[role="slider"]');
  await expect(page.locator('[role="slider"]')).toHaveCount(5);
  //await page.pause()


  // locator (define once)
const comments = page.locator('textarea[placeholder="Add your comments here..."]');

// 1️⃣ Communication
await setSlider(page, 0, 2);
await page.waitForTimeout(500);

await comments.nth(0).scrollIntoViewIfNeeded();
await comments.nth(0).fill('Clearly expresses ideas, issues, and updates',{ force: true });

// 2️⃣ Flexibility
await setSlider(page, 1, 4);
await page.waitForTimeout(500);

await comments.nth(1).scrollIntoViewIfNeeded();
await comments.nth(1).fill('Adapts to changing requirements');

// 3️⃣ Initiative
await setSlider(page, 2, 3);
await page.waitForTimeout(500);

await comments.nth(2).scrollIntoViewIfNeeded();
await comments.nth(2).fill('Proactively handles tasks and improvements',{ force: true });

// 4️⃣ Decision Making
await setSlider(page, 3, 4);
await page.waitForTimeout(500);

await comments.nth(3).scrollIntoViewIfNeeded();
await comments.nth(3).fill('Makes timely and effective decisions',{ force: true });

// 5️⃣ Leadership
await setSlider(page, 4, 3);
await page.waitForTimeout(500);

await comments.nth(4).scrollIntoViewIfNeeded();
await comments.nth(4).fill('Takes ownership and mentors others',{ force: true },{ force: true });


  /*

  //  Set Slider Values
  const comments = page.locator('textarea[placeholder="Add your comments here..."]');
  //Communication

  
  await setSlider(page, 0, 2); // Developing
  
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(1).fill('Clearly expresses ideas, issues, and updates')
  //Flexibility
  await setSlider(page, 1, 4); // Proficient
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(2).fill('dapts to changing requirements, ')
  //Initiative
  await setSlider(page, 2, 3); //Needs Improvement
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(3).fill('Proactively  tasks, improvements, or issues')
  await page.locator('[role="slider"]').nth(3).scrollIntoViewIfNeeded();
  //Decision Making
  await setSlider(page, 3, 4); //Exceptional
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(4).fill('Makes timely and effective decisions within scope')
  await expect(page.getByRole('textbox', { name: 'Add your comments here...' }).nth(4)).toBeVisible()
  //Leadership
  await page.locator('[role="slider"]').nth(4).scrollIntoViewIfNeeded();
  //Decision Making
  await setSlider(page, 4, 3); //Unsatisfactory
  await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(5).fill('Takes ownership, mentors others, and drives outcomes')
  await expect(page.getByRole('textbox', { name: 'Add your comments here...' }).nth(5)).toBeVisible()


  */
  //save Draft
  await page.getByRole('button', { name: 'Save Draft' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Update Draft' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Send to HR' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByTestId('sidebar-logout-button').click();


});
