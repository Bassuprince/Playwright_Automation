import { test, expect } from '@playwright/test'
test('multiple browsers', async ({ browser }) => {

    const Browser = await browser.newContext()
    const page = await Browser.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    

    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy')
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2)')
    await page.getByRole('combobox').selectOption('teach');
    await page.locator('span').nth(5).click();

    const documentLink = page.getByRole('link', { name: 'Free Access to InterviewQues/' })

    const [newPage] = await Promise.all(

        [
            Browser.waitForEvent('page'),//listen for any new page
            documentLink.click(),  //new page open
        ])
    const text = await newPage.locator('p.red').textContent()
    console.log(text)
    await newPage.locator('[class="login-btn"]').nth(1).click()


});
test('Dailog pop-up -- model pop-up', async ({ browser }) => {

    const Browser = await browser.newContext()
    const page = await Browser.newPage()

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.pause();
    await page.getByRole('textbox', { name: 'Type to Select Countries' }).fill('cver');

    //======Alert pop-up OK/Cancle======
   // page.on('dialog', dialog => dialog.accept());
   //await page.getByRole('button', { name: 'Confirm' }).click();

   //======Alert pop-up======
    //page.on('dialog', dialog => dialog.dismiss());
    page.on('dialog', dialog => dialog.accept());
    
    await page.locator('[id="alertbtn"]').click();
    await page.getByRole('button', { name: 'Mouse Hover' }).hover();
    await page.getByRole('link', { name: 'Reload' }).click();


})
test('mouse over', async ({ browser }) => {

    const Browser = await browser.newContext()
    const page = await Browser.newPage()
    

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.pause();
    await page.getByRole('button', { name: 'Mouse Hover' }).hover();
    await page.getByRole('link', { name: 'Reload' }).click();
    

})
test.only('iframe handling', async ({ browser }) => {

    const Browser = await browser.newContext()
    const page = await Browser.newPage()

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    const framepage =  page.frameLocator('#courses-iframe')
    await framepage.locator('li a[href*="lifetime-access"]:visible').click()
    const text = framepage.locator('div [class="text"] h2').textContent()
    
    console.log(text.split(" ")[1]);
})