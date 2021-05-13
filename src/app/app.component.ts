import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tailwindcss-angular-app';

  isAuthorized$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized));

    this.store.dispatch(fromUser.init());
    this.store.dispatch(fromDictionaries.read());
  }

  onSignOut(): void {
    this.store.dispatch(fromUser.signOut());
  }
}
