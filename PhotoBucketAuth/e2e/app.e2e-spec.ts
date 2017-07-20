import { PhotoBucketAuthPage } from './app.po';

describe('photo-bucket-auth App', () => {
  let page: PhotoBucketAuthPage;

  beforeEach(() => {
    page = new PhotoBucketAuthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
