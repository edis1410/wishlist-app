import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event.component';
import { CreateEventRoutingModule } from './create-event-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateEventComponent],
  imports: [CommonModule, CreateEventRoutingModule, ReactiveFormsModule],
})
export class CreateEventModule {}
