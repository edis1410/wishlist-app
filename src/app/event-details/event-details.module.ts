import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details.component';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [EventDetailsComponent],
  imports: [CommonModule, EventDetailsRoutingModule, TranslocoModule],
})
export class EventDetailsModule {}
