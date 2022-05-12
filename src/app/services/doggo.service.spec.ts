import { TestBed } from '@angular/core/testing';

import { DoggoService } from './doggo.service';

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
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoggoService);
  });

  it('returns the doggos', () => {
    expect(service.getDoggos).toEqual(expectedDoggos);
  });

  it('adds a doggo', () => {
    const newDog = {
      name: 'john',
      imageUrl: 'https://some.url/image.png',
      bark: 'bleargh',
    };
    service.addDoggo(newDog);

    expect(service.getDoggos).toEqual([...expectedDoggos, newDog]);
  });
});
