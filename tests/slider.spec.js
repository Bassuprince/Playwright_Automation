import {test, expect} from '@playwright/test';

test('KPI Assessment Form Test', async ({ page }) => {
    await page.goto('https://jqueryui.com/slider/');
   
    const slider = page.locator('[class="ui-slider-handle ui-corner-all ui-state-default"]')

  // Get slider position and size
  const box = await slider.boundingBox();

  // Set value (example: 70%)
  const percentage = 0.5;

  const targetX = box.x + box.width * percentage;
  const targetY = box.y + box.height / 2;

  // Move mouse and click on that position
  await page.mouse.click(targetX, targetY);

  // Optional: small wait to see result
  await page.waitForTimeout(2000);

})
