import { Component } from '@angular/core';
import { DoggoService } from '../../services/doggo.service';

@Component({
  selector: 'app-doglist',
  templateUrl: './doglist.component.html',
  styleUrls: ['./doglist.component.css'],
})
export class DoglistComponent {
  barkText?: string;

  doggos: Dog[] = [];

  constructor(dogService: DoggoService) {
    this.doggos = dogService.getDoggos;
  }

  onClick(doggo: Dog) {
    this.barkText = `${doggo.name} says: ${doggo.bark}!`;
  }
}
