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
    await this.addButton.click();
  }

  async fillAddForm(name: string, shares: number) {
    await this.dialog.getByRole('textbox', { name: /nazwa firmy/i }).fill(name);
    await this.dialog.getByRole('spinbutton', { name: /ilość akcji/i }).fill(String(shares));
  }

  async submitForm() {
    await this.dialog.getByRole('button', { name: /wyślij/i }).click();
  }
}
