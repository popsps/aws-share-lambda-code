import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../lambda/lambda1/lambda1-handler";
// import payload from './event1.json'

test('test handler', async () => {
  const event: APIGatewayProxyEvent = {
    httpMethod: 'GET',
    body: "",
    headers: undefined,
    multiValueHeaders: undefined,
    isBase64Encoded: false,
    path: "",
    pathParameters: undefined,
    queryStringParameters: undefined,
    multiValueQueryStringParameters: undefined,
    stageVariables: undefined,
    requestContext: undefined,
    resource: ""
  };
  console.log('hello')
  expect(1).toBe(1);
  const response = await handler(event, null, null);
  expect(response.statusCode).toBe(200);
});
