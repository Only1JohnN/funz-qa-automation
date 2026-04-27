import { Page, expect } from '@playwright/test';

export class PasswordResetPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertOnResetPage() {
    await expect(this.page).toHaveURL(/\/reset-password/);
    await expect(this.page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /Reset/i })).toBeVisible();
  }
}