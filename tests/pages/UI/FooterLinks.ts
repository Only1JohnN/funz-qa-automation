// tests/pages/UI/FooterLinks.ts

import { Page, Locator, expect } from '@playwright/test';

export class FooterLinks {
  readonly page: Page;
  
  // Main footer links
  readonly funzAppLink: Locator;
  readonly sendReceiveMoneyLink: Locator;
  readonly payBillsLink: Locator;
  readonly savingsCalculatorLink: Locator;
  readonly blogLink: Locator;
  readonly careersLink: Locator;
  readonly reachOutToUsLink: Locator;
  readonly faqsLink: Locator;
  readonly aboutLink: Locator;
  
  // Legal links
  readonly termsConditionsLink: Locator;
  readonly privacyPolicyLink: Locator;
  
  // Social media links
  readonly facebookLink: Locator;
  readonly twitterLink: Locator;
  readonly instagramLink: Locator;
  readonly linkedinLink: Locator;
  readonly tiktokLink: Locator;
  readonly youtubeLink: Locator;
  readonly snapchatLink: Locator;
  readonly spotifyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Main footer links (selectors from your original script)
    this.funzAppLink = page.getByRole('link', { name: 'Funz App', exact: true });
    this.sendReceiveMoneyLink = page.getByRole('link', { name: 'Send and Receive Money' });
    this.payBillsLink = page.getByRole('link', { name: 'Pay Bills' });
    this.savingsCalculatorLink = page.getByRole('link', { name: 'Savings Calculator' });
    this.blogLink = page.getByRole('contentinfo').getByRole('link', { name: 'Blog' });
    this.careersLink = page.getByRole('link', { name: 'Careers' });
    this.reachOutToUsLink = page.getByRole('link', { name: 'Reach out to us' });
    this.faqsLink = page.getByRole('link', { name: 'FAQs' });
    this.aboutLink = page.getByRole('link', { name: 'About' });
    
    // Legal links
    this.termsConditionsLink = page.getByRole('link', { name: 'Terms and Conditions' });
    this.privacyPolicyLink = this.page.getByRole('link', { name: 'Privacy Policy', exact: true });
    
    // Social media links (adjust selectors as needed)
    this.facebookLink = page.getByRole('link', { name: /facebook/i });
    this.twitterLink = page.locator('a[title*="twitter"]').or(page.getByRole('link', { name: /twitter/i }));
    this.instagramLink = page.getByRole('link', { name: /instagram/i });
    this.linkedinLink = page.getByRole('link', { name: /linkedin/i });
    this.tiktokLink = page.locator('a[title*="tiktok"]').or(page.getByRole('link', { name: /tiktok/i }));
    this.youtubeLink = page.getByRole('link', { name: /youtube/i });
    this.snapchatLink = page.getByRole('link', { name: /snapchat/i });
    this.spotifyLink = page.locator('a[title*="spotify"]').or(page.getByRole('link', { name: /spotify/i }));
  }

  // Main footer link methods (URL assertion inside each)
  async clickFunzApp() {
    await this.funzAppLink.click();
    await expect(this.page).toHaveURL(/\/funz-app/);
  }
  async clickSendReceiveMoney() {
    await this.sendReceiveMoneyLink.click();
    await expect(this.page).toHaveURL(/\/transaction/);
  }
  async clickPayBills() {
    await this.payBillsLink.click();
    await expect(this.page).toHaveURL(/\/pay-bills/);
  }
  async clickSavingsCalculator() {
    await this.savingsCalculatorLink.click();
    await expect(this.page).toHaveURL(/\/savings-calculator/);
  }
  async clickBlog() {
    await this.blogLink.click();
    await expect(this.page).toHaveURL(/\/blog\?filter=view-all/);
  }
  async clickCareers() {
    await this.careersLink.click();
    await expect(this.page).toHaveURL(/\/jobs/);
  }
  async clickReachOutToUs() {
    await this.reachOutToUsLink.click();
    await expect(this.page).toHaveURL(/\/contact-us/);
  }
  async clickFaqs() {
    await this.faqsLink.click();
    await expect(this.page).toHaveURL(/\/faq/);
  }
  async clickAbout() {
    await this.aboutLink.click();
    await expect(this.page).toHaveURL(/\/our-story/);
  }
  async clickTermsConditions() {
    await this.termsConditionsLink.click();
    await expect(this.page).toHaveURL(/\/terms-and-conditions/);
  }
  async clickPrivacyPolicy() {
    await this.privacyPolicyLink.click();
    await expect(this.page).toHaveURL(/\/privacy-policy/);
  }

  // Helper for links that open in a new tab
  private async clickNewTab(link: Locator) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      link.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;  // Return the new page instead of closing
  }

  // Helper for links that navigate the same tab (e.g., TikTok)
  private async clickSameTab(link: Locator, expectedUrlPattern: RegExp) {
    await link.click();
    await expect(this.page).toHaveURL(expectedUrlPattern);
  }

  // Social media click methods
  async clickFacebook() { return this.clickNewTab(this.facebookLink); }
  async clickTwitter() { return this.clickNewTab(this.twitterLink); }
  async clickInstagram() { return this.clickNewTab(this.instagramLink); }
  async clickLinkedin() { return this.clickNewTab(this.linkedinLink); }
  async clickYoutube() { return this.clickNewTab(this.youtubeLink); }
  async clickSnapchat() { return this.clickNewTab(this.snapchatLink); }
  async clickSpotify() { return this.clickNewTab(this.spotifyLink); }
  
  // TikTok navigates in the same tab
  async clickTiktok() {
    await this.clickSameTab(this.tiktokLink, /tiktok\.com/);
  }
}