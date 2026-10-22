import { Component, OnInit, OnDestroy, signal, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import Hls from 'hls.js';
import { MediaService } from '../../service/media.service';

interface Slide {
  heading: string;
  subheading: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnInit, OnDestroy {

  constructor(private media: MediaService) {}

@ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  private hls: Hls | null = null;
  private interval: ReturnType<typeof setInterval> | null = null;
  private platformId = inject(PLATFORM_ID);

slides = [
  {
    heading: 'Porozmawiajmy o nowej przestrzeni dla Twojej firmy',
    subheading: 'Po więcej informacji',
    ctaLabel: 'Skontaktuj się',
    ctaLink: '/contact'
  },
  {
    heading: 'Szukasz idealnego miejsca na twoją działalność?',
    subheading: 'Oferujemy wachlarz lokali do długoterminowego wynajmu',
    ctaLabel: 'Zobacz ofertę',
    ctaLink: '/rooms'
  }
];
  currentIndex = signal(0);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.interval = setInterval(() => this.next(), 5000);
    }
  }

ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.initHls(this.media.video('hero.m3u8'));
  }
}

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
    if (this.hls) this.hls.destroy();
  }

initHls(src: string) {
  const video = this.videoEl.nativeElement;
  if (Hls.isSupported()) {
    this.hls = new Hls({
      startLevel: -1,
      capLevelToPlayerSize: true,
      abrBandWidthFactor: 0.85,
    });
    this.hls.loadSource(src);
    this.hls.attachMedia(video);
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = src;
  }
}

  next() {
    this.currentIndex.set((this.currentIndex() + 1) % this.slides.length);
  }

  prev() {
    this.currentIndex.set((this.currentIndex() - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.next(), 5000);
  }
}
