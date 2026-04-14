import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly addButton: Locator;
  readonly table: Locator;
  readonly chartCanvas: Locator;
  readonly dialog: Locator;

  constructor(private page: Page) {
    this.addButton = page.getByRole('button', { name: /dodaj/i });
    this.table = page.getByRole('table', { name: /ewidencja/i });
    this.chartCanvas = page.getByRole('img', { name: /wykres kołowy/i });
    this.dialog = page.getByRole('dialog');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openAddDialog() {
    const errorOverlay = this.page.locator('vite-error-overlay');
    if (await errorOverlay.isVisible()) {
      await this.page.keyboard.press('Escape');
      await errorOverlay.waitFor({ state: 'hidden' });
    }

    await this.addButton.click();
  }

  async fillAddForm(companyName: string, shares: number) {
    const dialog = this.page.getByRole('dialog');

    await dialog.getByRole('textbox', { name: /nazwa firmy/i }).clear();
    await dialog.getByRole('textbox', { name: /nazwa firmy/i }).fill(companyName);

    await dialog.getByRole('spinbutton', { name: /ilość akcji/i }).clear();
    await dialog.getByRole('spinbutton', { name: /ilość akcji/i }).fill(shares.toString());
  }

  async submitForm() {
    await this.dialog.getByRole('button', { name: /wyślij/i }).click();
  }
}
