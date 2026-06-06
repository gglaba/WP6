import { Component, OnInit } from '@angular/core';
import { Room, RoomsService } from '../../service/rooms.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-detailed',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './room-detailed.html',
  styleUrl: './room-detailed.css',
})
export class RoomDetailed implements OnInit {
  room!: Room;
  selectedPhoto: string = '';

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.roomsService.getRoomById(id).subscribe({
      next: (room) => {
        this.room = room;
        if (room?.photosUrls?.length) {
          this.selectedPhoto = room.photosUrls[0];
        }
      }
    });
  }

  selectPhoto(url: string): void {
    this.selectedPhoto = url;
  }

  prevPhoto(): void {
  const idx = this.room.photosUrls.indexOf(this.selectedPhoto);
  const prev = (idx - 1 + this.room.photosUrls.length) % this.room.photosUrls.length;
  this.selectedPhoto = this.room.photosUrls[prev];
}

nextPhoto(): void {
  const idx = this.room.photosUrls.indexOf(this.selectedPhoto);
  const next = (idx + 1) % this.room.photosUrls.length;
  this.selectedPhoto = this.room.photosUrls[next];
}
}
