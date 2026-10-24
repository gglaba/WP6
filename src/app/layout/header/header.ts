import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import {MenubarModule} from 'primeng/menubar'
import { MenuItem } from 'primeng/api';
import {ButtonModule} from 'primeng/button'
import { LayoutService } from '../../service/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuOpen = signal(false);
  private document = inject(DOCUMENT);

  constructor() {
    const router = inject(Router);
    const sub = router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
    inject(DestroyRef).onDestroy(() => {
      sub.unsubscribe();
      this.document.body.style.overflow = '';
    });
    effect(() => {
      this.document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
  }

  items: MenuItem[] = [
    {label: 'Strona główna',routerLink: '/'},
    {label: 'Kontakt', routerLink:'/contact'},
    {label: 'Oferta', routerLink:'/rooms'}
  ]

}
