// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
// import { handler } from './lambda2-handler';
// import { getRandomMessage } from '../utilityA/utility1';
//
// // Mock the utility function
// jest.mock('../utilityA/utility1', () => ({
//   getRandomMessage: jest.fn().mockReturnValue('mocked message')
// }));
//
// describe('lambda2-handler', () => {
//   let mockEvent: APIGatewayProxyEvent;
//   let mockContext: Context;
//   let mockCallback: jest.Mock;
//
//   beforeEach(() => {
//     mockEvent = {
//       httpMethod: 'GET',
//       path: '/test',
//       body: null,
//       resource: '/test',
//     } as APIGatewayProxyEvent;
//
//     mockContext = {
//       functionName: 'lambda2',
//       functionVersion: '1.0',
//       invokedFunctionArn: 'arn:test',
//       memoryLimitInMB: '128',
//       awsRequestId: '123',
//       logGroupName: 'test-group',
//       logStreamName: 'test-stream',
//       getRemainingTimeInMillis: () => 1000,
//       done: () => {},
//       fail: () => {},
//       succeed: () => {},
//     };
//
//     mockCallback = jest.fn();
//   });
//
//   test('should return 200 with correct response', async () => {
//     const response = await handler(mockEvent, mockContext, mockCallback);
//
//     expect(response.statusCode).toBe(200);
//     expect(response.headers).toEqual({ 'Content-Type': 'application/json' });
//
//     const body = JSON.parse(response.body);
//     expect(body.message).toBe('Hello from Lambda2');
//     expect(body.event.method).toBe('GET');
//     expect(body.event.path).toBe('/test');
//     expect(body.event.message).toBe('mocked message');
//     expect(body.event.uid).toBeDefined();
//     expect(body.event.id).toBeDefined();
//   });
//
//   test('should return 500 when an error occurs', async () => {
//     jest.spyOn(getRandomMessage as jest.Mock, 'mockImplementation').mockImplementation(() => {
//       throw new Error('Test error');
//     });
//
//     const response = await handler(mockEvent, mockContext, mockCallback);
//
//     expect(response.statusCode).toBe(500);
//     expect(response.headers).toEqual({ 'Content-Type': 'application/json' });
//
//     const body = JSON.parse(response.body);
//     expect(body.message).toBe('Internal server error');
//     expect(body.error).toBe('Test error');
//   });
// });