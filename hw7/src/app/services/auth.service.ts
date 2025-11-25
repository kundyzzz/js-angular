import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async signup(email: string, password: string) {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(cred.user);
      return { success: true, user: cred.user };
    } 
    catch (err: any) {
      return { success: false, message: this.mapError(err) };
    }
  }

  async login(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(cred.user);
      return { success: true, user: cred.user };
    } 
    catch (err: any) {
      return { success: false, message: this.mapError(err) };
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.userSubject.next(null);
      return { success: true };
    } 
    catch (err: any) {
      return { success: false, message: this.mapError(err) };
    }
  }

  isLoggedIn$(): Observable<boolean> {
    return this.currentUser$.pipe(map(u => !!u));
  }

  private mapError(err: any) {
    const code = err?.code ?? '';
    if (code.includes('auth/email-already-in-use')) return 'Email already in use';
    if (code.includes('auth/invalid-email')) return 'Invalid email format';
    if (code.includes('auth/wrong-password')) return 'Wrong password';
    if (code.includes('auth/user-not-found')) return 'User not found';
    if (code.includes('auth/weak-password')) return 'Weak password';
    return err?.message || 'An unexpected error occurred';
  }
}
