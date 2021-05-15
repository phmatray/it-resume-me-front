import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldModule, InputModule, AutocompleteModule } from '@app/shared/controls';
import { FilesUploadModule } from '@app/shared/popups';
import { SpinnerModule } from '@app/shared/indicators';
import { UserPhotoModule } from '@app/shared/layout';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';

import { StepperModule } from './components';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';


@NgModule({
  declarations: [FormComponent, PersonalComponent, ProfessionalComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule,
    FilesUploadModule,
    SpinnerModule,
    UserPhotoModule,
    StepperModule
  ]
})
export class FormModule { }
