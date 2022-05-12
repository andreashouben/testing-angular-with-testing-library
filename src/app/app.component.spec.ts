import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {
  const doggos: Dog[] = [
    { name: 'Fido', bark: 'wooof' },
    { name: 'Buck', bark: 'growl' },
    { name: 'Bobo', bark: 'aroof' },
  ];

  beforeEach(async () => {
    await render(AppComponent, {});
  });

  it('shows a heading called Doggo-World', () => {
    const heading = screen.getByRole('heading', { name: 'Doggo-World' });

    expect(heading).toBeVisible();
  });

  it('shows a list of the expected dogs', () => {
    const listitems = screen.getAllByRole('listitem');

    doggos.forEach((doggo, index) => {
      expect(listitems[index]).toHaveTextContent(
        `${doggo.name} says ${doggo.bark}!`
      );
    });
  });
});
