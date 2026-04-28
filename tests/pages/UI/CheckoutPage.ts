import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly guestCheckoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly phoneInput: Locator;
  readonly accountCheckbox: Locator;
  readonly completePurchaseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.guestCheckoutButton = page.getByRole('button', { name: 'Guest Checkout' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email Address *', exact: true });
    this.confirmEmailInput = page.getByRole('textbox', { name: 'Confirm Email Address *' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone Number *' });
    this.accountCheckbox = page.getByRole('checkbox', { name: 'I understand an account will' });
    this.completePurchaseButton = page.getByRole('button', { name: 'Complete Your Purchase' });
  }

  async selectGuestCheckout() {
    await this.guestCheckoutButton.click();
  }

  async fillGuestForm(data: { firstName: string; lastName: string; email: string; phone: string }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.confirmEmailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async acceptAccountCreation() {
    await this.accountCheckbox.check();
  }

  async submitOrder() {
    await this.completePurchaseButton.click();
  }

  async assertCheckoutFormVisible() {
    await expect(this.firstNameInput).toBeVisible();
  }
}