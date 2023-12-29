import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly STORAGE_KEY = 'user_session';

  // Set user session in localStorage
  setSession(user: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    window.location.reload();
  }

  // Get user session from localStorage
  getSession(): any {
    const sessionData = localStorage.getItem(this.STORAGE_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  // Clear user session from localStorage
  clearSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.reload();
  }

  // Set additional data in localStorage
  setAdditionalData(key: string, value: any): void {
    const session = this.getSession() || {};
    session[key] = value;
    this.setSession(session);
  }

  // Get additional data from localStorage
  getAdditionalData(key: string): any {
    const session = this.getSession();
    return session ? session[key] : null;
  }
}
