import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class MediaService {
  private base = environment.mediaUrl;

  photo(path: string): string {
    if (!this.base) return `/assets/photos/${path}`;
    return `${this.base}/photos/${path}`;
  }

  video(path: string): string {
    if (!this.base) return `/assets/videos/${path}`;
    return `${this.base}/videos/${path}`;
  }
}