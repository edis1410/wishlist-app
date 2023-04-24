import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent {
  public id: string | undefined;
  private routeSub: Subscription | undefined;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']
    });
  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }
  
  public addItemForm = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    price: this.fb.control<string>('', [Validators.required]),
    link: this.fb.control<string>('', [Validators.required]),
  });

  get name() {
    return this.addItemForm.get('name');
  }
  get price() {
    return this.addItemForm.get('price');
  }
  get link() {
    return this.addItemForm.get('link');
  }

  public addItem(): void {
    if (this.addItemForm.valid) {
      this.db.addItem(
        this.name?.value!,
        parseFloat(this.price?.value!),
        this.link?.value!,
        this.id!
       )//.then(response => this.db.updateEvent("Dodan"));
    } else {
      console.log('Handle errors');
    }
  }
}
