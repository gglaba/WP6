import { Component, signal } from '@angular/core';
import {RouterLink,RouterLinkActive} from '@angular/router'
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

  items: MenuItem[] = [
    {label: 'Strona główna',routerLink: '/'},
    {label: 'Kontakt', routerLink:'/contact'},
    {label: 'Oferta', routerLink:'/rooms'}
  ]

}
