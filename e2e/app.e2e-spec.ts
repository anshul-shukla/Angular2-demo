import { EtPage } from './app.po';

describe('et App', function() {
  let page: EtPage;

  beforeEach(() => {
    page = new EtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
