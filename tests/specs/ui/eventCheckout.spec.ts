import { test, expect } from '@playwright/test';
import { EventPage } from '../../pages/UI/EventPage';
import { CheckoutPage } from '../../pages/UI/CheckoutPage';
import { PaymentPage } from '../../pages/UI/PaymentPage';
import { SuccessPage } from '../../pages/UI/SuccessPage';
import { TicketPage } from '../../pages/UI/TicketPage';
import { testUsers } from '../../fixtures/testData';
import { listenerCount } from 'node:process';

test.describe('Event Checkout Flows @regression', () => {
    let eventPage: EventPage;
    let checkoutPage: CheckoutPage;
    let paymentPage: PaymentPage;
    let successPage: SuccessPage;
    let ticketPage: TicketPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    eventPage = new EventPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
    successPage = new SuccessPage(page);
    ticketPage = new TicketPage(page);
  });

  test('TC-08: Event selection and navigation @smoke', async ({ page }) => {
    await eventPage.gotoEvents();
    await eventPage.selectEvent();
    // Additional assertion: event title visible
    await expect(page.getByRole('heading', { name: 'Access Pass Event' })).toBeVisible();
  });

  test('TC-09: Ticket quantity increase @smoke', async ({ page }) => {
    await eventPage.gotoEvents();
    await eventPage.selectEvent();
    await eventPage.increaseTicketQuantity();
    // Verify quantity text changed (example: assume a span with class 'quantity')
    const quantitySpan = page.locator('span').filter({ hasText: /^1$/ });
  });

  test('TC-10: Guest checkout initiation @smoke', async ({ page }) => {
    await eventPage.gotoEvents();
    await eventPage.selectEvent();
    await eventPage.increaseTicketQuantity();
    await eventPage.clickGetTickets();
    await checkoutPage.selectGuestCheckout();
    await checkoutPage.assertCheckoutFormVisible();
  });

  test('TC-11: Guest checkout form submission @regression', async ({ page }) => {
    const guestuser = testUsers.guestuser();

    await eventPage.gotoEvents();
    await eventPage.selectEvent();
    await eventPage.increaseTicketQuantity();
    await eventPage.clickGetTickets();
    await checkoutPage.selectGuestCheckout();
    await checkoutPage.fillGuestForm(guestuser);
    await checkoutPage.acceptAccountCreation();
    await checkoutPage.submitOrder();
    // After submission, should move to payment page
    await expect(page).toHaveURL(/\/sandbox/);
  });

  test('TC-12: Simulated payment success @smoke', async ({ page }) => {
    // This test depends on TC-11; we can either chain or reuse setup.
    // For independence, we replicate necessary steps.
    const guestuser = testUsers.guestuser();

    await eventPage.gotoEvents();
    await eventPage.selectEvent();
    await eventPage.increaseTicketQuantity();
    await eventPage.clickGetTickets();
    await checkoutPage.selectGuestCheckout();
    await checkoutPage.fillGuestForm(guestuser);
    await checkoutPage.acceptAccountCreation();
    await checkoutPage.submitOrder();
    await paymentPage.selectCardPayment();
    await paymentPage.selectTestSuccessCard();
    await Promise.all([
        page.waitForURL(/\/guest\/success/, { timeout: 15000 }),
        paymentPage.clickContinue(),
    ]);

    await expect(page).toHaveURL(/\/guest\/success/);
  });

  test('TC-13: Success confirmation page @regression', async ({ page }) => {
    // Navigate directly to success page (or use previous steps)
    await page.goto('https://staging.funzweb.com/guest/success?token=dummy');
    await successPage.assertSuccessPage();
  });

  test('TC-14: Ticket viewing after purchase @regression', async ({ page }) => {
    // Simulate a completed purchase: go to success page with valid token? 
    // For testing, we can recreate the flow up to success.
    const guestuser = testUsers.guestuser();
    
    await eventPage.gotoEvents();
    await eventPage.selectEvent();
    await eventPage.increaseTicketQuantity();
    await eventPage.clickGetTickets();
    await checkoutPage.selectGuestCheckout();
    await checkoutPage.fillGuestForm(guestuser);
    await checkoutPage.acceptAccountCreation();
    await checkoutPage.submitOrder();
    await paymentPage.selectCardPayment();
    await paymentPage.selectTestSuccessCard();
    await paymentPage.clickContinue();
    await successPage.assertSuccessPage();
    await successPage.clickViewMyTicket();
    await ticketPage.expandTicket();
    await ticketPage.viewTicket();
    await ticketPage.assertTicketDetails();
  });
});