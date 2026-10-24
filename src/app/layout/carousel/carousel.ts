import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import Hls from 'hls.js';
import { MediaService } from '../../service/media.service';

@Component({
  selector: 'app-carousel',
  imports: [RouterLink],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements AfterViewInit, OnDestroy {
  constructor(private media: MediaService) {}

  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  private hls: Hls | null = null;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initHls(this.media.video('hero.m3u8'));
    }
  }

  ngOnDestroy(): void {
    this.hls?.destroy();
  }

  private initHls(src: string): void {
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
}
