import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/UI/HomePage';
import { EventPage } from '../../pages/UI/EventPage';
import { CartPage } from '../../pages/UI/CartPage';
import { CheckoutPage } from '../../pages/UI/CheckoutPage';
import { PaymentPage } from '../../pages/UI/PaymentPage';
import { LoginPage } from '../../pages/UI/LoginPage';
import { testUsers } from '../../fixtures/testData';

test.describe('Cart Management @regression', () => {
  let homePage: HomePage;
  let eventPage: EventPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let paymentPage: PaymentPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
    eventPage = new EventPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
    loginPage = new LoginPage(page);
    await homePage.clickAcceptCookies();
  });

  // -------- Unauthenticated Cart Tests ----------
  test.describe('Unauthenticated user cart actions', () => {
    test('TC-35: Unauthenticated user can not add ticket to cart @smoke', async ({ page }) => {
      await eventPage.gotoEvents();
      await eventPage.selectEvent();
      await eventPage.clickAddToCart();
      // Should show error because no ticket quantity selected – verify error appears
      await eventPage.assertQuantityErrorVisible();
      // Increase quantity and add again
      await eventPage.increaseTicketQuantity();
      await eventPage.clickAddToCart();
      await loginPage.assertOnLoginPage();
    });
});


  // -------- Authenticated Cart Tests ----------
  test.describe('Authenticated user cart actions', () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test in this block
      
      await page.goto('/'); // ensure on home page after login
      await homePage.clickLogin();
      await loginPage.assertOnLoginPage();

      const { validLogin } = testUsers;
      await loginPage.login(validLogin.email, validLogin.password);
      await loginPage.assertSuccessfulLogin();
      
    });

    test('TC-36: Authenticated user can add ticket to cart and view cart @smoke', async ({ page }) => {
      await cartPage.assertOnCartPage();

      if (!(await cartPage.isCartEmpty())) {
        await cartPage.expandTicket();
        await cartPage.clearCart();
      }

      await cartPage.assertCartEmpty();

      // Continue flow
      await cartPage.goToEvents();
      await eventPage.selectEvent();
      await eventPage.increaseTicketQuantity();
      await eventPage.clickAddToCart();
      await cartPage.goToCart();
      await cartPage.assertOnCartPage();
      await cartPage.expandTicket();
      // Verify ticket details appear
      await expect(page.getByText('Access Pass Event')).toBeVisible();
    });

    test('TC-37: Authenticated user can proceed to checkout from cart', async ({ page }) => {
      // Add ticket to cart
      await cartPage.assertOnCartPage();
      
      // 👇 Core condition
      if (await cartPage.isCartEmpty()) {
        // Add ticket only if needed
        await cartPage.goToEvents();
        await eventPage.selectEvent();
        await eventPage.increaseTicketQuantity();
        await eventPage.clickAddToCart();
      
        await cartPage.goToCart();
        await cartPage.assertOnCartPage();
      }

      // 👇 At this point, cart MUST have an item
      await cartPage.expandTicket();
      await cartPage.clickCompleteCheckout();
      await cartPage.clickPayNow();

      // Verify navigation
      await expect(page).toHaveURL(/\/sandbox/);
    });

    test('TC-38: Authenticated user can clear cart successfully', async ({ page }) => {
      await cartPage.assertOnCartPage();

      // 👇 If empty, first add an item
      if (await cartPage.isCartEmpty()) {
        await cartPage.goToEvents();
        await eventPage.selectEvent();
        await eventPage.increaseTicketQuantity();
        await eventPage.clickAddToCart();
      
        await cartPage.goToCart();
        await cartPage.assertOnCartPage();
      
        // 🔒 Ensure item was actually added
        await expect(cartPage.emptyCartMessage).not.toBeVisible();
      }
    
      // 👇 At this point, cart MUST have items
      await cartPage.expandTicket();
      await cartPage.clearCart();
    
      // 🔒 Strong assertion (post-condition)
      await cartPage.assertCartEmpty();
    
      // Continue navigation check
      await cartPage.goToEvents();
      await expect(page).toHaveURL(/\/events/);
    });
  });
});