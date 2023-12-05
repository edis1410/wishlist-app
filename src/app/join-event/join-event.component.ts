import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.css']
})
export class JoinEventComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DatabaseService,
    private login: LoginService,
    private location: Location,
  ) {}

  public joinEventForm = this.fb.group({
    join: this.fb.control<string | null>(null, [Validators.required]),
  });

  get join() {
    return this.joinEventForm.get('join');
  }

  public joinEvent(): void {
    this.db.joinEvent(this.join?.value!);
  }
  
  public back(){
    this.location.back()
  }

}
