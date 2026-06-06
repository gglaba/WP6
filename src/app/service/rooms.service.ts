import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, of, shareReplay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Room {
  id: number;
  name: string;
  size: number;
  price: number;
  isAvailable: boolean;
  description: string;
  photosUrls: string[];
}

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private readonly jsonPath = 'assets/rooms.json';
  private rooms$: Observable<Room[]> | null = null;

  constructor(private http: HttpClient) {}

  private getAll(): Observable<Room[]> {
    if (!this.rooms$) {
      this.rooms$ = this.http.get<Room[]>(this.jsonPath).pipe(
        shareReplay(1) // ← cache — jeden request, wiele subskrypcji
      );
    }
    return this.rooms$;
  }

  getRooms(): Observable<Room[]> {
    return this.getAll().pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  getRoomById(id: number): Observable<Room> {
    return this.getAll().pipe(
      map((rooms) => {
        const room = rooms.find((r) => r.id === id);
        if (!room) throw new Error(`Nie znaleziono pokoju o id ${id}`);
        return room;
      }),
      catchError((err) => {
        console.error(err);
        return of(null as any);
      })
    );
  }
}