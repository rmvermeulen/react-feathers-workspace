import { app } from '../src/app';

describe('App', () => {
  test('is server', () => {
    expect(app).toBeDefined();
    expect(app.listen).toBeFunction();
  });
});
