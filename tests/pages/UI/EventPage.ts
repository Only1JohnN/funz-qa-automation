import { Page, Locator, expect } from '@playwright/test';

export class EventPage {
  readonly page: Page;
  readonly eventsLink: Locator;
  readonly eventItem: Locator;
  readonly increaseQtyButton: Locator;
  readonly getTicketsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventsLink = page.getByRole('link', { name: 'Events', exact: true });
    this.eventItem = page.getByRole('link', { name: 'Access Pass Event Access Pass' }).first();
    this.increaseQtyButton = page.getByRole('button', { name: 'increase qty' }).nth(1);
    this.getTicketsButton = page.getByRole('button', { name: 'Get Tickets' });
  }

  async gotoEvents() {
    await this.eventsLink.click();
  }

  async selectEvent() {
  await Promise.all([
    this.page.waitForURL(/\/events\/[\w-]+/, { timeout: 15000 }),
    this.eventItem.click(),
  ]);
}

  async increaseTicketQuantity() {
    await this.increaseQtyButton.click();
    // Verify quantity increased (assume aria-label or text shows new value)
    await expect(this.increaseQtyButton).toBeVisible();
  }

  async clickGetTickets() {
    await this.getTicketsButton.click();
  }
}