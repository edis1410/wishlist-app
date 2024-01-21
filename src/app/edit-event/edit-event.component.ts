import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent {
  eventId!: string;
  eventForm!: FormGroup;
  show: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private db: DatabaseService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    this.eventForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      date: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required]),
      solo: this.fb.control<boolean>(true, [Validators.required]),
    });
    this.loadEventData();
  }

  loadEventData(): void {
    if (this.eventId) {
      this.db
        .getEvent(this.eventId)
        .then((eventData) => {
          this.eventForm.patchValue(eventData);
        })
        .catch((error) => {
          console.error('Error fetching event data: ', error);
        });
    }
  }

  get name() {
    return this.eventForm.get('name');
  }
  get date() {
    return this.eventForm.get('date');
  }
  get password() {
    return this.eventForm.get('password');
  }
  get solo() {
    return this.eventForm.get('solo');
  }
  passwordShow() {
    this.show = !this.show;
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.db.editEvent(
        this.eventId,
        this.name?.value!,
        this.date?.value!,
        this.password?.value!,
        this.solo?.value!
      ).then(() => this.location.back());
    }
  }

  public back(){
    this.location.back()
  }
}
