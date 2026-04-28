import { Page, Locator, expect } from '@playwright/test';

export class SuccessPage {
  readonly page: Page;
  readonly successHeading: Locator;
  readonly viewTicketButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successHeading = page.getByRole('heading', { name: 'Yay! 🎉 Congratulations! 🎊' });
    this.viewTicketButton = page.getByRole('button', { name: 'View My Ticket' });
  }

  async assertSuccessPage() {
  await expect(this.successHeading).toBeVisible({ timeout: 15000 });
  await expect(this.page).toHaveURL(/\/guest\/success/);
 }

  async clickViewMyTicket() {
    await this.viewTicketButton.click();
  }
}