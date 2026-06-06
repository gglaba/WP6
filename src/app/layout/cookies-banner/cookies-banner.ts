import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CookiesService, CookieConsent} from '../../service/cookies.service';

@Component({
  selector: 'app-cookies-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cookies-banner.html',
  styleUrl: './cookies-banner.css',
})
export class CookiesBanner implements OnInit {
  visible = false;
  showDetails = false;

  custom: Omit<CookieConsent, 'necessary'> = {
    analytics: false,
    thirdParty: false,
  };

  constructor(public cookieService: CookiesService) {}

  ngOnInit(): void {
    this.cookieService.consent$.subscribe((consent) => {
      this.visible = consent === null;
    });
  }

  acceptAll(): void {
    this.cookieService.acceptAll();
  }

  acceptNecessary(): void {
    this.cookieService.acceptNecessary();
  }

  saveCustom(): void {
    this.cookieService.saveCustom({
      necessary: true,
      ...this.custom
    });
  }
}

