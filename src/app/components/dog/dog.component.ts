import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css'],
})
export class DogComponent {
  @Input()
  doggo!: Dog;

  @Output()
  onClick = new EventEmitter<Dog>();
}
