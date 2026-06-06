import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoomsService, Room } from '../../service/rooms.service';
import { Observable } from 'rxjs/internal/Observable';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MessageModule} from 'primeng/message';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule, SelectButtonModule, FormsModule,RouterLink, RouterModule, MessageModule],
  standalone: true,
  templateUrl: './room-card.html',
  styleUrl: './room-card.css',
})
export class RoomCard implements OnInit {

  rooms: Room[] = [];
  layout: 'list' | 'grid' = 'grid';
  layoutOptions = ['list', 'grid'];

  constructor(private roomsService: RoomsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.cdr.detectChanges(); // ← informuje Angulara o zmianie
      },
      error: (err) => console.error(err),
    });
  }

  onImgError(event: Event): void {
  (event.target as HTMLImageElement).style.display = 'none';
}

}
