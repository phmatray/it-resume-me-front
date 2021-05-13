import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
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

  constructor(
    private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromUser.init());
    this.store.dispatch(fromDictionaries.read());
  }
}
