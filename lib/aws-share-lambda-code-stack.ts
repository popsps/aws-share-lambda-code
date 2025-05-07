import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LogLevel, NodejsFunction, OutputFormat, SourceMapMode } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ApplicationLogLevel, SystemLogLevel } from 'aws-cdk-lib/aws-lambda';
import * as path from "node:path";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { RetentionDays } from "aws-cdk-lib/aws-logs";


export class AwsShareLambdaCodeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const utilityALayer = new lambda.LayerVersion(this, 'utility-a-layer', {
      // code: lambda.Code.fromAsset('lambda/utilityA'),
      code: lambda.Code.fromAsset('layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
      description: 'Utility Layer A',
    });

    const utilBLayer = new lambda.LayerVersion(this, 'util-bc-layer', {
      code: lambda.Code.fromAsset('layers/utilB'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
      description: 'Utility Layer B',
    });

    // doesn't work with TypeScript lambda
    const lambda1 = new NodejsFunction(this, "lambda1", {
      functionName: 'lambda1',
      memorySize: 128,
      timeout: cdk.Duration.seconds(30),
      runtime: lambda.Runtime.NODEJS_22_X,
      logRetention: RetentionDays.ONE_DAY,
      // directory
      // code: lambda.Code.fromAsset('lambda/lambda1'),
      // handler: 'lambda1-handler.handler',
      entry: path.join(__dirname, '../lambda/lambda1/index.js'),
      handler: 'handler',
      environment: {
        NODE_OPTIONS: "--experimental-strip-types --experimental-transform-types",
      },
      layers: [
        utilityALayer,
      ],
      bundling: {
        format: OutputFormat.ESM,
        target: 'esnext',
        externalModules: ['aws-sdk'],
      },
    });

    const lambda2 = new NodejsFunction(this, 'lambda2', {
      functionName: 'lambda2',
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, '../lambda/lambda2/lambda2-handler.ts'),
      logRetention: RetentionDays.ONE_DAY,
      memorySize: 128,
      timeout: cdk.Duration.seconds(30),
      handler: 'handler',
      environment: {
        NODE_OPTIONS: "--experimental-strip-types --experimental-transform-types",
      },
      bundling: {
        format: OutputFormat.ESM,
        target: 'esnext',
        // loader: {
        //   '.ts': 'text'
        // },
        externalModules: ['@aws-sdk'],

        // sourceMap: true,
        // sourcesContent: true,
        // platform: 'neutral',
        logLevel: LogLevel.INFO,
        sourceMapMode: SourceMapMode.EXTERNAL,
        esbuildArgs: {
          // "--outdir": "./dist",
        }
      },
    });

    const lambda4 = new lambda.Function(this, "lambda4", {
      functionName: 'lambda4',
      memorySize: 128,
      timeout: cdk.Duration.seconds(30),
      runtime: lambda.Runtime.NODEJS_22_X,
      logRetention: RetentionDays.ONE_DAY,
      loggingFormat: lambda.LoggingFormat.JSON,
      // directory
      code: lambda.Code.fromAsset('lambda/lambda4'),
      handler: 'lambda4-handler.handler',
      environment: {
        // NODE_OPTIONS: "--experimental-strip-types --experimental-transform-types",
      },
      layers: [
        utilBLayer,
      ],
    });

    // testing logging level
    const lambda5 = new NodejsFunction(this, 'lambda5', {
      functionName: 'lambda5',
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, '../lambda/lambda5/lambda5-handler.mjs'),
      logRetention: RetentionDays.ONE_DAY,
      memorySize: 128,
      timeout: cdk.Duration.seconds(30),
      handler: 'handler',
      environment: {},
      loggingFormat: lambda.LoggingFormat.JSON,
      systemLogLevelV2: SystemLogLevel.INFO,
      applicationLogLevelV2: ApplicationLogLevel.INFO,
    });

    const lambda6 = new NodejsFunction(this, 'lambda6', {
      functionName: 'lambda6',
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, '../lambda/lambda5/lambda5-handler.mjs'),
      logRetention: RetentionDays.ONE_DAY,
      memorySize: 128,
      timeout: cdk.Duration.seconds(30),
      handler: 'handler',
      environment: {},
      loggingFormat: lambda.LoggingFormat.TEXT,
    });


    const gateway = new RestApi(this, 'share-code-gateway', {
      description: 'POC Share Lambda Code'
    });
    const l1Gateway = gateway.root.addResource('lambda1', {});
    l1Gateway.addMethod('GET', new LambdaIntegration(lambda1));

    gateway.root.addResource('lambda4', {}).addMethod('GET', new LambdaIntegration(lambda4));
    gateway.root.addResource('lambda5', {}).addMethod('GET', new LambdaIntegration(lambda5));
    gateway.root.addResource('lambda6', {}).addMethod('GET', new LambdaIntegration(lambda6));

    new cdk.CfnOutput(this, 'lambda1-url', {value: gateway.urlForPath('/lambda1')});
    // new cdk.CfnOutput(this, 'gw', {value: gateway.url});
  }
}
