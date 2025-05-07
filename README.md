# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


## init application

```shell
cdk init app --language typescript
```

## Install dependencies

```shell
npm i -D esbuild
npm i -D @types/aws-lambda
npm i -D aws-sdk
```

## CDK Deployment

```shell
cdk synth
cdk bootstrap # create some initial resource in AWS that gonna be needed as part of CDK deployment process
cdk deploy
```


```ts
      bundling: {
  target: 'esnext',
    // target: 'es2020',
    externalModules: ['@aws-sdk'],
    sourceMap: true,
    sourcesContent: true,
    platform: 'neutral',
    //   // keepNames: true,
    //   // format
    //   // logLevel
    //   // sourceMapMode
    //   minify: false,
    format: OutputFormat.ESM,
    logLevel: LogLevel.INFO,
    sourceMapMode: SourceMapMode.EXTERNAL,

  // loader: {
  //   '.ts': 'text'
  // },
  // esbuildArgs: {
  // "--log-limit": "0",
  // "--outfile": 'index.ts',
  // '--loader:': '.ts=text',
  // --loader:.ts=text
  // },
}
```


# setup rollup
```shell
npm install --save-dev @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs
npm install --save-dev rollup-plugin-esbuild
npx rollup -c
```
or add 
```shell
"scripts": {
    "bundle": "rollup -c"
  }
  
  rollup --input src/main.js -o dist/bundle.js -f es
  
  npx rollup --input <path_to_your_input_file.js> -c
  
  rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
```