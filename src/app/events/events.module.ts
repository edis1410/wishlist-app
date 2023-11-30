import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, EventsRoutingModule, TranslocoModule],
})
export class EventsModule {}
