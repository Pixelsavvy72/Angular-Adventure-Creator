import { DiveAdvPage } from './app.po';

describe('dive-adv App', () => {
  let page: DiveAdvPage;

  beforeEach(() => {
    page = new DiveAdvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
