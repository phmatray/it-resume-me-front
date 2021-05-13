import { Employee, Recruiter } from '@app/models/backend/user/roles';
import firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

export * from './roles';

export interface User {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  country: string;
  about?: string;
  roleId: string;
  role: Employee | Recruiter;
  created: FieldValue;
  updated?: FieldValue;
}
