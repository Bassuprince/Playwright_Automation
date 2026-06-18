export class LoginPage{
    constructor(page){
/*
        this.page = page;

        this.signInButton = page.locator('[data-testid="sign-in-button"]');

        this.usernameField = page.locator('[placeholder="Email address or mobile number"]');

        this.nextButton = page.locator('#nextbtn');

        this.passwordField = page.locator('[placeholder="Enter password"]');

        this.logoutButton = page.locator('[data-testid="sidebar-logout-button"]');

        this.dashboardMenu = page.locator('[data-testid="sidebar-item-/dashboard"]');
*/

        this.page = page
        this.sigin = page.locator('[data-testid="sign-in-button"]')
        this.username = page.locator('[placeholder="Email address or mobile number"]')
        this.next = page.locator('#nextbtn')
        this.password = page.locator('[placeholder="Enter password"]')
        this.login = page.locator('#nextbtn')
        

        this.logout = page.locator('[data-testid="sidebar-logout-button"]')
    }

    async lanchURL(){
         await this.page.goto('https://kpi-dash-staging.indeadesignsystems.com/login')
    }
    async logintoKPIapp(email,password) {
        await this.sigin.click();
        await this.username.fill(email);
        await this.next.click();
        await this.password.fill(password);
        await this.login.click();
        // Wait for application page after login
        await this.page.locator('[data-testid="sidebar-item-/dashboard"]').waitFor();
    }
    async Logout(){
        await this.logout.click()
         // Wait until login page appears
          await this.page.waitForURL('**/login');
    }
}
//module.export = {LoginPage}