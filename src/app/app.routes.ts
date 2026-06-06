import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Rooms } from './pages/rooms/rooms';
import {RoomDetailed} from './pages/room-detailed/room-detailed';
import { Rodo } from './pages/rodo/rodo';
import { About } from './pages/about/about';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'rooms',
        component: Rooms
    },
    {
        path: 'rooms/:id',
        component: RoomDetailed
    },
    {
        path: 'privacy-policy',
        component: Rodo
    },
    {
        path: 'about',
        component: About
    }
    
];
