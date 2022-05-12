import { Component, OnInit } from '@angular/core';
import { DoggoService } from '../../services/doggo.service';

@Component({
  selector: 'app-doglist',
  templateUrl: './doglist.component.html',
  styleUrls: ['./doglist.component.css'],
})
export class DoglistComponent implements OnInit {
  barkText?: string;

  doggos: Dog[] = [];

  loadingStatus: LoadingStatus = 'loading';

  constructor(private dogService: DoggoService) {}

  onClick(doggo: Dog) {
    this.barkText = `${doggo.name} says: ${doggo.bark}!`;
  }

  ngOnInit(): void {
    this.dogService.getDoggos.subscribe(
      (values) => {
        this.doggos = values;
        this.loadingStatus = 'loaded';
      },
      () => {
        this.loadingStatus = 'error';
      }
    );
  }
}
