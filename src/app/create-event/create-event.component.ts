import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  show: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DatabaseService,
    private login: LoginService
  ) {}

  public createEventForm = this.fb.group({
    name: this.fb.control<string | null>(null, [Validators.required]),
    date: this.fb.control<string>('', [Validators.required]),
    password: this.fb.control<string | null>(null, [Validators.required]),
    solo: this.fb.control<boolean | null>(null, [Validators.required]),
  });

  get name() {
    return this.createEventForm.get('name');
  }
  get date() {
    return this.createEventForm.get('date');
  }
  get password() {
    return this.createEventForm.get('password');
  }
  get solo() {
    return this.createEventForm.get('solo');
  }
  passwordShow() {
    this.show = !this.show;
  }

  public createEvent(): void {
    this.db.createEvent(
      this.name?.value!,
      this.date?.value!,
      this.password?.value!,
      this.solo?.value!,
      this.login.username
    );
  }

  public joinEventForm = this.fb.group({
    join: this.fb.control<string | null>(null, [Validators.required]),
  });

  get join() {
    return this.joinEventForm.get('join');
  }

  public joinEvent(): void {
    this.db.joinEvent(this.join?.value!);
  }
}
