import { AppComponent } from './app.component';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DogComponent } from './components/dog/dog.component';
import { DoglistComponent } from './components/doglist/doglist.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewDogFormComponent } from './components/new-dog-form/new-dog-form.component';
import { HttpClientModule } from '@angular/common/http';
import { server } from '../../setup-jest';
import { rest } from 'msw';
import { API_PATH } from '../mocks/handlers';

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

  describe('happy path', () => {
    let navigate: any;
    let component: AppComponent;

    beforeEach(async () => {
      const renderResult = await render(AppComponent, {
        declarations: [DogComponent, DoglistComponent, NewDogFormComponent],
        imports: [AppRoutingModule, ReactiveFormsModule, HttpClientModule],
      });
      navigate = renderResult.navigate;
      component = renderResult.fixture.componentInstance;
      await navigate('');
    });

    it('shows a heading called Doggo-World', () => {
      const heading = screen.getByRole('heading', { name: 'Doggo-World' });

      expect(heading).toBeVisible();
    });

    describe('after data loaded', () => {
      beforeEach(async () => {
        const loadingText = screen.getByText('Loading...');
        await waitForElementToBeRemoved(loadingText);
      });

      it('shows an image of each dog', async () => {
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

      it('navigates to the new dog form when clicking on Enter new Dog', async () => {
        await navigate(screen.getByRole('link', { name: 'Enter new Dog' }));

        expect(
          screen.getByRole('group', { name: /enter new dog/i })
        ).toBeVisible();
      });
    });
  });

  describe('error case', () => {
    beforeEach(async () => {
      server.use(
        rest.get(API_PATH, (req, res, ctx) => {
          return res.once(ctx.status(500));
        })
      );

      const { navigate } = await render(AppComponent, {
        declarations: [DogComponent, DoglistComponent, NewDogFormComponent],
        imports: [AppRoutingModule, ReactiveFormsModule, HttpClientModule],
      });
      await navigate('');
    });

    beforeEach(async () => {
      const loadingText = screen.getByText('Loading...');
      await waitForElementToBeRemoved(loadingText);
    });

    it('should show an error message', () => {
      screen.getByText('Oh no, there was an error loading the dogs...');
    });
  });
});
