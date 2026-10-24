import { Component, OnDestroy, OnInit,AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {CarouselModule} from "primeng/carousel";
import { signal } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Carousel} from "../../layout/carousel/carousel";
import { Room, RoomsService } from '../../service/rooms.service';
import { MediaService } from '../../service/media.service';

interface Slide {
  heading: string;
  subheading: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RippleModule, CarouselModule, Carousel, RouterLink, CommonModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {

  aboutPhoto = '';
  historyPhoto = '';
  rooms: Room[] = [];
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;
  constructor(private roomsService: RoomsService, private media: MediaService) {}

  ngOnInit(): void {
    this.rooms = [];
    this.aboutPhoto = this.media.photo('zewnatrz/20260604_124625.jpg');
    this.historyPhoto = this.media.photo('historyczne/Szkola_Podstawowa_nr_1_im_gen_Jozefa_Bema_ul_Wojska_Polskiego_Bystrzyca_Klodzka_107777-1927.jpg');

    this.roomsService.getRooms().subscribe((rooms) => {
      this.rooms = rooms.slice(0, 3);
    });
  }

ngAfterViewInit(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -80px 0px'
    }
  );

  // obserwuj elementy które już istnieją
  this.animElements.forEach((el) => observer.observe(el.nativeElement));

  // obserwuj nowe elementy gdy się pojawią (po załadowaniu rooms)
  this.animElements.changes.subscribe((els) => {
    els.forEach((el: ElementRef) => observer.observe(el.nativeElement));
  });
}
}
