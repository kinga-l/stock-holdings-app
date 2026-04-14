import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Dodawanie firmy do ewidencji', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('otwiera dialog po kliknięciu "Dodaj"', async ({ page }) => {
    await homePage.openAddDialog();

    const dialog = page.getByRole('dialog');

    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('textbox', { name: /nazwa firmy/i })).toBeVisible();
    await expect(dialog.getByRole('spinbutton', { name: /ilość akcji/i })).toBeVisible();
  });

  test('zamyka dialog po kliknięciu "Anuluj"', async ({ page }) => {
    await homePage.openAddDialog();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByRole('button', { name: /anuluj/i }).click();

    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('nie zamyka dialogu gdy formularz jest pusty', async ({ page }) => {
    await homePage.openAddDialog();

    await page.getByRole('button', { name: /wyślij/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('wyświetla błąd walidacji gdy nazwa jest pusta', async ({ page }) => {
    await homePage.openAddDialog();

    await page.getByRole('button', { name: /wyślij/i }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await expect(
      page.getByText(/nazwa firmy jest wymagana/i).or(page.locator('[id="companyName_error"]'))
    ).toBeVisible();
  });

  test('przycisk "Dodaj" jest aktywny przed zapisem', async () => {
    await expect(homePage.addButton).toBeEnabled();
  });

  test('przycisk "Dodaj" jest disabled podczas zapisu', async ({ page }) => {
    await homePage.openAddDialog();
    await homePage.fillAddForm('PKN Orlen', 100);

    const submitPromise = page.getByRole('button', { name: /wyślij/i }).click();
    await expect(homePage.addButton).toBeDisabled();
    await submitPromise;
  });

  test('zamyka dialog i wyświetla toast po poprawnym zapisie', async ({ page }) => {
    await homePage.openAddDialog();
    await homePage.fillAddForm('PKN Orlen Test', 50);

    await homePage.submitForm();

    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });

    await expect(page.getByText(/dane zostały zapisane/i)).toBeVisible({ timeout: 5000 });
  });

  test('wyświetla toast błędu gdy zapis się nie powiedzie', async ({ page }) => {
    await page.route('**/api/**', (route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Internal server error' }),
        });
      } else {
        route.continue();
      }
    });

    await homePage.openAddDialog();
    await homePage.fillAddForm('Test Error Company', 10);
    await homePage.submitForm();

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('alert')).toContainText('Wystąpił błąd');
  });
});
