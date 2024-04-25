import { NavigationLink } from './navigation-link';

describe('NavigationLink', () => {
  it('should create an instance', () => {
    expect(new NavigationLink(1, 'label', 'url', true)).toBeTruthy();
  });
});
