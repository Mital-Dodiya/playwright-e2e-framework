import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures/customFixtures';

Then('the cart page should be displayed', async ({ cartPage }) => {
  await cartPage.verifyCartPageLoaded();
});

Then('the cart should contain {int} items', async ({ cartPage }, count: number) => {
  const actual = await cartPage.getCartItemCount();
  expect(actual).toBe(count);
});

When('the user removes item number {int} from the cart', async ({ cartPage }, index: number) => {
  await cartPage.removeItemByIndex(index - 1);
});

Then('the cart should be empty', async ({ cartPage }) => {
  await cartPage.verifyCartIsEmpty();
});

When('the user proceeds to checkout', async ({ cartPage }) => {
  await cartPage.proceedToCheckout();
});

When('the user clicks continue shopping', async ({ cartPage }) => {
  await cartPage.continueShopping();
});
