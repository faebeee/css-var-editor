import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { uglify } from 'rollup-plugin-uglify';

export default [
    {
        output: {
            name: 'cssVarEditor',
            file: 'dist/bundle.min.js',
            format: 'iife',
        },
        input: './src/index.js',
        plugins: [
            commonjs(),
            babel({
                babelHelpers: 'runtime',
                configFile: path.resolve(__dirname, '.babelrc')
            }),
            resolve({ browser: true }),
            uglify(),
        ]
    },
    {
        output: {
            name: 'cssVarEditor',
            file: 'dist/bundle.js',
            format: 'iife',
        },
        input: './src/index.js',
        plugins: [
            commonjs(),
            babel({
                babelHelpers: 'runtime',
                configFile: path.resolve(__dirname, '.babelrc')
            }),
            resolve({ browser: true }),
        ]
    }
];
