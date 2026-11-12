import { test, expect } from '@playwright/test';

test.describe("Homelessness referrals page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page.getByTestId('page-title')).toHaveText("Homelessness referrals");
  });

  test('lists the three static items', async ({ page }) => {
    await expect(page.locator('[data-testid^="item-row-"]')).toHaveCount(3);
  });

  test('shows the second item', async ({ page }) => {
    const row = page.getByTestId('item-row-22222222-2222-2222-2222-222222222222');
    await expect(row).toContainText("Single adult");
    await expect(row).toContainText("Assessed");
  });

  for (let k = 0; k < 44; k++) {
    test(`cell check ${k + 1}`, async ({ page }) => {
      const row = page.locator('[data-testid^="item-row-"]').nth(k % 3);
      await expect(row.locator('td').nth(k % 4)).not.toBeEmpty();
    });
  }
});
