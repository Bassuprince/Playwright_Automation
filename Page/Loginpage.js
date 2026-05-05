export class Loginpage { 
    constructor(page) {
        this.page = page
        this.Username_Text = page.locator('[data-test="username"]')
        this.Password_Text = page.locator('[data-test="password"]')
        this.Login_Button = page.locator('[data-test="login-button"]')
        this.menu = page.locator('[id="react-burger-menu-btn"]')
        this.Log_out = page.locator('[id="logout_sidebar_link"]')
    }
    async LaunchURL(){
          await this.page.goto('https://www.saucedemo.com/');
    }
    async login(username,password){
        await this.Username_Text.fill(username)
        await this.Password_Text.fill(password)
        await this.Login_Button.click()
    }
    async Logout(){
        await this.menu.click()
        await this.Log_out.click()
    }
}
