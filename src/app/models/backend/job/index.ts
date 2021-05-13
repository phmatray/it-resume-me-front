import firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

export interface Job {
  title: string;
  salary: number;
  created: FieldValue;
  updated?: FieldValue;
}
