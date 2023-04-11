import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item.component';
import { AddItemRoutingModule } from './add-item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddItemComponent],
  imports: [CommonModule, AddItemRoutingModule, ReactiveFormsModule],
})
export class AddItemModule {}
