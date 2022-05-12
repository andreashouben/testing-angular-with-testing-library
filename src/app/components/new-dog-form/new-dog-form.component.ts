import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-dog-form',
  templateUrl: './new-dog-form.component.html',
  styleUrls: ['./new-dog-form.component.css'],
})
export class NewDogFormComponent {
  @Output()
  onSubmitDog = new EventEmitter<Dog>();

  dogForm = new FormGroup({
    name: new FormControl(''),
    bark: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  submitDog() {
    const dog: Dog = this.dogForm.value;
    this.onSubmitDog.emit(dog);
  }
}
