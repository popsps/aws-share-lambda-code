import { Logger } from "@aws-lambda-powertools/logger";

export const handler = async (event, context, callback) => {
  try {
    const bucket = {
      name: 'my-bucket',
      region: 'us-east-1',
      forceRemove: true,
      acl: 'public-read',
      cors: true,
      versioning: true,
      website: true,
      logging: true,
      tags: {
        Name: 'my-bucket',
        Environment: 'dev'
      },
      lifecycleRules: [
        {
          id: 'rule-1',
          enabled: true,
          prefix: 'logs/',
          expiration: 30,
          noncurrentVersionExpiration: 30,
          noncurrentVersionTransitions: [
            {}
          ]
        }
      ],
      a: (b) => b * 2 + 7,
    };
    console.info("Hello info from Lambda5.001");
    console.debug("Hello debug from Lambda5.001");
    // text format good
    console.log('Event:', JSON.stringify(event, null, 2));
    console.log('Event:', event);
    // json format good
    console.log(event);
    // text format good
    console.log('bucket:', JSON.stringify(bucket, null, 2));
    console.log('bucket:', bucket);
    // json format good
    console.log(bucket);

    // good when log format is text
    console.log('\n%j', { a: 1, b: 2, x: "xxx" });
    console.log('\t%j', { a: 1, b: 2, x: "xxx" });
    const name = 'world';
    console.log('hello %s\t%j', name, { a: 1, b: 2, x: "xxx" });

    const logger = new Logger({
      serviceName: 'lambdaLoggTest',
      logLevel: 'INFO',
      requestId: context.awsRequestId,
      persistentKeys: {
        requestId: context.awsRequestId,
        boo: 'goo',
      },
    });
    logger.info('Hello info from Lambda5.001');
    logger.debug('Hello info from Lambda5.001');
    logger.info('bucket:', bucket);
    logger.info(bucket);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello from Lambda5.001',
        event: {
          method: event.httpMethod,
          path: event.path,
          body: event.body,
          resource: event.resource,
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