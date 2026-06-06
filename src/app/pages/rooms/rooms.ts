import { Component } from '@angular/core';
import {RoomCard} from "../../layout/room-card/room-card";

@Component({
  selector: 'app-rooms',
  imports: [RoomCard],
  standalone: true,
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms {
}
