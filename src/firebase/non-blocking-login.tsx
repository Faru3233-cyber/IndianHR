'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously as firebaseSignInAnonymously,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

/** Initiate anonymous sign-in. Returns a promise with the UserCredential. */
export function signInAnonymously(authInstance: Auth): Promise<UserCredential> {
  return firebaseSignInAnonymously(authInstance);
}

/** Initiate email/password sign-up. Returns a promise with the UserCredential. */
export function createUserWithEmailAndPassword(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return firebaseCreateUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in. Returns a promise with the UserCredential. */
export function signInWithEmailAndPassword(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return firebaseSignInWithEmailAndPassword(authInstance, email, password);
}
