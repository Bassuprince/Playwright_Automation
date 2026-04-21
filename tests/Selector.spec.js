import {test, expect}from '@playwright/test';

test('Selectors',async ({page})=>{
    await page.goto('https://www.saucedemo.com/')
    
    await page.locator('[placeholder="Username"]').fill('standard_user')
    await page.pause()  

})