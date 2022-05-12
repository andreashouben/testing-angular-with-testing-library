import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DogComponent } from './components/dog/dog.component';
import { DoglistComponent } from './components/doglist/doglist.component';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  const doggos: Dog[] = [
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

  beforeEach(async () => {
    const { navigate } = await render(AppComponent, {
      declarations: [DogComponent, DoglistComponent],
      imports: [AppRoutingModule],
    });
    await navigate('');
  });

  it('shows a heading called Doggo-World', () => {
    const heading = screen.getByRole('heading', { name: 'Doggo-World' });

    expect(heading).toBeVisible();
  });

  it('shows an image of each dog', () => {
    doggos.forEach((doggo) => {
      const image = screen.getByAltText('Image of ' + doggo.name);

      expect(image).toHaveAttribute('src', doggo.imageUrl);
    });
  });

  it('shows the name of each dog', () => {
    doggos.forEach((doggo) => {
      const name = screen.getByText(doggo.name);

      expect(name).toBeVisible();
    });
  });

  it('shows no text after rendering', () => {
    const barkText = screen.queryByTestId('bark-text');

    expect(barkText).toBeNull();
  });

  it('has a "bark" button next to each dog. Clicking on it, shows the text "${dogname} says: ${dogbark}', async () => {
    const buttons = screen.getAllByRole('button', { name: /bark/i });

    await userEvent.click(buttons[0]);

    expect(screen.getByText('Fido says: wooof!'));

    await userEvent.click(buttons[1]);

    expect(screen.getByText('Buck says: growl!'));

    await userEvent.click(buttons[2]);

    expect(screen.getByText('Bobo says: aroof!'));
  });
});
