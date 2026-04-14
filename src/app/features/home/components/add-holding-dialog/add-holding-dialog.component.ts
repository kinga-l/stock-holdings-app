import {Component, inject, ChangeDetectionStrategy, signal} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

type AddHoldingForm = FormGroup<{
  companyName: FormControl<string>;
  sharesQuantity: FormControl<number | null>;
}>;

@Component({
  selector: 'app-add-holding-dialog',
  standalone: true,
  templateUrl: './add-holding-dialog.component.html',
  styleUrl: './add-holding-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule,
  ],
})
export class AddHoldingDialogComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(DynamicDialogRef);

  readonly form: AddHoldingForm = this.fb.group({
    companyName: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    }),
    sharesQuantity: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  get companyNameCtrl() {
    return this.form.controls.companyName;
  }

  get sharesQuantityCtrl() {
    return this.form.controls.sharesQuantity;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { companyName, sharesQuantity } = this.form.getRawValue();
    this.dialogRef.close({
      name: companyName.trim(),
      shares: sharesQuantity!,
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
