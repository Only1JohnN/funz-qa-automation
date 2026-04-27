import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly userRoleText: Locator;
  readonly organizerRoleText: Locator;
  readonly continueButton: Locator;
  readonly backButton: Locator;
  readonly loginLink: Locator;
  readonly signupLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userRoleText = page.getByText('Sign up as a User');
    this.organizerRoleText = page.getByText('Sign up as an Organizer');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.signupLink = page.getByRole('link', { name: 'Sign up' });
  }

  async selectUserRole() {
    await this.userRoleText.click();
  }

  async selectOrganizerRole() {
    await this.organizerRoleText.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickBack() {
    await this.backButton.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickSignup() {
    await this.signupLink.click();
  }

  async assertOnRoleSelectionPage() {
    await expect(this.page).toHaveURL(/\/signup/);
    await expect(this.userRoleText).toBeVisible();
    await expect(this.organizerRoleText).toBeVisible();
  }

  async assertOnUserSignupPage() {
    await expect(this.page).toHaveURL(/\/signup\/user\/?/);
    await expect(this.page.getByRole('heading', { name: /Sign Up/i })).toBeVisible();
  }

  async assertOnOrganizerSignupPage() {
    await expect(this.page).toHaveURL(/\/signup\/organizer\/?/);
    await expect(this.page.getByRole('heading', { name: /Sign Up as an Organizer/i })).toBeVisible();
  }
}