import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event.component';
import { CreateEventRoutingModule } from './create-event-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [CreateEventComponent],
  imports: [CommonModule, CreateEventRoutingModule, ReactiveFormsModule, TranslocoModule],
})
export class CreateEventModule {}
