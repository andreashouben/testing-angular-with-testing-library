import { TestBed } from '@angular/core/testing';

import { DoggoService } from './doggo.service';
import { HttpClientModule } from '@angular/common/http';
import { waitFor } from '@testing-library/angular';
import { lastValueFrom } from 'rxjs';

describe('DoggoService', () => {
  let service: DoggoService;

  const expectedDoggos: Dog[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DoggoService);
  });

  it('returns the doggos', async () => {
    let actualDoggos: Dog[] = [];
    service.getDoggos.subscribe((received) => (actualDoggos = received));
    await waitFor(() => expect(actualDoggos).toEqual(expectedDoggos));
  });

  it('adds a doggo', async () => {
    const newDog = {
      name: 'john',
      imageUrl: 'https://some.url/image.png',
      bark: 'bleargh',
    };

    await lastValueFrom(service.addDoggo(newDog));
    const actualDoggos = await lastValueFrom(service.getDoggos);
    expect(actualDoggos).toContainEqual(newDog);
  });
});
