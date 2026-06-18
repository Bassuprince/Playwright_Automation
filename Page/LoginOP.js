export class LoginOP{
    constructor(page)
    {
        this.page = page
        this.Enterusernamer = page.locator('[placeholder="email@example.com"]')
        this.Enterpassword = page.locator('[placeholder="enter your passsword"]')
        this.Selectloginbutton = page.locator('[name="login"]')
    }
    
    async Login_page(username,password){
        await this.Enterusernamer.fill(username)
        await this.Enterpassword.fill(password)
        await this.Selectloginbutton.click()
    }
}