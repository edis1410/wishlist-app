import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  constructor(private fb: FormBuilder, private router: Router, private db: DatabaseService) {}

  public createEventForm = this.fb.group({
    name: this.fb.control<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    date: this.fb.control<string>('', [Validators.required]),
  });

  get name() {
    return this.createEventForm.get('name');
  }
  get date() {
    return this.createEventForm.get('date');
  }

  public createEvent(): void {
    // if (this.createEventForm.valid) {
      const createFormData = this.createEventForm.getRawValue();
      this.db.createEvent(this.name?.value!, this.date?.value!);
    // } else {
    //   console.log('Handle errors');
    // }
  }
}
