// tests/specs/ui/authFlows.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/UI/HomePage'; 
import { RegisterPage } from '../../pages/UI/RegisterPage';
import { LoginPage } from '../../pages/UI/LoginPage';
import { PasswordResetPage } from '../../pages/UI/PasswordResetPage';
import { testConfig } from '../../config/testConfig';
import { testUsers } from '../../fixtures/testData';

test.describe('Authentication & Navigation Flows @regression', () => {
  let homePage: HomePage;
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let resetPage: PasswordResetPage;

  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto(testConfig.baseURL);
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    resetPage = new PasswordResetPage(page);
  });

  test('TC-01: User can select "User" role and reach signup form @smoke', async () => {
    await homePage.clickAcceptCookies();
    await homePage.clickRegister();
    await registerPage.selectUserRole();
    await registerPage.clickContinue();
    await registerPage.assertOnUserSignupPage();
  });

  test('TC-02: User can select "Organizer" role and reach signup form @smoke', async () => {
    await homePage.clickAcceptCookies();
    await homePage.clickRegister();
    await registerPage.selectOrganizerRole();
    await registerPage.clickContinue();
    await registerPage.assertOnOrganizerSignupPage();
  });

  test('TC-03: Back button returns from user signup to role selection @smoke', async () => {
    await homePage.clickAcceptCookies();
    await homePage.clickRegister();
    await registerPage.selectUserRole();
    await registerPage.clickContinue();
    await registerPage.assertOnUserSignupPage();

    await registerPage.clickBack();
    await registerPage.assertOnRoleSelectionPage();
  });

  test('TC-04: "Reset it" link leads to password reset page @smoke', async () => {
    await homePage.clickAcceptCookies();
    await homePage.clickLogin();
    await loginPage.assertOnLoginPage();
    await loginPage.clickResetPassword();
    await resetPage.assertOnResetPage();
  });

  test('TC-05: Navigation between Login and Register pages works @smoke', async () => {
    // Register → Login
    await homePage.clickAcceptCookies();
    await homePage.clickRegister();
    await registerPage.assertOnRoleSelectionPage();
    await registerPage.clickLogin();
    await loginPage.assertOnLoginPage();

    // Login → Sign up
    await loginPage.clickSignup();
    await registerPage.assertOnRoleSelectionPage();
  });

  test('TC-06: User can see error message with invalid credentials @smoke', async ({ page }) => {
    // Navigate to login
    await homePage.clickAcceptCookies();
    await homePage.clickLogin();
    await loginPage.assertOnLoginPage();

    // Attempt login with invalid credentials
    const { invalidLogin } = testUsers;
    await loginPage.login(invalidLogin.email, invalidLogin.password);

    // Assert error message appears
    await loginPage.assertErrorMessage();
  });

  test('TC-07: User can successfully log in with valid credentials @smoke', async ({ page }) => {
    // This test requires a valid staging account – set via .env
    test.skip(!process.env.TEST_USER_EMAIL, 'No valid test credentials provided');

    await homePage.clickAcceptCookies();
    await homePage.clickLogin();
    await loginPage.assertOnLoginPage();

    const { validLogin } = testUsers;
    await loginPage.login(validLogin.email, validLogin.password);

    await loginPage.assertSuccessfulLogin();
  });

  // test('TC-08: Complete user registration flow (happy path) @regression', async ({ page }) => {
  //   const { user } = testUsers; // dynamic email to avoid duplicates
    
  //   await homePage.clickAcceptCookies();
  //   await homePage.clickRegister();
  //   await registerPage.selectUserRole();
  //   await registerPage.clickContinue();

  //   // Fill user registration form (adjust selectors to your actual form)
  //   await page.getByLabel('First name').fill(user.firstName);
  //   await page.getByLabel('Last name').fill(user.lastName);
  //   await page.getByLabel('Email').fill(user.email);
  //   await page.getByLabel('Password').fill(user.password);
  //   await page.getByLabel('Confirm password').fill(user.password);
  //   await page.getByRole('button', { name: 'Sign up' }).click();

  //   // Assert successful registration – e.g., redirect to dashboard or show success message
  //   await expect(page).toHaveURL(/\/dashboard/);
  //   await expect(page.getByText('Welcome, John')).toBeVisible();
  // });
});