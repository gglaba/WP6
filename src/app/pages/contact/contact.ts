import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { RoomsService } from '../../service/rooms.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CookiesService } from '../../service/cookies.service';

interface RoomOption {
  label: string;
  value: number;
  disabled: boolean;
  isAvailable: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MultiSelectModule, CheckboxModule, MessageModule, ToastModule],
  providers: [MessageService],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  isLoading = false;
  submitted = false;
  allSelected = false;
  errorMessage = '';
  roomOptions: RoomOption[] = [];

  form = {
    name: '',
    email: '',
    phone: '',
    contactByEmail: true,
    contactByPhone: false,
    subject: '',
    message: '',
    selectedRooms: [] as number[],
    website: '', // pole honeypot
    rodoConsent: false
  };

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient,
    private messageService: MessageService,
    public cookieService: CookiesService
  ) {}

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe((rooms) => {
      this.roomOptions = rooms.map((r) => ({
        label: r.isAvailable ? r.name : `${r.name} (zajęte)`,
        value: r.id,
        disabled: false,
        isAvailable: r.isAvailable
      }));

      const param = this.route.snapshot.queryParamMap.get('pokoje');
      if (param) {
        const ids = param.split(',').map(Number);
        this.form.selectedRooms = ids.filter((id) =>
          this.roomOptions.some((o) => o.value === id)
        );
        this.updateAllSelected();
      }
    });
  }

  toggleAll(event: { checked: boolean }): void {
    this.form.selectedRooms = event.checked
      ? this.roomOptions.map((r) => r.value)
      : [];
  }

  onRoomsChange(): void {
    this.updateAllSelected();
  }

  private updateAllSelected(): void {
    this.allSelected = this.form.selectedRooms.length === this.roomOptions.length;
  }

  get hasUnavailableSelected(): boolean {
    return this.form.selectedRooms.some((id) =>
      this.roomOptions.find((o) => o.value === id && !o.isAvailable)
    );
  }

  get bothContactMethodsUnselected(): boolean {
    return !this.form.contactByEmail && !this.form.contactByPhone;
  }

formatPhone(event: Event): void {
  const input = event.target as HTMLInputElement;
  const raw = input.value;

  if (raw.startsWith('+')) {
    const digits = raw.slice(1).replace(/\D/g, '').slice(0, 12);
    input.value = '+' + this.formatDigits(digits);
  } else {
    const digits = raw.replace(/\D/g, '').slice(0, 9);
    input.value = digits ? '+48 ' + this.formatDigits(digits) : '';
  }

  this.form.phone = input.value;
}

private formatDigits(digits: string): string {
  // pierwsze 2 cyfry to kierunkowy (np. 48), reszta w grupach po 3
  if (digits.length <= 2) return digits;
  const prefix = digits.slice(0, 2);
  const rest = digits.slice(2);
  const groups = rest.match(/.{1,3}/g) ?? [];
  return [prefix, ...groups].join(' ');
}

onPhoneFocus(event: FocusEvent): void {
  const input = event.target as HTMLInputElement;
  if (!input.value) {
    input.value = '+';
    this.form.phone = '+';
  }
}



onSubmit(): void {

  this.isLoading = true;
  this.errorMessage = '';

  const payload = {
    name: this.form.name,
    email: this.form.email,
    phone: this.form.phone,
    contactByEmail: this.form.contactByEmail,
    contactByPhone: this.form.contactByPhone,
    subject: this.form.subject,
    message: this.form.message,
    selectedRooms: this.form.selectedRooms,
    website: this.form.website,
    rodoConsent: this.form.rodoConsent
  };
console.log('PAYLOAD:', payload);
  this.apiService.sendContactForm(payload).subscribe({
    next: () => {
  this.isLoading = false;
  this.messageService.add({
    severity: 'success',
    summary: 'Wiadomość wysłana',
    detail: 'Odezwiemy się wkrótce.',
    life: 6000
  });
  this.form = {
    name: '', email: '', phone: '',
    contactByEmail: true, contactByPhone: false,
    subject: '', message: '', selectedRooms: [],
    website: '', rodoConsent: false
  };

      setTimeout(() => this.submitted = false, 10000);
    },
error: (err) => {
  this.isLoading = false;
  if (err.status === 429) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Zbyt wiele prób',
      detail: 'Spróbuj ponownie za jakiś czas.',
      life: 6000
    });
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Błąd wysyłania',
      detail: 'Nie udało się wysłać wiadomości — spróbuj ponownie.',
      life: 6000
    });
  }
}
  });
}
}