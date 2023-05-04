import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  public id: string | undefined;
  private routeSub: Subscription | undefined;
  public items: any[] = [];
  constructor(private route: ActivatedRoute, private db: DatabaseService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']
    });
    this.db.getItems(this.id!).then((result) => this.items = result);
  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }

  public leaveEvent(): void{
    this.db.leaveEvent(this.id!);
  }

  public deleteItem(): void{
    this.db.deleteItem(this.id!);
  }
}
