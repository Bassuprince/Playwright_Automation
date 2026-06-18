import { test, expect } from "@playwright/test"
test('KPI Slider Test', async ({ page }) => {

  //  Login Flow
  await page.goto('https://kpi-dash-staging.indeadesignsystems.com/login');
  await page.getByTestId('sign-in-button').click();

  await page.getByRole('textbox', { name: 'Email address or mobile number' })
    .fill('managerman789@gmail.com');

  await page.locator('#nextbtn').click();

  await expect( page.getByPlaceholder('Enter password')).toBeVisible({ timeout: 10000 });

  await page.getByRole('textbox', { name: 'Enter password' }).fill('Akshay20*');

   await expect(page.locator('#nextbtn')).toBeVisible();
   await page.locator('[id="nextbtn"]').click()
   

  //  Navigation
  await page.getByTestId('sidebar-item-Manual Assessment').click();
  await page.getByTestId('sidebar-subitem-/competency-assessment').click();

  await page.getByRole('button', { name: 'Add Assessment' }).click();

  //  Form Selection
  await page.getByTestId('competency-employee-select').click();
  await page.getByRole('option', { name: 'Akshay U (ESWML006)' }).click();
  //await page.getByRole('option', { name: 'Shreeyan Sushmitha (ESWML005)' }).click();
  //await page.getByText('Prathik Akshay Pai (ESWML002)').click();
  await page.pause()
  
  
  await page.getByTestId('competency-year-select').click();
  await page.getByRole('option', { name: '2026' }).click();

  await page.getByTestId('competency-quarter-select').click();
  await page.getByRole('option', { name: 'Q1 — Jan to Mar' }).click();


  // ...existing code...

//  Set Slider Values
//Communication
await setSliderByLocator(page, '[role="slider"]:nth-of-type(1)', 3); // Developing
await page.getByRole('textbox', { name: 'Add your comments here...' }).first().fill('Clearly expresses ideas, issues, and updates')
//Flexibility
await setSliderByLocator(page, '[role="slider"]:nth-of-type(2)', 4); // Proficient
await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(1).fill('dapts to changing requirements, priorities, or roles, with flexibility to support extended hours, ')
//Initiative
await setSliderByLocator(page, '[role="slider"]:nth-of-type(3)', 3); //Needs Improvement
await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(2).fill('Proactively identifies tasks, improvements, or issues')
await page.locator('[role="slider"]').nth(3).scrollIntoViewIfNeeded();
//Decision Making
await setSliderByLocator(page, '[role="slider"]:nth-of-type(4)', 4); //Exceptional
await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(3).fill('Makes timely and effective decisions within scope')
await expect (page.getByRole('textbox', { name: 'Add your comments here...' }).nth(3)).toBeVisible()
//Leadership
await page.locator('[role="slider"]').nth(4).scrollIntoViewIfNeeded();
//Decision Making
await setSliderByLocator(page, '[role="slider"]:nth-of-type(5)', 5); //Unsatisfactory
await page.getByRole('textbox', { name: 'Add your comments here...' }).nth(4).fill('Takes ownership, mentors others, and drives outcomes')
await expect(page.getByRole('textbox', { name: 'Add your comments here...' }).nth(4)).toBeVisible()

// ...existing code...

})