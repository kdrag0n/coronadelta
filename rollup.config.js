import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import sveltePreprocess from 'svelte-preprocess';
import ignore from 'rollup-plugin-ignore';
import json from '@rollup/plugin-json';

import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

const preprocess = sveltePreprocess({ postcss: true });

export default {
    client: {
        input: config.client.input(),
        output: config.client.output(),
        plugins: [
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode)
            }),
            svelte({
                preprocess,
                dev,
                hydratable: true,
                emitCss: true
            }),
            resolve({
                browser: true,
                dedupe: ['svelte'],
                preferBuiltins: false
            }),
            commonjs(),
            json({
                compact: true
            }),

            legacy && babel({
                extensions: ['.js', '.mjs', '.html', '.svelte'],
                runtimeHelpers: true,
                exclude: ['node_modules/@babel/**'],
                presets: [
                    ['@babel/preset-env', {
                        targets: '> 0.25%, not dead'
                    }]
                ],
                plugins: [
                    '@babel/plugin-syntax-dynamic-import',
                    ['@babel/plugin-transform-runtime', {
                        useESModules: true
                    }]
                ]
            }),

            !dev && terser({
                module: true
            }),

            ignore(['moment']),

            replace({
                '"use strict";': '',
                "'use strict';": '',
                'this.document': 'document',
                'this.navigator': 'navigator',
                'this, "requestAnimationFrame"': 'window, "requestAnimationFrame"'
            })
        ],

        onwarn,
    },

    server: {
        input: config.server.input(),
        output: config.server.output(),
        plugins: [
            replace({
                'process.browser': false,
                'process.env.NODE_ENV': JSON.stringify(mode)
            }),
            svelte({
                preprocess,
                generate: 'ssr',
                dev
            }),
            resolve({
                dedupe: ['svelte']
            }),
            commonjs(),
            json({
                compact: true
            }),
        ],
        external: Object.keys(pkg.dependencies).concat(
            require('module').builtinModules || Object.keys(process.binding('natives'))
        ),

        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input(),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
                'process.env.SAPPER_TIMESTAMP': process.env.SAPPER_TIMESTAMP || Date.now()
            }),
            commonjs(),
            !dev && terser()
        ],

        onwarn,
    }
};
