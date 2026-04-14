import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddHoldingDialogComponent } from './add-holding-dialog.component';

const mockDialogRef = { close: jest.fn() };

describe('AddHoldingDialogComponent', () => {
  beforeEach(() => jest.clearAllMocks());

  async function setup() {
    return render(AddHoldingDialogComponent, {
      providers: [{ provide: DynamicDialogRef, useValue: mockDialogRef }, MessageService],
    });
  }

  it('should create', async () => {
    await setup();
    expect(screen.getByRole('form')).toBeTruthy();
  });

  it('renderuje pola formularza', async () => {
    await setup();
    expect(screen.getByLabelText(/nazwa firmy/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ilość akcji/i)).toBeInTheDocument();
  });

  it('pokazuje błąd walidacji gdy formularz jest pusty', async () => {
    await setup();
    await userEvent.click(screen.getByRole('button', { name: /wyślij/i }));
    expect(screen.getByText(/nazwa firmy jest wymagana/i)).toBeInTheDocument();
  });

  it('zamyka dialog z payloadem przy poprawnych danych', async () => {
    const user = userEvent.setup();
    const { fixture } = await setup();

    await user.type(screen.getByLabelText(/nazwa firmy/i), 'Orlen');

    fixture.componentInstance.form.controls.sharesQuantity.setValue(100);
    fixture.detectChanges();

    fixture.componentInstance.submit();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      name: 'Orlen',
      shares: 100,
    });
  });

  it('nie zamyka dialogu gdy formularz jest niepoprawny', async () => {
    const user = userEvent.setup();
    await setup();

    await user.click(screen.getByRole('button', { name: /wyślij/i }));

    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('zamyka dialog z null po kliknięciu Anuluj', async () => {
    const user = userEvent.setup();
    await setup();

    await user.click(screen.getByRole('button', { name: /anuluj/i }));

    expect(mockDialogRef.close).toHaveBeenCalledWith(null);
  });
});
