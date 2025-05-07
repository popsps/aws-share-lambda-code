// // lambda3-handler.test.ts
// import { handler } from './lambda3-handler';
// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
// import crypto from 'crypto';
// import { v4 as uuidv4 } from 'uuid';
//
// jest.mock('crypto');
// jest.mock('uuid');
//
// const mockedCrypto = crypto as jest.Mocked<typeof crypto>;
// const mockedUuidv4 = uuidv4 as jest.Mock;
//
// describe('handler function', () => {
//   const mockContext: Context = {
//     callbackWaitsForEmptyEventLoop: false,
//     functionName: 'test-function',
//     functionVersion: '1',
//     invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:test-function',
//     memoryLimitInMB: '128',
//     awsRequestId: 'unique-id',
//     logGroupName: '/aws/lambda/test-function',
//     logStreamName: 'log-stream-name',
//     getRemainingTimeInMillis: jest.fn(),
//     done: jest.fn(),
//     fail: jest.fn(),
//     succeed: jest.fn(),
//   };
//
//   beforeEach(() => {
//     jest.clearAllMocks();
//     mockedCrypto.randomUUID.mockReturnValue('mocked-crypto-uuid');
//     mockedUuidv4.mockReturnValue('mocked-uuid-v4');
//   });
//
//   test('should return a 200 response with the expected body', async () => {
//     const mockEvent: APIGatewayProxyEvent = {
//       httpMethod: 'GET',
//       path: '/test-path',
//       body: '{"testKey":"testValue"}',
//       resource: '/test-resource',
//       isBase64Encoded: false,
//       multiValueHeaders: {},
//       queryStringParameters: null,
//       pathParameters: null,
//       stageVariables: null,
//       headers: {},
//       requestContext: {
//         httpMethod: 'GET',
//         resourcePath: '/test-path',
//         accountId: '123456789012',
//         stage: 'test',
//         identity: {
//           accessKey: null,
//           accountId: null,
//           apiKey: null,
//           apiKeyId: null,
//           caller: null,
//           cognitoAuthenticationProvider: null,
//           cognitoAuthenticationType: null,
//           cognitoIdentityId: null,
//           cognitoIdentityPoolId: null,
//           principalOrgId: null,
//           sourceIp: '127.0.0.1',
//           user: null,
//           userAgent: null,
//           userArn: null,
//         },
//         requestId: 'test-request-id',
//         resourceId: 'test-resource-id',
//         apiId: 'test-api-id',
//       },
//     } as APIGatewayProxyEvent;
//
//     const result = await handler(mockEvent, mockContext, jest.fn());
//
//     expect(result.statusCode).toBe(200);
//     expect(JSON.parse(result.body)).toEqual({
//       message: 'Hello from Lambda3.001',
//       event: {
//         method: 'GET',
//         path: '/test-path',
//         body: '{"testKey":"testValue"}',
//         resource: '/test-resource',
//         id: 'mocked-crypto-uuid',
//         uid: 'mocked-uuid-v4',
//         message: expect.any(String),
//       },
//     });
//     expect(mockedCrypto.randomUUID).toHaveBeenCalled();
//     expect(mockedUuidv4).toHaveBeenCalled();
//   });
//
//   test('should return a 500 response on error', async () => {
//     const mockEvent: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;
//     mockedCrypto.randomUUID.mockImplementation(() => {
//       throw new Error('Test Error');
//     });
//
//     const result = await handler(mockEvent, mockContext, jest.fn());
//
//     expect(result.statusCode).toBe(500);
//     expect(JSON.parse(result.body)).toEqual({
//       message: 'Internal server error',
//       error: 'Test Error',
//     });
//     expect(mockedCrypto.randomUUID).toHaveBeenCalled();
//   });
// });