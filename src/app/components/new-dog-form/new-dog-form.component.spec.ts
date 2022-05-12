import { NewDogFormComponent } from './new-dog-form.component';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { DoggoService } from '../../services/doggo.service';
import { Router } from '@angular/router';

describe('NewDogFormComponent', () => {
  let mockAddFunction = jest.fn();
  let mockNavigateFunction = jest.fn();

  beforeEach(async () => {
    await render(NewDogFormComponent, {
      imports: [ReactiveFormsModule],
      componentProviders: [
        { provide: DoggoService, useValue: { addDoggo: mockAddFunction } },
        { provide: Router, useValue: { navigateByUrl: mockNavigateFunction } },
      ],
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should add a new dog after filling out the form and return to the main page', async () => {
    const fieldSet = screen.getByRole('group', { name: /Enter new dog/i });
    const nameInput = within(fieldSet).getByLabelText(/name:/i);
    const urlInput = within(fieldSet).getByLabelText(/ImgUrl:/i);
    const barkInput = within(fieldSet).getByLabelText(/bark:/i);

    await userEvent.type(nameInput, 'Beethoven');
    await userEvent.type(
      urlInput,
      'https://images.dog.ceo/breeds/terrier-patterdale/dog-1268559_640.jpg'
    );
    await userEvent.type(barkInput, 'BARK! BARK! BARK!');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const expectedDog: Dog = {
      name: 'Beethoven',
      imageUrl:
        'https://images.dog.ceo/breeds/terrier-patterdale/dog-1268559_640.jpg',
      bark: 'BARK! BARK! BARK!',
    };

    expect(mockAddFunction).toHaveBeenCalledWith(expectedDog);
    expect(mockNavigateFunction).toHaveBeenCalledWith('');
  });

  it('should ignore the inputs and just navigate to home when clicking the cancel button', async () => {
    const button = screen.getByRole('button', { name: /cancel/i });

    await userEvent.click(button);

    expect(mockNavigateFunction).toHaveBeenCalledWith('');
  });

  it('should show required messages if the name of the dog is missing', async () => {
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Name is required'));
    expect(screen.getByText('Image Url is required'));
    expect(screen.getByText('Bark is required'));
    expect(mockAddFunction).not.toHaveBeenCalledWith();
    expect(mockNavigateFunction).not.toHaveBeenCalledWith('');
  });

  it('rejects dog names shorter than 3 letters', async () => {
    const fieldSet = screen.getByRole('group', { name: /Enter new dog/i });
    const nameInput = within(fieldSet).getByLabelText(/name:/i);
    const urlInput = within(fieldSet).getByLabelText(/ImgUrl:/i);
    const barkInput = within(fieldSet).getByLabelText(/bark:/i);

    await userEvent.type(nameInput, 'Bo');
    await userEvent.type(
      urlInput,
      'https://images.dog.ceo/breeds/terrier-patterdale/dog-1268559_640.jpg'
    );
    await userEvent.type(barkInput, 'BARK! BARK! BARK!');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Name needs to have at least 3 letters'));
    expect(mockAddFunction).not.toHaveBeenCalledWith();
    expect(mockNavigateFunction).not.toHaveBeenCalledWith('');
  });
});
