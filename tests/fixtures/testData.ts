export const testUsers = {
  user: () => ({
    email: `testuser+${Date.now()}@yopmail.com`,
    password: 'Pass123!',
    firstName: 'John',
    lastName: 'Doe',
  }),

  validLogin: {
    email: process.env.TEST_USER_EMAIL || 'staging-user@yopmail.com',
    password: process.env.TEST_USER_PASSWORD || 'StagingPass123',
  },

  invalidLogin: {
    email: 'wrong@example.com',
    password: 'invalidPassword',
  },

  organizer: () => ({
    email: `organizer+${Date.now()}@yopmail.com`,
    password: 'OrgPass123!',
    company: 'Funz Events',
  }),

  guestuser: () => ({
    firstName: 'Guest',
    lastName: `Test${Math.floor(Math.random() * 1000)}`,
    email: `guest${Date.now()}@yopmail.com`,
    phone: `0708${Math.floor(1000000 + Math.random() * 9000000)}`
  })
};