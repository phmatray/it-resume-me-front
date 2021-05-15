import { Component, OnInit } from '@angular/core';

import { ActiveStep, Step, StepperService } from './services';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  constructor(private stepper: StepperService) { }

  ngOnInit(): void {
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
    this.stepper.onNext();
  }

  onComplete(): void {

  }

  onPrev(): void {
    this.stepper.onPrev();
  }

  onCancel(): void {

  }
}
