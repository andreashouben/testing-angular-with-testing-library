import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DoggoService {
  constructor(private httpClient: HttpClient) {}

  backendUrl = '/api/doggos';

  get getDoggos() {
    return this.httpClient.get<Dog[]>(this.backendUrl);
  }

  addDoggo(dog: Dog) {
    return this.httpClient.put(this.backendUrl, dog);
  }
}
