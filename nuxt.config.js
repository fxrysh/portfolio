import 'dotenv/config';

export default {
    components: true,
    target: 'static',

    head: {
        htmlAttrs: { lang: 'en', dir: 'ltr' },
        title: 'Farish Irfan | Portfolio',
        meta: [
            { charset: 'utf8' },
            {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0'
            }
        ]
    },

    router: {
        base: '/home/'
    },

    server: {
        port: parseInt(process.env.PORT) || 8000,
        host: '0.0.0.0'
    },

    css: [
        'locomotive-scroll/dist/locomotive-scroll.css',
        'normalize.css/normalize.css',
        '~/css/global.css',
        '~/css/utils.css'
    ],

    plugins: [
        '~/plugins/nuxt/hover-directive.client.js',
        '~/plugins/nuxt/prefers-reduced-motion.js',
        '~/plugins/nuxt/smooth-scroll.client.js'
    ],

    modules: ['@nuxt/content', 'nuxt-helmet'],
    buildModules: [
        'nuxt-webpack-optimisations',
        '@nuxtjs/eslint-module',
        'nuxt-gsap-module',
        '@nuxt/postcss8',
        '@nuxtjs/svg',
        '@nuxt/image'
    ],

    build: {
        extractCSS: process.env.NODE_ENV === 'production',
        transpile: ['three'],
        postcss: { plugins: { 'postcss-logical': { dir: 'ltr' } } },
        extend(config) {
            config.module.rules.push({
                test: /\.(glsl|frag|vert)$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'glslify-loader']
            });
        }
    },

    gsap: {
        extraPlugins: {
            scrollTrigger: true,
            scrollTo: true
        }
    }
};
