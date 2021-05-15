import { Injectable } from '@angular/core';

export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

@Injectable()
export class StepperService {

  steps: Step[] | null = null;
  activeStep: ActiveStep | null = null;

  constructor() { }

  init(steps: Step[]): void {
    this.steps = steps;
    this.activeStep = { ...steps[0], index: 0 };
  }

  onNext(): void {
    if (this.steps && this.activeStep) {
      const index = this.activeStep.index + 1;
      this.activeStep = { ...this.steps[index], index };
    }
  }

  onPrev(): void {
    if (this.steps && this.activeStep) {
      const index = this.activeStep?.index - 1;
      this.activeStep = { ...this.steps[index], index };
    }
  }
}
