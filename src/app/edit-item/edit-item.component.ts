import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {

  itemId!: string;
  itemForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private db: DatabaseService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.itemForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      price: this.fb.control<string>('', [Validators.required]),
      note: this.fb.control<string>('', [Validators.required]),
      link: this.fb.control<string>('', [Validators.required]),
    });
    this.loadItemData();
  }

  get name() {
    return this.itemForm.get('name');
  }
  get price() {
    return this.itemForm.get('price');
  }
  get note() {
    return this.itemForm.get('note');
  }
  get link() {
    return this.itemForm.get('link');
  }

  loadItemData(): void {
    if (this.itemId) {
      this.db.getItem(this.itemId).then(itemData => {
        this.itemForm.patchValue(itemData);
      }).catch(error => {
        console.error('Error fetching item data: ', error);
      });
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.db.editItem(
        this.itemId,
        this.name?.value!,
        parseFloat(this.price?.value!),
        this.note?.value!,
        this.link?.value!,
       ).then(() => this.location.back());
    } else {
      console.log('Handle errors');
    }
  }
  
  public back(){
    this.location.back()
  }
}
