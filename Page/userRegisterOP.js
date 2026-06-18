export class userRegisterOp{
    constructor(page){
        this.page = page
        this.EnteruserFirstname = page.locator('[formcontrolname="firstName"]')
        this.Enterlastname = page.locator('[type="lastName"]')
        this.EnteruserEmail = page.locator('[type="email"]')
        this.EnterPhonenumber = page.locator('[placeholder="enter your number"]')
        this.SelectOccupation = page.locator('[formcontrolname="occupation"]')
        this.SelectGender = page.locator('[value="Male"]')
        this.EnteruserPassword = page.locator('[formcontrolname="userPassword"]')
        this.EnterConfirmPassword = page.locator('[formcontrolname="confirmPassword"]')
        this.selectcheckbox = page.locator('[formcontrolname="required"]')
        this.RegisterButton = page.locator('[value="Register"]')
        this.clickonlogin = page.locator('[class="btn btn-primary"]')

    }

    async RegisterPgae(firstName,lastName,email,phone,occupation,password)
    {
    await this.EnteruserFirstname.fill(firstName);
    await this.Enterlastname.fill(lastName)
    await this.EnteruserEmail.fill(email)
    await this.EnterPhonenumber.fill(phone)
    await this.SelectOccupation.selectOption(occupation)
    await this.SelectGender.check()
    await this.EnteruserPassword.fill(password)
    await this.EnterConfirmPassword.fill(password)
    await this.selectcheckbox.check()
    await this.RegisterButton.click()
    await this.clickonlogin.click()

    }
}