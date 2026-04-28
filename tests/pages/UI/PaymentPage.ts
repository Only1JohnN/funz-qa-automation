import { Page, Locator, expect } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly cardOption: Locator;
  readonly testCardSelect: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardOption = page.getByRole('listitem').filter({ hasText: 'Card' });
    this.testCardSelect = page.getByRole('combobox');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async selectCardPayment() {
    await this.cardOption.click();
  }

  async selectTestSuccessCard() {
    await this.testCardSelect.selectOption('Success - 1111');
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}