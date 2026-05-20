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
