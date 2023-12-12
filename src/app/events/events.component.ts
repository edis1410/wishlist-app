import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  public events: any[] = [];

  constructor(private db: DatabaseService, private router: Router,private location: Location,) {}

  ngOnInit(): void {
    this.db.getEvents().then((events) => {
      this.events = events.map((event) => ({
        id: event.id,
        name: event.name 
      }));
    }).catch((error) => {
      console.error('Error fetching events:', error);
    });

  }

  goToEventDetails(eventId: string): void {
    this.router.navigate(['/event', eventId]);
  }

  public back(){
    this.location.back()
  }
}
