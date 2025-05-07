// // lambda2-handler.test.ts
// import { handler } from './lambda2-handler';
// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
// import crypto from 'crypto';
// import { v4 as uuidv4 } from 'uuid';
//
// jest.mock('crypto');
// jest.mock('uuid');
//
// describe('lambda2-handler handler function', () => {
//   const context: Context = {
//     callbackWaitsForEmptyEventLoop: false,
//     functionName: 'test-function',
//     functionVersion: '1',
//     invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:test-function',
//     memoryLimitInMB: '128',
//     awsRequestId: 'test-id',
//     logGroupName: '/aws/lambda/test-function',
//     logStreamName: '2023/01/01/[$LATEST]test-log-stream',
//     getRemainingTimeInMillis: jest.fn(),
//     done: jest.fn(),
//     fail: jest.fn(),
//     succeed: jest.fn()
//   };
//
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });
//
//   it('should return a successful response with the expected body', async () => {
//     const testUuid = '1234-5678-91011';
//     const testUid = 'abcd-efgh-ijkl';
//
//     const event: APIGatewayProxyEvent = {
//       httpMethod: 'GET',
//       resource: '/test',
//       path: '/test',
//       body: null,
//       queryStringParameters: null,
//       multiValueQueryStringParameters: null,
//       headers: {},
//       multiValueHeaders: {},
//       pathParameters: null,
//       stageVariables: null,
//       requestContext: undefined as any,
//       isBase64Encoded: false
//     };
//
//     (crypto.randomUUID as jest.Mock).mockReturnValue(testUuid);
//     (uuidv4 as jest.Mock).mockReturnValue(testUid);
//
//     const response = await handler(event, context, jest.fn());
//
//     expect(response.statusCode).toBe(200);
//     expect(response.headers).toEqual({'Content-Type': 'application/json'});
//     const responseBody = JSON.parse(response.body);
//     expect(responseBody.message).toBe('Hello from Lambda2');
//     expect(responseBody.event).toEqual(
//       expect.objectContaining({
//         method: 'GET',
//         path: '/test',
//         body: null,
//         resource: '/test',
//         id: testUuid,
//         uid: testUid
//       })
//     );
//   });
//
//   it('should return an error response in case of an exception', async () => {
//     (crypto.randomUUID as jest.Mock).mockImplementation(() => {
//       throw new Error('Test error');
//     });
//
//     const event: APIGatewayProxyEvent = {
//       httpMethod: 'GET',
//       resource: '/test',
//       path: '/test',
//       body: null,
//       queryStringParameters: null,
//       multiValueQueryStringParameters: null,
//       headers: null,
//       multiValueHeaders: null,
//       pathParameters: null,
//       stageVariables: null,
//       requestContext: undefined as any,
//       isBase64Encoded: false
//     };
//
//     const response = await handler(event, context, jest.fn());
//
//     expect(response.statusCode).toBe(500);
//     expect(response.headers).toEqual({'Content-Type': 'application/json'});
//     const responseBody = JSON.parse(response.body);
//     expect(responseBody.message).toBe('Internal server error');
//     expect(responseBody.error).toBe('Test error');
//   });
// });