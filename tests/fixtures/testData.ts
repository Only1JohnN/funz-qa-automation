export const testUsers = {
  user: {
    email: `testuser+${Date.now()}@yopmail.com`,
    password: 'Pass123!',
    firstName: 'John',
    lastName: 'Doe',
  },
  validLogin: {
    email: process.env.TEST_USER_EMAIL || 'staging-user@example.com',
    password: process.env.TEST_USER_PASSWORD || 'StagingPass123',
  },
  invalidLogin: {
    email: 'wrong@example.com',
    password: 'invalidPassword',
  },
  organizer: {
        email: `organizer+${Date.now()}@example.com`,
    password: 'OrgPass123!',
    company: 'Funz Events',
  },
};