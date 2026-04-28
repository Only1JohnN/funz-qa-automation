import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly ticketItem: Locator;          // e.g., 'Access Pass Event Access Pass' button in cart
  readonly completeCheckoutButton: Locator;
  readonly payNowButton: Locator;
  readonly clearOrderButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly goToEventsButton: Locator;
  readonly onCartPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'My Cart' });
    this.ticketItem = page.getByRole('button', { name: 'Access Pass Event Access Pass' });
    this.completeCheckoutButton = page.getByRole('button', { name: 'Complete Checkout' });
    this.payNowButton = page.getByRole('button', { name: 'Pay Now' });
    this.clearOrderButton = page.getByRole('button', { name: 'Clear Order' });
    this.emptyCartMessage = page.getByText('No ticket in cart');
    this.goToEventsButton = page.getByRole('button', { name: 'Go to Events' });
    this.onCartPage = page.getByRole('link', { name: 'My Cart' });
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async assertOnCartPage() {
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.onCartPage).toBeVisible();
  }

  async expandTicket() {
    await this.ticketItem.click();
  }

  async clickCompleteCheckout() {
    await this.completeCheckoutButton.click();
  }

  async clickPayNow() {
    await this.payNowButton.click();
  }

  async clearCart() {
    await this.clearOrderButton.click();
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async assertCartEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }
  async goToEvents() {
    await this.goToEventsButton.click();
  }
}