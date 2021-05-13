export { User, Recruiter, Employee } from '@app/models/backend/user';

// Request models

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}
