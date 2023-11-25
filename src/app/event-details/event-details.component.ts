import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';

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
    private route: ActivatedRoute,
    private db: DatabaseService,
    public login: LoginService
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
        this.eventDate = data.date;
        this.eventAdmin = data.admin;
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });

  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }

  public leaveEvent(): void {
    this.db.leaveEvent(this.id!);
  }

  public deleteItem(idItem: string): void {
    this.db.deleteItem(idItem);
  }

  public updateBought(idItem: string, bought: boolean) {
    this.db.updateBought(idItem, bought);
  }
}
