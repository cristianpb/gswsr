import { CleanTweetPipe } from './clean-tweet.pipe';

describe('CleanTweetPipe', () => {
  it('create an instance', () => {
    const pipe = new CleanTweetPipe();
    expect(pipe).toBeTruthy();
  });
});
