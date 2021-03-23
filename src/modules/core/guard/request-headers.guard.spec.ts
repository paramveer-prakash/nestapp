import { RequestHeadersGuard } from './request-headers.guard';

describe('RequestHeadersGuard', () => {
  it('should be defined', () => {
    expect(new RequestHeadersGuard()).toBeDefined();
  });
});
