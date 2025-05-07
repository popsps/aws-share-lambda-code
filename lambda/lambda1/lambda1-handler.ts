// import { APIGatewayProxyCallback, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
/* eslint-disable import/extensions, import/no-absolute-path */
// @ts-ignore
// import { getRandomMessage } from "/opt/nodejs/nodejs/util.mjs";
import { execSync } from "child_process"
import { getRandomMessage } from "../../layers/nodejs/util.js";

// export const handler = async (
//   event: APIGatewayProxyEvent,
//   context: Context,
//   callback: APIGatewayProxyCallback
// ): Promise<APIGatewayProxyResult> => {
export const handler = async (
  event: any,
): Promise<any> => {
  try {
    const s = execSync("ls -l /opt/nodejs", {encoding: 'utf8'}).toString();
    console.log(s);
    const s2 = execSync("cat /opt/nodejs/util.ts", {encoding: 'utf8'}).toString();
    console.log(s2);
    const uuid = crypto.randomUUID();
    const uid = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    console.log('Event:', JSON.stringify(event, null, 2));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello from Lambda1.006',
        event: {
          method: event.httpMethod,
          path: event.path,
          body: event.body,
          resource: event.resource,
          id: uuid,
          uid: uid,
          message: getRandomMessage(),
        }
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};