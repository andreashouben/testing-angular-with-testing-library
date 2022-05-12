import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './src/mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
