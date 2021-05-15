import {
  Component, OnInit, OnDestroy, Input, Output,
  EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { regex, regexErrors } from '@app/shared/utils';
import { markFormGroupTouched } from '@app/shared/utils/form';

import { Dictionaries } from '@app/store/dictionaries';

import { StepperService } from '../stepper/services';

export interface ProfessionalForm {
  about: string;
  roleId: string;
  // role: EmployeeForm | RecruiterForm
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value: ProfessionalForm;
  @Input() dictionaries: Dictionaries;

  @Output() changed = new EventEmitter<ProfessionalForm>();

  form!: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      roleId: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      about: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }]
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if (!this.form.valid) {
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        this.changed.emit(this.form.value);
      }

      this.stepper[type].next(this.form.valid);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
