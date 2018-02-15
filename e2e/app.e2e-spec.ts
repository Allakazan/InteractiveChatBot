import { InteractiveChatBotPage } from './app.po';

describe('interactive-chat-bot App', function() {
  let page: InteractiveChatBotPage;

  beforeEach(() => {
    page = new InteractiveChatBotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
