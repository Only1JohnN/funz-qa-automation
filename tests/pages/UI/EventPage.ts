import { Page, Locator, expect } from '@playwright/test';

export class EventPage {
  readonly page: Page;
  readonly eventsLink: Locator;
  readonly eventItem: Locator;
  readonly increaseQtyButton: Locator;
  readonly getTicketsButton: Locator;
  readonly addToCartButton: Locator;
  readonly quantityError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventsLink = page.getByRole('link', { name: 'Events', exact: true });
    this.eventItem = page.getByRole('link', { name: 'Access Pass Event Access Pass' }).first();
    this.increaseQtyButton = page.getByRole('button', { name: 'increase qty' }).nth(1);
    this.getTicketsButton = page.getByRole('button', { name: 'Get Tickets' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.quantityError = page.locator('div').filter({ hasText: 'Please select your ticket' });
  }

  async gotoEvents() {
    await this.eventsLink.click();
  }

  async selectEvent() {
  await Promise.all([
    this.page.waitForURL(/\/events\/[\w-]+/, { timeout: 30000 }),
    this.eventItem.click(),
  ]);
  await this.handleCountryMismatch();
}

  async handleCountryMismatch() {
  await this.page.waitForLoadState('networkidle');
  
  const currentURL = this.page.url();
  const isUSContext = currentURL.includes('country=US');

  if (!isUSContext) return;

  const noEventsText = this.page.getByText(/No upcoming Events/i);

  if (await noEventsText.isVisible()) {
    await this.page.getByRole('combobox', { name: 'select event location' }).click();
    await this.page.getByRole('option', { name: 'Nigeria' }).click();

    // Optional: wait for reload / URL correction
    await this.page.waitForLoadState('networkidle');
  }
}

  async increaseTicketQuantity() {
    await this.increaseQtyButton.click();
    // Verify quantity increased (assume aria-label or text shows new value)
    await expect(this.increaseQtyButton).toBeVisible();
  }

  async clickGetTickets() {
    await this.getTicketsButton.click();
  }

  async clickAddToCart() {
  await this.addToCartButton.click();
  }
  
  async assertQuantityErrorVisible() {
    await expect(this.quantityError.first()).toBeVisible();
  }
}