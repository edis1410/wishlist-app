import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  public id: string | undefined;
  private routeSub: Subscription | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'] //log the value of id
    });
  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }

}
