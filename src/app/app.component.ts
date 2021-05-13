import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tailwindcss-angular-app';

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
  }
}
