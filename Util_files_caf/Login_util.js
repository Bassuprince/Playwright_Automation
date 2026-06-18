export async function login(page,email,password)
 {

    await page.goto('https://kpi-dash-staging.indeadesignsystems.com/login');

    await page.locator('[data-testid="sign-in-button"]').click();

    await page.locator('[placeholder="Email address or mobile number"]').fill(email);

    await page.locator('#nextbtn').click();

    await page.locator('[placeholder="Enter password"]').fill(password);

    await page.locator('#nextbtn').click();
    await page.locator('[data-testid="sidebar-item-/dashboard"]').waitFor();
}
 async function logout(page) {

    await page.locator('[data-testid="sidebar-logout-button"]').click();

    // Wait until login page is visible
    await page.locator('[data-testid="sign-in-button"]').waitFor();
}
module.exports = { login,logout};