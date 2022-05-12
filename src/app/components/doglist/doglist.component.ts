import { Component } from '@angular/core';

@Component({
  selector: 'app-doglist',
  templateUrl: './doglist.component.html',
  styleUrls: ['./doglist.component.css'],
})
export class DoglistComponent {
  barkText?: string;

  doggos: Dog[] = [
    {
      name: 'Fido',
      bark: 'wooof',
      imageUrl:
        'https://images.dog.ceo/breeds/terrier-norfolk/n02094114_4127.jpg',
    },
    {
      name: 'Buck',
      bark: 'growl',
      imageUrl: 'https://images.dog.ceo/breeds/appenzeller/n02107908_2134.jpg',
    },
    {
      name: 'Bobo',
      bark: 'aroof',
      imageUrl: 'https://images.dog.ceo/breeds/shihtzu/n02086240_4751.jpg',
    },
  ];

  onClick(doggo: Dog) {
    this.barkText = `${doggo.name} says: ${doggo.bark}!`;
  }
}
