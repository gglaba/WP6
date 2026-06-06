import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import {CookiesBanner} from './layout/cookies-banner/cookies-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,CookiesBanner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('biura-bystrzyca');
    scrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }
}
