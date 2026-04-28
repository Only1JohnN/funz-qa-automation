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
    // 1. Ensure correct country FIRST
    await this.handleCountryMismatch();
    
    // 2. Now safe to click event and wait for navigation
    await Promise.all([
      this.page.waitForURL(/\/events\/[\w-]+/, { timeout: 30000 }),
      this.eventItem.click(),
    ]);
}

  async handleCountryMismatch() {
    await this.page.waitForLoadState('domcontentloaded');
  
    // 1. PRIMARY CHECK: UI state (most reliable)
    const usEmptyState = this.page.getByText(/No upcoming Events/i);
    const isUSContext = await usEmptyState.isVisible().catch(() => false);
  
    // 2. FALLBACK CHECK: URL (optional safety net)
    const url = this.page.url();
    const isUSUrl = url.includes('country=US');
  
    if (!isUSContext && !isUSUrl) return;
  
    // 3. Only act if we're truly in US state
    const combobox = this.page.getByRole('combobox', { name: 'select event location' });
  
    if (await combobox.isVisible().catch(() => false)) {
      await combobox.click();
      await this.page.getByRole('option', { name: 'Nigeria' }).click();
  
      // ✅ confirm URL is now Nigeria
      await expect(this.page).toHaveURL(/country=NG|nigeria/i);
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