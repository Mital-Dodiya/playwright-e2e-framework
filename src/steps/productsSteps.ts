import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures/customFixtures';
import { ENV } from '../config/environment';

Given('the user is logged in as {string}', async ({ loginPage, page }, username: string) => {
  await loginPage.goto();
  await loginPage.login(username, ENV.users.standard.password);
  await expect(page).toHaveURL(/inventory/);
});

Then('the products page should be displayed', async ({ productsPage }) => {
  await productsPage.verifyProductsPageLoaded();
});

Then('the user should see {int} or more products', async ({ productsPage }, count: number) => {
  const actual = await productsPage.getProductCount();
  expect(actual).toBeGreaterThanOrEqual(count);
});

When('the user adds product number {int} to the cart', async ({ productsPage }, index: number) => {
  await productsPage.addProductToCartByIndex(index - 1);
});

Then('the cart badge should show {string}', async ({ productsPage }, count: string) => {
  const badge = await productsPage.getCartItemCount();
  expect(badge).toBe(count);
});

When('the user sorts products by {string}', async ({ productsPage }, option: string) => {
  await productsPage.sortProductsBy(option);
});

When('the user goes to the cart', async ({ productsPage }) => {
  await productsPage.goToCart();
});

When('the user logs out', async ({ productsPage }) => {
  await productsPage.logout();
});

Then(
  'the product at index {int} should have price {string}',
  async ({ productsPage }, index: number, price: string) => {
    const actual = await productsPage.getProductPriceByIndex(index - 1);
    expect(actual).toBe(price);
  }
);

Then('the user should be on the login page', async ({ page }) => {
  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
});
