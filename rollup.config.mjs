// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
// import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import esbuild from 'rollup-plugin-esbuild'


// export const config: RollupOptions = {
/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const config = {
  // input: 'src/index.ts', // adjust this to your entry point
  output: {
    dir: 'dist',
    // file: 'dist',
    format: 'es', // using ES modules
    preserveModules: true,
    // preserveModuleExt: true
    // sourcemap: true,
    // exports: "named",

  },
  plugins: [
    // esbuild({
    //     // include: /\.[jt]s$/,
    //     // minify: false,
    //     // sourceMap: true,
    //     target: 'esnext',
    //   }
    // ),
    // resolve(),
    resolve({
      extensions: [ '.ts', '.js', '.mjs' ],
      preferBuiltins: true
    }),
    commonjs(),
    typescript({
      noForceEmit: true,
      // include: [],
      // exclude: [ '*.ts', '**/*.ts' ],
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      emitDeclarationOnly: false,
    }),
    // dts(),
    // resolve({
    //   extensions: ['.ts', '.js']
    // }),
    // commonjs(),
    // typescript({
    // noEmit: true,
    // emitDeclarationOnly: false,
    // noForceEmit: true,
    // declaration: false,
    // module: 'esnext',
    // tsconfig: './tsconfig.json'
    // }),

  ],
  // external: () => true,
  // excluding external dependencies
  external: [
    'aws-sdk',
    'aws-cdk-lib',
    'constructs'
  ]
};
export default config;


// const bundle = config => ({
//   ...config,
//   input: 'src/index.ts',
//   external: id => !/^[./]/.test(id),
// })
//
// export default [
//   bundle({
//     plugins: [esbuild()],
//     output: [
//       {
//         dir: 'dist',
//         format: 'es',
//         sourcemap: true,
//       },
//     ],
//   }),
//   bundle({
//     plugins: [dts()],
//     output: {
//       format: 'es',
//     },
//   }),
// ]