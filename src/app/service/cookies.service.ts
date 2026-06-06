import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface CookieConsent {
  necessary: true;      // zawsze true
  analytics: boolean;
  thirdParty: boolean;  // Google Maps itp.
}

const STORAGE_KEY = 'cookie_consent';
const CONSENT_VERSION = '1';

@Injectable({ providedIn: 'root' })
export class CookiesService {
  private defaultConsent: CookieConsent = {
    necessary: true,
    analytics: false,
    thirdParty: false,
  };

  private consentSubject = new BehaviorSubject<CookieConsent | null>(null);
  consent$ = this.consentSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (parsed.version !== CONSENT_VERSION) {
        // nowa wersja polityki — wymagaj ponownej zgody
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      this.consentSubject.next(parsed.consent);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  hasConsent(): boolean {
    return this.consentSubject.value !== null;
  }

  acceptAll(): void {
    this.save({ necessary: true, analytics: true, thirdParty: true });
  }

  acceptNecessary(): void {
    this.save({ necessary: true, analytics: false, thirdParty: false });
  }

  saveCustom(consent: CookieConsent): void {
    this.save(consent);
  }

  private save(consent: CookieConsent): void {
    const data = {
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
      consent
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    this.consentSubject.next(consent);
  }

  has(type: keyof CookieConsent): boolean {
    return this.consentSubject.value?.[type] ?? false;
  }

  withdraw(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.consentSubject.next(null);
  }
}