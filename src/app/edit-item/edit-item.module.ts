import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditItemComponent } from './edit-item.component';
import { EditItemRoutingModule } from './edit-item-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditItemComponent
  ],
  imports: [
    CommonModule,
    EditItemRoutingModule,
    TranslocoModule,
    ReactiveFormsModule
  ]
})
export class EditItemModule { }
