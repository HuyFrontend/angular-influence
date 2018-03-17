import { AntinPage } from './app.po';

describe('antin App', () => {
  let page: AntinPage;

  beforeEach(() => {
    page = new AntinPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
