const path = require('path')
const webpack = require('webpack')
const glob = require('glob-all')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const {meta} = require('./src/meta')
const envParser = require('./config/env-parser')

const env = envParser()

module.exports = function (ctx) {
  return {
    boot: [
      'axios',
      'feathers-vuex',
      'addressbar-color',
      'fontawesome-pro',
      'vuelidate',
      'components',
      'directives',
      'filters'
    ],

    css: ['app.styl', 'quasar.mods.styl'],

    extras: [
      // 'roboto-font',
      // 'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      components: [
        'QAjaxBar',
        // Buttons
        'QBtn',
        'QBadge',
        // Card Layouts
        'QCard',
        // Icons
        'QIcon',
        'QAvatar',
        'QImg',
        // Forms
        'QField',
        'QInput',
        'QSelect',
        'QToggle',
        'QCheckbox',
        'QChatMessage',
        'QSlider',
        'QUploader',
        // Popovers
        'QDialog',
        // Lists
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QSeparator',
        // Navigation
        'QToolbar',
        'QToolbarTitle',
        'QTabs',
        'QTab',
        'QTabPanels',
        'QTabPanel',
        // Layout
        'QNoSsr',
        'QPage',
        'QPageSticky',
        'QPageContainer',
        'QLayout',
        'QHeader',
        'QFooter',
        'QDrawer',
        // Scrolling
        'QScrollArea',
        'QInfiniteScroll',
        'QResizeObserver',
        'QSpinner',
        'QSpinnerDots'
      ],
      directives: [
        'CloseDialog',
        'Ripple',
        'ScrollFire',
        'Scroll'
      ],
      plugins: [
        'AddressbarColor',
        'AppVisibility',
        'Dialog',
        'LoadingBar',
        'Meta',
        'Notify',
        'Screen'
      ],
      iconSet: 'fontawesome-v5-pro',
      config: {
        notify: {
          position: 'bottom'
        },
        loadingBar: {
          color: '#FFFFFF',
          skipHijack: true
        }
      }
    },

    supportIE: false,

    preFetch: true,

    build: {
      env: {
        ...env,
        SOCKET_URL: ctx.dev ? '"http://localhost:4000"' : '"https://sandbox-feathers.herokuapp.com"'
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      publicPath: '/',
      extendWebpack (cfg) {
        // alias for the environment helper
        cfg.resolve.alias.env = path.resolve(__dirname, 'config/env.js')
        cfg.plugins.push(new webpack.ProvidePlugin({env: 'env'}))
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          'libs': path.resolve(__dirname, './libs'),
          '@': path.resolve(__dirname, './src')
        }
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }, {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
        ctx.prod && cfg.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, 'src/**/*.vue'),
              path.join(__dirname, 'src/**/*.js')
            ])
          })
        )
      }
    },

    devServer: {
      port: 8000,
      open: false
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: ctx.prod,
    },

    pwa: {
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {urlPattern: '/about', handler: 'networkFirst'},
          {urlPattern: /\/profile\/.*/, handler: 'networkFirst'},
          {urlPattern: /\/messages\/.*/, handler: 'networkFirst'},
        ]
      },
      manifest: {
        name: meta.title,
        short_name: meta.title,
        description: meta.description,
        theme_color: '#2C98F0',
        background_color: '#F4F4F4',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        icons: [
          { 'src': 'statics/icons/icon-36x36.png', 'sizes': '36x36', 'type': 'image/png' },
          { 'src': 'statics/icons/icon-72x72.png', 'sizes': '72x72', 'type': 'image/png' },
          { 'src': 'statics/icons/icon-96x96.png', 'sizes': '96x96', 'type': 'image/png' },
          { 'src': 'statics/icons/icon-144x144.png', 'sizes': '144x144', 'type': 'image/png' },
          { 'src': 'statics/icons/icon-192x192.png', 'sizes': '192x192', 'type': 'image/png' },
          { 'src': 'statics/icons/icon-256x256.png', 'sizes': '256x256', 'type': 'image/png' },
          { 'src': 'statics/icons/icon-310x310.png', 'sizes': '310x310', 'type': 'image/png' }
        ]
      },
    },

    cordova: {/* id: 'org.cordova.quasar.app' */},

    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) { /* do something with Electron process Webpack cfg */ },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      },
    },
  }
}
