import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEventComponent } from './edit-event.component';
import { EditEventRoutingModule } from './edit-event-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditEventComponent
  ],
  imports: [
    CommonModule,
    EditEventRoutingModule,
    TranslocoModule,
    ReactiveFormsModule
  ]
})
export class EditEventModule { }
