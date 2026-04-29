// // tests/specs/ui/footerLinks.spec.ts

// import { test, expect } from '@playwright/test';
// import { FooterLinks } from '../../pages/UI/FooterLinks';

// test.describe('Footer Links Verification @regression', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://staging.funzweb.com/');
//   });

//   // Main footer links – URL assertion is inside each page object method
//   const footerLinks = [
//     { name: 'Funz App', click: (f: FooterLinks) => f.clickFunzApp() },
//     { name: 'Send and Receive Money', click: (f: FooterLinks) => f.clickSendReceiveMoney() },
//     { name: 'Pay Bills', click: (f: FooterLinks) => f.clickPayBills() },
//     { name: 'Savings Calculator', click: (f: FooterLinks) => f.clickSavingsCalculator() },
//     { name: 'Blog', click: (f: FooterLinks) => f.clickBlog() },
//     { name: 'Careers', click: (f: FooterLinks) => f.clickCareers() },
//     { name: 'Reach out to us', click: (f: FooterLinks) => f.clickReachOutToUs() },
//     { name: 'FAQs', click: (f: FooterLinks) => f.clickFaqs() },
//     { name: 'About', click: (f: FooterLinks) => f.clickAbout() },
//     { name: 'Terms and Conditions', click: (f: FooterLinks) => f.clickTermsConditions() },
//     { name: 'Privacy Policy', click: (f: FooterLinks) => f.clickPrivacyPolicy() },
//   ];

//   // Main footer links: TC-16 to TC-26
//   for (let i = 0; i < footerLinks.length; i++) {
//     const link = footerLinks[i];
//     const tcNumber = 16 + i;
//     test(`TC-${tcNumber}: Should navigate to ${link.name} page with correct URL @smoke`, async ({ page }) => {
//       const footer = new FooterLinks(page);
//       await link.click(footer);
//     });
//   }

//   // Social media links that open in a NEW TAB (all except TikTok)
//   const newTabSocialLinks = [
//     { name: 'Facebook', click: (f: FooterLinks) => f.clickFacebook() },
//     { name: 'Twitter', click: (f: FooterLinks) => f.clickTwitter() },
//     { name: 'Instagram', click: (f: FooterLinks) => f.clickInstagram() },
//     { name: 'LinkedIn', click: (f: FooterLinks) => f.clickLinkedin() },
//     { name: 'YouTube', click: (f: FooterLinks) => f.clickYoutube() },
//     { name: 'Snapchat', click: (f: FooterLinks) => f.clickSnapchat() },
//     { name: 'Spotify', click: (f: FooterLinks) => f.clickSpotify() },
//   ];

//   // Social new-tab links: TC-27 to TC-33
//   for (let i = 0; i < newTabSocialLinks.length; i++) {
//     const social = newTabSocialLinks[i];
//     const tcNumber = 27 + i;
//     test(`TC-${tcNumber}: Should open ${social.name} link in a new tab @smoke`, async ({ page, context }) => {
//       const footer = new FooterLinks(page);
//       const [newPage] = await Promise.all([
//         context.waitForEvent('page'),
//         social.click(footer),
//       ]);
//       expect(newPage).toBeDefined();
//       await newPage.close();
//     });
//   }

//   // TikTok opens in the SAME TAB – TC-34
//   test('TC-34: Should navigate to TikTok page in the same tab @smoke', async ({ page }) => {
//     const footer = new FooterLinks(page);
//     await footer.clickTiktok();
//     // URL assertion already inside clickTiktok method (expect(page).toHaveURL(/tiktok\.com/))
//   });
// });