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

  async handleCountryMismatch() {
    await this.page.waitForLoadState('domcontentloaded');
  
    // Get current selected country from combobox text
    const combobox = this.page.getByRole('combobox', { name: 'select event location' });
    const currentCountry = await combobox.textContent();
    if (currentCountry?.includes('Nigeria')) return; // Already correct
  
    // Open combobox and wait for options
    await combobox.click();
    const nigeriaOption = this.page.getByRole('option', { name: 'Nigeria' });
    await nigeriaOption.waitFor({ state: 'visible' });
    await nigeriaOption.click();
  
    // Verify URL and content changed to Nigeria
    await expect(this.page).toHaveURL(/country=NG|nigeria/i);
    await expect(this.page.getByText(/No upcoming Events/i)).not.toBeVisible();
  }

  async selectEvent() {
    await this.handleCountryMismatch();

    // Ensure event link is visible before interaction
    await this.eventItem.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/\/events\/[\w-]+/, { timeout: 30000 }),
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

  async clickAddToCart() {
  await this.addToCartButton.click();
  }
  
  async assertQuantityErrorVisible() {
    await expect(this.quantityError.first()).toBeVisible();
  }
}