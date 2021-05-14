import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import firebase from 'firebase';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file: File | null = null;
  @Output() completed = new EventEmitter<string>();

  task!: AngularFireUploadTask;

  percentage$!: Observable<number | undefined>;
  snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  downloadURL: string | null;

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) {
    this.downloadURL = null;
  }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(): void {
    if (this.file) {
      const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;

      const storageRef = this.storage.ref(path);

      this.task = this.storage.upload(path, this.file);

      this.percentage$ = this.task.percentageChanges();
      this.snapshot$ = this.task.snapshotChanges();

      this.snapshot$.pipe(
        takeUntil(this.destroy),
        finalize(async () => {
          const downloadURL = await storageRef.getDownloadURL().toPromise();

          this.downloadURL = downloadURL;
          this.completed.next(downloadURL);
        })
      ).subscribe();
    }
  }

}
