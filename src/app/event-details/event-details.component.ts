import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent {
  bought = false;
  public id: string | undefined;
  private routeSub: Subscription | undefined;
  public items: any[] = [];
  public eventName: string | undefined;
  public eventSolo: boolean | undefined;
  public eventDate: string | undefined;
  public eventAdmin: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: DatabaseService,
    public login: LoginService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.db.getItems(this.id!).then((result) => (this.items = result));
    this.db
      .getEvent(this.id!)
      .then((data) => {
        this.eventName = data.name;
        this.eventSolo = data.solo;
        this.eventDate = this.transformDateFormat(data.date);
        this.eventAdmin = data.admin;
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }

  transformDateFormat(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }

  public leaveEvent(): void {
    this.db.leaveEvent(this.id!).then(() => this.location.back());
  }

  public deleteEvent(): void {
    this.db.deleteEvent(this.id!).then(() => this.location.back());;
  }
  
  public deleteItem(idItem: string): void {
    this.db.deleteItem(idItem);
  }

  public editItem(idItem: string): void {
    this.router.navigate(['/edit-item', idItem]);
  }

  public updateBought(idItem: string, bought: boolean) {
    this.db.updateBought(idItem, bought);
  }
  public back(){
    this.location.back()
  }
  editEvent(eventId: string): void {
    this.router.navigate(['/edit-event', eventId]);
  }
}
