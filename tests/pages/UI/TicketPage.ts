import { Page, Locator, expect } from '@playwright/test';

export class TicketPage {
  readonly page: Page;
  readonly expandTicketButton: Locator;
  readonly viewYourTicketButton: Locator;
  readonly ticketHeading: Locator;
  readonly orderIdText: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.expandTicketButton = page.getByRole('button', { name: 'Access Pass Event Access Pass' });
    this.viewYourTicketButton = page.getByRole('button', { name: 'View your ticket' });
    this.ticketHeading = page.getByRole('heading', { name: 'Access Pass Event' });
    this.orderIdText = page.getByText(/Ticket Order ID:/);
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async expandTicket() {
    await this.expandTicketButton.click();
  }

  async viewTicket() {
    await this.viewYourTicketButton.click();
  }

  async assertTicketDetails() {
    await expect(this.ticketHeading).toBeVisible();
    await expect(this.orderIdText).toBeVisible();
  }

  async cancelTicketModal() {
    await this.cancelButton.click();
    await expect(this.cancelButton).not.toBeVisible();
    await expect(this.viewYourTicketButton).toBeVisible();
  }
}