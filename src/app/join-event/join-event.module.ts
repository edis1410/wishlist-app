import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinEventComponent } from './join-event.component';
import { JoinEventRoutingModule } from './join-event-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [JoinEventComponent],
  imports: [
    CommonModule,
    JoinEventRoutingModule,
    ReactiveFormsModule
  ]
})
export class JoinEventModule { }
