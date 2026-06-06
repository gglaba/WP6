import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rodo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rodo.html',
  styleUrl: './rodo.css',
})
export class Rodo {
  version = '1.0';
  date = '03.06.2026';
}
