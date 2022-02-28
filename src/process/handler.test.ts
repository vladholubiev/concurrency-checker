import {getMockHttpEvent, invoke} from '@shelf/lambda-test-utils';
import {handler} from './handler';

const event = getMockHttpEvent({
  pathParameters: {
    foo: 'bar',
  },
});

it('should return response', async () => {
  const resp = await invoke(handler, event);

  expect(resp).toEqual({works: true, pathParameters: {foo: 'bar'}});
});
