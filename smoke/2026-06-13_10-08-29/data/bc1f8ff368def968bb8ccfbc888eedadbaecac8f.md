# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/eventCheckout.spec.ts >> Event Checkout Flows @regression >> TC-10: Guest checkout initiation @smoke
- Location: tests/specs/ui/eventCheckout.spec.ts:45:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Access Pass Event Access Pass' }).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "funz logo" [ref=e4] [cursor=pointer]:
        - /url: /events
        - img "funz logo" [ref=e5]
      - list [ref=e6]:
        - link "Home" [ref=e7] [cursor=pointer]:
          - /url: /events
        - link "Create Events" [ref=e8] [cursor=pointer]:
          - /url: /events/organizer-overview
        - link "FAQs" [ref=e9] [cursor=pointer]:
          - /url: /events/faq
      - generic [ref=e11]:
        - link "Login" [ref=e12] [cursor=pointer]:
          - /url: /login
        - link "Register" [ref=e13] [cursor=pointer]:
          - /url: /signup
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e20]:
        - generic [ref=e22]:
          - generic [ref=e25]:
            - img [ref=e26]
            - textbox "Search events" [ref=e29]
          - generic [ref=e32]:
            - img [ref=e33]
            - textbox "Location" [ref=e36]
          - button "calendar Pick a date" [ref=e39] [cursor=pointer]:
            - img "calendar" [ref=e40]
            - generic [ref=e41]: Pick a date
        - button "Search for events" [ref=e43] [cursor=pointer]:
          - img [ref=e44]
      - img "banner" [ref=e50]
      - generic [ref=e52]:
        - heading "Find Events" [level=2] [ref=e53]
        - generic [ref=e54]:
          - generic [ref=e55]:
            - link "arts, theater & comedy Art & Theater" [ref=e56] [cursor=pointer]:
              - /url: /events/c/all?category=arts%2C+theater+%26+comedy
              - img "arts, theater & comedy" [ref=e58]
              - generic [ref=e59]: Art & Theater
            - link "concerts Concerts" [ref=e60] [cursor=pointer]:
              - /url: /events/c/all?category=concerts
              - img "concerts" [ref=e62]
              - generic [ref=e63]: Concerts
            - link "dinner Dinner" [ref=e64] [cursor=pointer]:
              - /url: /events/c/all?category=dinner
              - img "dinner" [ref=e66]
              - generic [ref=e67]: Dinner
            - link "family Family" [ref=e68] [cursor=pointer]:
              - /url: /events/c/all?category=family
              - img "family" [ref=e70]
              - generic [ref=e71]: Family
            - link "others Others" [ref=e72] [cursor=pointer]:
              - /url: /events/c/all?category=others
              - img "others" [ref=e74]
              - generic [ref=e75]: Others
            - link "party Party" [ref=e76] [cursor=pointer]:
              - /url: /events/c/all?category=party
              - img "party" [ref=e78]
              - generic [ref=e79]: Party
            - link "podcast/poems Podcast/Poems" [ref=e80] [cursor=pointer]:
              - /url: /events/c/all?category=podcast%2Fpoems
              - img "podcast/poems" [ref=e82]
              - generic [ref=e83]: Podcast/Poems
            - link "religious Religious" [ref=e84] [cursor=pointer]:
              - /url: /events/c/all?category=religious
              - img "religious" [ref=e86]
              - generic [ref=e87]: Religious
            - link "sport Sport" [ref=e88] [cursor=pointer]:
              - /url: /events/c/all?category=sport
              - img "sport" [ref=e90]
              - generic [ref=e91]: Sport
            - link "summit Summit" [ref=e92] [cursor=pointer]:
              - /url: /events/c/all?category=summit
              - img "summit" [ref=e94]
              - generic [ref=e95]: Summit
          - button "Scroll right" [ref=e96] [cursor=pointer]:
            - img [ref=e97]
      - generic [ref=e100]:
        - generic [ref=e101]:
          - heading "Browse Events in" [level=2] [ref=e102]
          - combobox "select event location" [active] [ref=e103] [cursor=pointer]:
            - generic: Nigeria
            - img [ref=e104]
        - article [ref=e107]:
          - link "Test Event Test Event LASU calendar Thu 17 Jul 2025, 6:44 AM FREE" [ref=e108] [cursor=pointer]:
            - /url: /events/test-event-101
            - img "Test Event" [ref=e110]
            - generic [ref=e111]:
              - generic [ref=e112]:
                - paragraph [ref=e113]: Test Event
                - generic [ref=e114]:
                  - generic [ref=e115]:
                    - img [ref=e116]
                    - paragraph [ref=e119]: LASU
                  - generic [ref=e120]:
                    - img "calendar" [ref=e121]
                    - paragraph [ref=e122]: Thu 17 Jul 2025, 6:44 AM
              - paragraph [ref=e123]: FREE
      - generic [ref=e124]:
        - heading "Top Destinations with Exciting, Unforgettable Events" [level=2] [ref=e125]
        - generic [ref=e126]:
          - link "Lagos Lagos Lights, music, endless energy. Lagos doesn’t sleep, and neither does the fun. View Events" [ref=e127] [cursor=pointer]:
            - /url: /events/cities/lagos
            - img "Lagos" [ref=e129]
            - generic [ref=e130]:
              - generic [ref=e131]:
                - heading "Lagos" [level=3] [ref=e132]
                - paragraph [ref=e133]: Lights, music, endless energy. Lagos doesn’t sleep, and neither does the fun.
              - button "View Events" [ref=e134]
          - link "Abuja Abuja Cool, calm, and always classy. Abuja’s events serve luxury with a side of lit. View Events" [ref=e135] [cursor=pointer]:
            - /url: /events/cities/abuja
            - img "Abuja" [ref=e137]
            - generic [ref=e138]:
              - generic [ref=e139]:
                - heading "Abuja" [level=3] [ref=e140]
                - paragraph [ref=e141]: Cool, calm, and always classy. Abuja’s events serve luxury with a side of lit.
              - button "View Events" [ref=e142]
        - generic [ref=e143]:
          - link "Enugu Enugu Easygoing vibes and fun-packed experiences. In Enugu, every event feels like home with spice. View Events" [ref=e144] [cursor=pointer]:
            - /url: /events/cities/enugu
            - img "Enugu" [ref=e146]
            - generic [ref=e147]:
              - generic [ref=e148]:
                - heading "Enugu" [level=3] [ref=e149]
                - paragraph [ref=e150]: Easygoing vibes and fun-packed experiences. In Enugu, every event feels like home with spice.
              - button "View Events" [ref=e151]
          - link "Anambra Anambra Rooted in culture, bursting with energy. Anambra is where tradition throws the best parties. View Events" [ref=e152] [cursor=pointer]:
            - /url: /events/cities/anambra
            - img "Anambra" [ref=e154]
            - generic [ref=e155]:
              - generic [ref=e156]:
                - heading "Anambra" [level=3] [ref=e157]
                - paragraph [ref=e158]: Rooted in culture, bursting with energy. Anambra is where tradition throws the best parties.
              - button "View Events" [ref=e159]
          - link "Ibadan Ibadan Cultural roots run deep in Ibadan, but so does the fun. Ibadan people know how to have fun. View Events" [ref=e160] [cursor=pointer]:
            - /url: /events/cities/ibadan
            - img "Ibadan" [ref=e162]
            - generic [ref=e163]:
              - generic [ref=e164]:
                - heading "Ibadan" [level=3] [ref=e165]
                - paragraph [ref=e166]: Cultural roots run deep in Ibadan, but so does the fun. Ibadan people know how to have fun.
              - button "View Events" [ref=e167]
      - generic [ref=e169]:
        - generic [ref=e170]:
          - heading "Effortless Event Hosting, Exceptional Experiences!" [level=3] [ref=e171]
          - paragraph [ref=e172]: Planning an event? List it on FunZ and give your guests a smooth, exciting, and stress-free ticketing experience.
          - link "Get Started" [ref=e173] [cursor=pointer]:
            - /url: /signup/organizer
        - img "banner" [ref=e174]
  - contentinfo [ref=e175]:
    - generic [ref=e176]:
      - generic [ref=e177]:
        - paragraph [ref=e178]: Would you like to get updates on the events from FunZ delivered straight to your email? Subscribe now
        - generic [ref=e179]:
          - generic [ref=e180]:
            - textbox "First Name" [ref=e181]
            - textbox "Enter your e-mail address" [ref=e182]
          - button "Subscribe" [ref=e183] [cursor=pointer]
      - generic [ref=e184]:
        - generic [ref=e185]:
          - img "funz logo" [ref=e186]
          - paragraph [ref=e187]: Your all-in-one financial solution
          - list [ref=e188]:
            - listitem [ref=e189]:
              - link "facebook" [ref=e190] [cursor=pointer]:
                - /url: https://www.facebook.com/profile.php?id=61559510318630
                - img "facebook" [ref=e191]
            - listitem [ref=e192]:
              - link "twitter" [ref=e193] [cursor=pointer]:
                - /url: https://twitter.com/FunZ_ng
                - img "twitter" [ref=e194]
            - listitem [ref=e195]:
              - link "instagram" [ref=e196] [cursor=pointer]:
                - /url: https://www.instagram.com/funz_ng?igsh=MnVuc2traG84ejBk&utm_source=qr
                - img "instagram" [ref=e197]
            - listitem [ref=e198]:
              - link "linkedin" [ref=e199] [cursor=pointer]:
                - /url: https://www.linkedin.com/company/funz-finance/
                - img "linkedin" [ref=e200]
            - listitem [ref=e201]:
              - link "tiktok" [ref=e202] [cursor=pointer]:
                - /url: https://www.tiktok.com/@funz_ng?_t=8nWbV11YNAU&_r=1
                - img "tiktok" [ref=e203]
            - listitem [ref=e204]:
              - link "youtube" [ref=e205] [cursor=pointer]:
                - /url: http://www.youtube.com/@FunZ_NG
                - img [ref=e206]
            - listitem [ref=e209]:
              - link "snapchat" [ref=e210] [cursor=pointer]:
                - /url: https://www.snapchat.com/add/funz_ng?share_id=tVORRA12P1M&locale=en-GB
                - img "snapchat" [ref=e211]
            - listitem [ref=e212]:
              - link "spotify" [ref=e213] [cursor=pointer]:
                - /url: https://Creators.spotify.com/pod/show/funz-ng
                - img "spotify" [ref=e214]
        - generic [ref=e215]:
          - generic [ref=e216]:
            - paragraph [ref=e217]: Personal
            - list [ref=e218]:
              - listitem [ref=e219]:
                - link "Funz App" [ref=e220] [cursor=pointer]:
                  - /url: /funz-app
              - listitem [ref=e221]:
                - link "Send and Receive Money" [ref=e222] [cursor=pointer]:
                  - /url: /transaction
              - listitem [ref=e223]:
                - link "Pay Bills" [ref=e224] [cursor=pointer]:
                  - /url: /pay-bills
              - listitem [ref=e225]:
                - text: Funz Card
                - generic [ref=e226]: Coming Soon
              - listitem [ref=e227]:
                - text: Savings & Investments
                - generic [ref=e228]: Coming Soon
          - generic [ref=e229]:
            - paragraph [ref=e230]: Resources
            - list [ref=e231]:
              - listitem [ref=e232]:
                - link "Savings Calculator" [ref=e233] [cursor=pointer]:
                  - /url: /savings-calculator
              - listitem [ref=e234]:
                - link "Blog" [ref=e235] [cursor=pointer]:
                  - /url: /blog?filter=view-all
              - listitem [ref=e236]:
                - link "Careers" [ref=e237] [cursor=pointer]:
                  - /url: /jobs
              - listitem [ref=e238]:
                - link "Reach out to us" [ref=e239] [cursor=pointer]:
                  - /url: /contact-us
              - listitem [ref=e240]:
                - link "FAQs" [ref=e241] [cursor=pointer]:
                  - /url: /faq
              - listitem [ref=e242]:
                - link "About" [ref=e243] [cursor=pointer]:
                  - /url: /our-story
          - generic [ref=e244]:
            - paragraph [ref=e245]: Contact Us
            - list [ref=e246]:
              - listitem [ref=e247]:
                - img [ref=e248]
                - paragraph [ref=e251]: info@funzweb.com
              - listitem [ref=e252]:
                - img [ref=e253]
                - paragraph [ref=e255]: (234) 916 014 3868
              - listitem [ref=e256]:
                - img [ref=e257]
                - paragraph [ref=e260]: 148/150, Bode Thomas street, Surulere,
              - listitem [ref=e261]:
                - img [ref=e262]
                - paragraph [ref=e265]: No 6 New Site Road Oji Urban Market, Oji River, Enugu, Nigeria.
      - paragraph [ref=e266]: FunZ is an innovative platform, offering financial services to individuals and businesses. The platform also bridges the gap between event organizers and their potential attendees, enhancing and creating a seamless experience for individuals who aim to explore and create long-lasting memories.
      - generic [ref=e267]:
        - generic [ref=e268]: Copyright © 2026 FunZ
        - list [ref=e269]:
          - listitem [ref=e270]: All Rights Reserved
          - listitem [ref=e271]:
            - link "Terms and Conditions" [ref=e272] [cursor=pointer]:
              - /url: /terms-and-conditions
          - listitem [ref=e273]:
            - link "Privacy Policy" [ref=e274] [cursor=pointer]:
              - /url: /privacy-policy
  - alert [ref=e275]
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | 
  3  | export class EventPage {
  4  |   readonly page: Page;
  5  |   readonly eventsLink: Locator;
  6  |   readonly eventItem: Locator;
  7  |   readonly increaseQtyButton: Locator;
  8  |   readonly getTicketsButton: Locator;
  9  |   readonly addToCartButton: Locator;
  10 |   readonly quantityError: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     this.eventsLink = page.getByRole('link', { name: 'Events', exact: true });
  15 |     this.eventItem = page.getByRole('link', { name: 'Access Pass Event Access Pass' }).first();
  16 |     this.increaseQtyButton = page.getByRole('button', { name: 'increase qty' }).nth(1);
  17 |     this.getTicketsButton = page.getByRole('button', { name: 'Get Tickets' });
  18 |     this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  19 |     this.quantityError = page.locator('div').filter({ hasText: 'Please select your ticket' });
  20 |   }
  21 | 
  22 |   async gotoEvents() {
  23 |     await this.eventsLink.click();
  24 |   }
  25 | 
  26 |   async handleCountryMismatch() {
  27 |     await this.page.waitForLoadState('domcontentloaded');
  28 |   
  29 |     // Get current selected country from combobox text
  30 |     const combobox = this.page.getByRole('combobox', { name: 'select event location' });
  31 |     const currentCountry = await combobox.textContent();
  32 |     if (currentCountry?.includes('Nigeria')) return; // Already correct
  33 |   
  34 |     // Open combobox and wait for options
  35 |     await combobox.click();
  36 |     const nigeriaOption = this.page.getByRole('option', { name: 'Nigeria' });
  37 |     await nigeriaOption.waitFor({ state: 'visible' });
  38 |     await nigeriaOption.click();
  39 |   
  40 |     // Verify URL and content changed to Nigeria
  41 |     await expect(this.page).toHaveURL(/country=NG|nigeria/i);
  42 |     await expect(this.page.getByText(/No upcoming Events/i)).not.toBeVisible();
  43 |   }
  44 | 
  45 |   async selectEvent() {
  46 |     await this.handleCountryMismatch();
  47 | 
  48 |     // Ensure event link is visible before interaction
> 49 |     await this.eventItem.waitFor({ state: 'visible' });
     |                          ^ Error: locator.waitFor: Test timeout of 60000ms exceeded.
  50 | 
  51 |     await Promise.all([
  52 |       this.page.waitForURL(/\/events\/[\w-]+/, { timeout: 30000 }),
  53 |       this.eventItem.click(),
  54 |     ]);
  55 |   }
  56 | 
  57 |   async increaseTicketQuantity() {
  58 |     await this.increaseQtyButton.click();
  59 |     // Verify quantity increased (assume aria-label or text shows new value)
  60 |     await expect(this.increaseQtyButton).toBeVisible();
  61 |   }
  62 | 
  63 |   async clickGetTickets() {
  64 |     await this.getTicketsButton.click();
  65 |   }
  66 | 
  67 |   async clickAddToCart() {
  68 |   await this.addToCartButton.click();
  69 |   }
  70 |   
  71 |   async assertQuantityErrorVisible() {
  72 |     await expect(this.quantityError.first()).toBeVisible();
  73 |   }
  74 | }
```