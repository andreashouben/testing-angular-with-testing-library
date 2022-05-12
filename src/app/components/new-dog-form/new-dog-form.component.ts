import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoggoService } from '../../services/doggo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-dog-form',
  templateUrl: './new-dog-form.component.html',
  styleUrls: ['./new-dog-form.component.css'],
})
export class NewDogFormComponent {
  constructor(private doggoService: DoggoService, private router: Router) {}

  dogForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    bark: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  backendErrors: undefined | { error: string };

  submitDog() {
    const dog: Dog = this.dogForm.value;
    this.dogForm.markAllAsTouched();

    if (this.dogForm.valid) {
      this.doggoService.addDoggo(dog).subscribe({
        next: () => {
          this.router.navigateByUrl('');
        },
        error: ({ error }) => {
          this.backendErrors = error;
        },
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('');
  }

  get name() {
    return this.dogForm.get('name');
  }

  get imageUrl() {
    return this.dogForm.get('imageUrl');
  }

  get bark() {
    return this.dogForm.get('bark');
  }
}
