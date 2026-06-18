// Page Object Model for Contacts App Main Page
export class ContactsPage {
  constructor(page) {
    this.page = page;
    
    // Main navigation
    this.contactsHeading = page.getByRole('heading', { name: 'Contacts' });
    this.addContactButton = page.getByRole('button', { name: 'Add Contact' });
    this.trashIcon = page.locator('a .lucide-trash-2');
    this.trashHeading = page.getByRole('heading', { name: 'Trash' });
    this.contactsTab = page.getByRole('tab', { name: 'Contacts' });
    
    // Contact form fields
    this.firstNameInput = page.getByRole('textbox', { name: 'First name (required)' });
    this.countryDropdown = page.locator('[id="add-phone-0-country"]');
    this.editCountryDropdown = page.locator('[id="edit-phone-0-country"]');
    this.countryOption = (country) => page.getByRole('option', { name: country });
    this.phoneInput = page.locator('[id="phones.0.value"]');
    this.editPhoneInput = page.locator('[id="edit-phone-0-value"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    
    // Edit and delete
    this.editButton = page.locator('[aria-label^="Edit"]');
    this.moreActionsButton = page.locator('[aria-label^="More actions"]');
    this.sendToTrashMenuItem = page.getByRole('menuitem', { name: 'Send to Trash' });
    this.moveToTrashButton = page.getByRole('button', { name: 'Move to Trash' });
    this.moveToTrashConfirmation = page.getByText('Move to Trash?');
    this.restoreButton = page.getByRole('button', { name: 'Restore' });
    
    // Messages
    this.editContactHeading = page.getByText('Edit Contact');
    this.contactUpdatedMessage = page.getByText('Contact updated successfully.');
    this.contactTable = page.locator('tbody tr');
  }

  async addContact(firstName, country = 'IN', phoneNumber = '+917634526178') {
    await this.addContactButton.click();
    await this.firstNameInput.fill(firstName);
    await this.countryDropdown.click();
    await this.countryOption(country).click();
    await this.phoneInput.fill(phoneNumber);
    await this.saveButton.click();
  }

  async editContact(newFirstName, newPhoneNumber) {
    await this.editButton.click();
    await this.editContactHeading.isVisible();
    await this.firstNameInput.fill(newFirstName);
    await this.editPhoneInput.fill(newPhoneNumber);
    await this.saveButton.click();
    await this.contactUpdatedMessage.isVisible();
  }

  async deleteContact(targetPhoneNumber) {
    await this.moreActionsButton.click();
    await this.sendToTrashMenuItem.isVisible();
    await this.sendToTrashMenuItem.click();
    await this.moveToTrashConfirmation.isVisible();
    await this.moveToTrashButton.click();
  }

  async verifyContactInTrash(targetPhoneNumber) {
    await this.trashIcon.click();
    await this.contactTable.first().isVisible();
    await this.trashHeading.isVisible();
    await this.contactsTab.isVisible();

    const rows = this.page.locator('tbody tr');
    const rowCount = await rows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const getNumber = await rows.nth(i).locator('td').nth(2).textContent();
      if (getNumber?.trim() === targetPhoneNumber) {
        console.log(`Contact found in trash: ${getNumber}`);
        await rows.nth(i).getByRole('button', { name: 'Restore' }).click();
        break;
      }
    }
    await this.restoreButton.click();
  }
}
