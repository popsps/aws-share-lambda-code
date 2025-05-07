// import { handler } from './lambda2-handler';
// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
// import * as utility1 from '../utilityA/utility1';
// import { v4 as uuidv4 } from 'uuid';
//
// jest.mock('uuid', () => ({
//   v4: jest.fn(),
// }));
//
// jest.mock('../utilityA/utility1', () => ({
//   getRandomMessage: jest.fn(),
// }));
//
// describe('lambda2-handler', () => {
//   const mockEvent: APIGatewayProxyEvent = {
//     body: null,
//     headers: {},
//     httpMethod: 'GET',
//     isBase64Encoded: false,
//     path: '/test',
//     pathParameters: null,
//     queryStringParameters: null,
//     stageVariables: null,
//     requestContext: {} as any,
//     resource: '/test',
//   };
//
//   const mockContext: Context = {} as any;
//
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//
//   it('should return a successful response with the correct body', async () => {
//     const mockUuid = 'mock-uuid';
//     const mockUid = 'mock-uid';
//     const mockMessage = 'Random message';
//
//     (uuidv4 as jest.Mock).mockReturnValue(mockUid);
//     (utility1.getRandomMessage as jest.Mock).mockReturnValue(mockMessage);
//
//     const response = await handler(mockEvent, mockContext, jest.fn());
//
//     expect(response.statusCode).toBe(200);
//     expect(response.headers).toEqual({ 'Content-Type': 'application/json' });
//     expect(JSON.parse(response.body)).toEqual({
//       message: 'Hello from Lambda2',
//       event: {
//         method: 'GET',
//         path: '/test',
//         body: null,
//         resource: '/test',
//         id: expect.any(String),
//         uid: mockUid,
//         message: mockMessage,
//       },
//     });
//   });
//
//   it('should return an error response when an exception is thrown', async () => {
//     const mockError = new Error('Test error');
//     jest.spyOn(console, 'error').mockImplementation(() => {});
//     (uuidv4 as jest.Mock).mockImplementation(() => {
//       throw mockError;
//     });
//
//     const response = await handler(mockEvent, mockContext, jest.fn());
//
//     expect(response.statusCode).toBe(500);
//     expect(response.headers).toEqual({ 'Content-Type': 'application/json' });
//     expect(JSON.parse(response.body)).toEqual({
//       message: 'Internal server error',
//       error: 'Test error',
//     });
//     expect(console.error).toHaveBeenCalledWith('Error:', mockError);
//   });
// });