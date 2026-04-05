import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures/customFixtures';

Given('the user is on the login page', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.verifyLoginPageLoaded();
});

When(
  'the user logs in with username {string} and password {string}',
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password);
  }
);

Then('the user should be redirected to the products page', async ({ page }) => {
  await expect(page).toHaveURL(/inventory/);
});

Then(
  'the user should see an error message {string}',
  async ({ loginPage }, message: string) => {
    await loginPage.verifyErrorMessage(message);
  }
);
