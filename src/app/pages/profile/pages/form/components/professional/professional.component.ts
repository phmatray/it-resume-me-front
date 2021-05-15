import {
  Component, OnInit, OnDestroy, Input, Output,
  EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { regex, regexErrors } from '@app/shared/utils';
import { markFormGroupTouched } from '@app/shared/utils/form';

import { Dictionaries } from '@app/store/dictionaries';

import { StepperService } from '../stepper/services';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();

  constructor(
    private stepper: StepperService
  ) { }

  ngOnInit(): void {
    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      this.stepper[type].next(true);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
