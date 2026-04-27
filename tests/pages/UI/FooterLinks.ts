import {Page, Locator} from '@playwright/test';

export class FooterLinks {
  readonly page: Page;
  readonly aboutUsLink: Locator;
  readonly contactUsLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly termsOfServiceLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aboutUsLink = page.getByRole('link', { name: 'About Us' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact Us' });
    this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });
    this.termsOfServiceLink = page.getByRole('link', { name: 'Terms of Service' });
  }

  async clickAboutUs() {
    await this.aboutUsLink.click();
  }

  async clickContactUs() {
    await this.contactUsLink.click();
  }

  async clickPrivacyPolicy() {
    await this.privacyPolicyLink.click();
  }

  async clickTermsOfService() {
    await this.termsOfServiceLink.click();
  }
}