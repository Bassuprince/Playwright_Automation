import { expect } from '@playwright/test'
export class contactusermanagement{
    constructor(page){
        this.page = page;
        this.usermanagementMenu = page.getByRole('link', { name: 'User Management' })
        this.viewtheuserusermanagement = page.getByRole('heading', { name: 'User Management' })

        this.selectInviteUserButton = page.getByRole('button', { name: 'Invite member' })
        this.addInvitUserEmail = page.getByRole('textbox', { name: 'Email *' })
        this.sendInvitButton = page.getByRole('button', { name: 'Send invite' })


    }
    async inviteUserManagement(InviteEmail){
      await this.usermanagementMenu.click()
      await expect(this.viewtheuserusermanagement).toBeVisible()
      await this.selectInviteUserButton.click()
      await this.addInvitUserEmail.fill(InviteEmail)
      await this.sendInvitButton.click()
      await expect (this.sendInvitButton).toBeHidden({ timeout: 6000 })

    }
}
