import { Given, When, Then } from '../fixtures/customFixtures';

Then('the checkout page should be displayed', async ({ checkoutPage }) => {
  await checkoutPage.verifyCheckoutPageLoaded();
});

When(
  'the user fills in checkout info with first name {string} last name {string} and postal code {string}',
  async ({ checkoutPage }, firstName: string, lastName: string, postalCode: string) => {
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
  }
);

When('the user clicks continue', async ({ checkoutPage }) => {
  await checkoutPage.clickContinue();
});

When('the user clicks finish', async ({ checkoutPage }) => {
  await checkoutPage.clickFinish();
});

Then('the order confirmation should be displayed', async ({ checkoutPage }) => {
  await checkoutPage.verifyOrderConfirmation();
});

Then(
  'the checkout error message {string} should be displayed',
  async ({ checkoutPage }, message: string) => {
    await checkoutPage.verifyErrorMessage(message);
  }
);
