import 'dotenv/config';

export default {
    components: true,
    target: 'static',

    head: {
        htmlAttrs: { lang: 'en', dir: 'ltr' },
        meta: [
            { charset: 'utf-8' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            { 'http-equiv': 'Reply-to', content: 'hello@farish.is-a.dev' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'robots', content: 'all' },
            { name: 'theme-color', content: '#030303' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Personal portfolio written in VueJS'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png'
            }
        ]
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

    modules: ['@nuxt/content', 'nuxt-helmet', 'nuxt-seo'],
    buildModules: [
        '~/modules/nuxt/cloudflare-headers.js',
        'nuxt-webpack-optimisations',
        '@nuxtjs/eslint-module',
        'nuxt-gsap-module',
        '@nuxt/postcss8',
        '@nuxtjs/dotenv',
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
            scrollTo: true,
            scrollTrigger: true
        }
    },

    cloudflareHeaders: {
        '/*': [{ 'X-Robots-Tag': 'all' }]
    },

    seo: {
        baseUrl: 'https://fxrysh.is-a.dev/',
        url: 'https://fxrysh.is-a.dev/',
        name: 'Farish Irfan',
        title: 'Portfolio',
        templateTitle: '%name% | %title%',
        description: 'Personal portfolio written in VueJS',
        author: false,
        language: 'English',
        lang: 'en',
        twitter: {
            site: '@fxryshdev',
            creator: '@fxryshdev',
            card: 'summary'
        },

        og: {
            type: 'website',
            image: {
                url: 'https://fxrysh.is-a.dev/logo.png',
                height: '1440',
                width: '1440'
            }
        }
    }
};
