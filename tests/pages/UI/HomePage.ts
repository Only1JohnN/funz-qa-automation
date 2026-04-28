// tests/pages/UI/HomePage.ts

import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly acceptCookies: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.acceptCookies = page.getByRole('button', { name: 'Accept Cookies' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickAcceptCookies() {
    await this.acceptCookies.click();
  }

  async clickRegister() {
    await this.registerLink.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }
}