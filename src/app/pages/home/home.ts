import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from "../../../../node_modules/@angular/router/types/_router_module-chunk";
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {CarouselModule} from "primeng/carousel";
import { signal } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Carousel} from "../../layout/carousel/carousel";
import { Room, RoomsService } from '../../service/rooms.service';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../service/media.service';

interface Slide {
  heading: string;
  subheading: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RippleModule, CarouselModule, Carousel,RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  aboutPhoto = '';
  rooms: Room[] = [];

  constructor(private roomsService: RoomsService, private media: MediaService) {}

  ngOnInit(): void {
    this.rooms = [];
    this.aboutPhoto = this.media.photo('historyczne/Szkola_Podstawowa_nr_1_im_gen_Jozefa_Bema_ul_Wojska_Polskiego_Bystrzyca_Klodzka_107777-1927.jpg');

    this.roomsService.getRooms().subscribe((rooms) => {
      this.rooms = rooms.slice(0, 3);
    });
  }

}
