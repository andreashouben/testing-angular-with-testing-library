import { NewDogFormComponent } from './new-dog-form.component';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';

describe('NewDogFormComponent', () => {
  let emitDog = jest.fn();

  beforeEach(async () => {
    await render(NewDogFormComponent, {
      imports: [ReactiveFormsModule],
      componentProperties: {
        onSubmitDog: {
          emit: emitDog,
        },
      } as any,
    });
  });

  it('should return a new dog after filling out the form', async () => {
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

    expect(emitDog).toHaveBeenCalledWith(expectedDog);
  });
});
