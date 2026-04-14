import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('tytuł strony jest widoczny', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Ewidencja akcji');
  });
});
