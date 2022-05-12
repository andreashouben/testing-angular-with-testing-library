import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  doggos: Dog[] = [
    { name: 'Fido', bark: 'wooof' },
    { name: 'Buck', bark: 'growl' },
    { name: 'Bobo', bark: 'aroof' },
  ];

  constructor() {}
}
