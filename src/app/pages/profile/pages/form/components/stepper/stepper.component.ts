import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ActiveStep, Step, StepperService } from './services';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {

  private destroy = new Subject<any>();

  constructor(private stepper: StepperService) { }

  ngOnInit(): void {
    this.stepper.next$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.stepper.onNext();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  get steps(): Step[] {
    return this.stepper.steps || [];
  }

  get activeStep(): ActiveStep | null {
    return this.stepper.activeStep;
  }

  isActive(index: number): boolean {
    return this.activeStep
      ? index === this.activeStep.index
      : false;
  }

  isCompleted(index: number): boolean {
    return this.activeStep
      ? index < this.activeStep.index
      : false;
  }

  isFirst(): boolean {
    return this.activeStep
      ? this.activeStep.index === 0
      : false;
  }

  isLast(): boolean {
    return this.activeStep
      ? this.activeStep.index === this.steps.length - 1
      : false;
  }

  onNext(): void {
    this.stepper.check.next('next');
  }

  onComplete(): void {
    this.stepper.check.next('complete');
  }

  onPrev(): void {
    this.stepper.onPrev();
  }

  onCancel(): void {
    this.stepper.cancel.next();
  }
}
