import { expect } from '@playwright/test';
import { Then, When } from '../fixtures/customFixtures';

Then('the checkout overview page should be displayed', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.verifyOverviewPageLoaded();
});

Then('the order summary should contain {int} items', async ({ checkoutOverviewPage }, count: number) => {
  const actual = await checkoutOverviewPage.getItemCount();
  expect(actual).toBe(count);
});

Then('the order summary should display subtotal', async ({ checkoutOverviewPage }) => {
  const subtotal = await checkoutOverviewPage.getSubtotal();
  expect(subtotal).toContain('Item total');
});

Then('the order summary should display tax', async ({ checkoutOverviewPage }) => {
  const tax = await checkoutOverviewPage.getTax();
  expect(tax).toContain('Tax');
});

Then('the order summary should display total amount', async ({ checkoutOverviewPage }) => {
  const total = await checkoutOverviewPage.getTotal();
  expect(total).toContain('Total');
});

When('the user cancels the overview', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.clickCancel();
});
