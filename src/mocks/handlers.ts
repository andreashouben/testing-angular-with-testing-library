import { rest } from 'msw';

let doggos: Dog[] = [
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

export const API_PATH = '/api/doggos';
export const handlers = [
  rest.get(API_PATH, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(doggos));
  }),
  rest.put<Dog>(API_PATH, (req, res, ctx) => {
    const dog = req.body;

    if (['paul', 'earl'].includes(dog.name.toLowerCase())) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Do not use Paul or Earl as dog name.' })
      );
    }
    doggos = [...doggos, dog];

    return res(ctx.status(201));
  }),
];
