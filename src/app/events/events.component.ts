import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  public events: any[] = [];
  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.db.getData().then((result) => this.events = result);
  }
}
