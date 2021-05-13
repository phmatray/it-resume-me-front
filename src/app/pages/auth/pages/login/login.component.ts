import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { regex, regexErrors, markFormGroupTouched } from '@app/shared/utils';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  regexErrors = regexErrors;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {

    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    this.form = this.fb.group({
      email: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.email)
        ]
      }],
      password: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
        ]
      }],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {

      const value = this.form.value;

      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password
      };

      this.store.dispatch(fromUser.signInEmail({ credentials }));

    } else {
      markFormGroupTouched(this.form);
    }
  }

}
