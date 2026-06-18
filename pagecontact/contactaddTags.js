import { expect } from '@playwright/test'
export class contactaddTags{
    constructor(page){
        this.page = page;

        this.tagsMenu = page.getByRole('link', { name: 'Tags' });
        this.tagsHeading = page.getByRole('heading', { name: 'Tags' });
        this.newTagButton = page.getByRole('button', { name: 'New Tag' });
        this.newTagTextbox = page.getByRole('textbox', { name: 'New tag label' });
        this.createTagButton = page.getByRole('button', { name: 'Create', exact: true });
    }
    async createnewtag(taglabel){
        await this.tagsMenu.click()
        await expect(this.tagsHeading).toBeVisible()
        await this.newTagButton.click()
        await this.newTagTextbox.fill(taglabel);
        await this.createTagButton.click()
        await expect(this.tagsHeading).toBeVisible()

    }

}