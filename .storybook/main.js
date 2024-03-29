const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const fs = require('fs')
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

const webpackFinal = (config) => {
  config.resolve.extensions = ['.tsx', '.ts', '.js', '.json']

  _.each(config.module.rules, (rule) => {
    // if (rule.use && rule.use[0] && rule.use[0].loader) {
    //   if (rule.use[0].loader.includes('babel-loader')) {
    //     rule.include.push(/gm-/)
    //     rule.exclude = function (filepath) {
    //       return filepath.includes('/node_modules/')
    //     }
    //   }
    // }

    if (rule.loader && rule.loader.includes('file-loader')) {
      rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    }
  })

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [require('tailwindcss')],
          },
        },
      },
      {
        loader: 'less-loader',
      },
    ],
  })

  config.module.rules.push({
    test: /stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  })


  config.module.rules.push({
    test: /\.tsx?$/,
    use: [require.resolve('babel-loader')],
  })

  config.module.rules.unshift({
    test: /svg\/(\w|\W)+\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          expandProps: 'start',
          svgProps: {
            fill: 'currentColor',
            className: "{'gm-svg-icon ' + (props.className || '')}",
          },
        },
      },
    ],
  })

  // 为 gm-common
  config.plugins.push(
    new webpack.DefinePlugin({
      __DEBUG__: true,
      __DEVELOPMENT__: true,
      __TEST__: false,
      __PRODUCTION__: false,
      __VERSION__: JSON.stringify('1.0.0'),
      __NAME__: JSON.stringify('none'),
      __CLIENT_NAME__: JSON.stringify('none'),
      __BRANCH__: JSON.stringify('none'),
      __COMMIT__: JSON.stringify('none'),
      __AUTO_ROUTER_REG__: '/index\\.page\\./',
    })
  )

  // VBrowser用到了这个alias，需要存在
  config.resolve.alias['@/pages'] = path.resolve(__dirname)


  return config
}

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    // {
    //   name: '@storybook/preset-typescript',
    //   options: {
    //     tsLoaderOptions: {
    //       transpileOnly: true,
    //       happyPackMode: true,
    //       configFile: path.resolve(__dirname, '../tsconfig.json'),
    //     },
    //     forkTsCheckerWebpackPluginOptions: {
    //       checkSyntacticErrors: true,
    //       // tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    //       reportFiles: [
    //     //     'packages/business/src/**/*.{ts,tsx}',
    //     //     'packages/cropper/src/**/*.{ts,tsx}',
    //     //     'packages/keyboard/src/**/*.{ts,tsx}',
    //     //     'packages/react/src/**/*.{ts,tsx}',
    //     //     'packages/sortable/src/**/*.{ts,tsx}',
    //     //     'packages/table-x/src/**/*.{ts,tsx}',
    //     //     'packages/tour/src/**/*.{ts,tsx}',
    //       ],
    //     },
    //   },
    // },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        // sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
  ],
  // 写清晰一点，否则容易碰到 node_modules 里的 stories
  stories: [
    '../packages/business/src/**/*stories.(tsx|mdx)',
    '../packages/react/src/**/*stories.(tsx|mdx)',
    '../packages/table-x/src/**/*stories.(tsx|mdx)',
    '../packages/keyboard/src/**/*stories.(tsx|mdx)',
    '../packages/frame/src/**/*stories.(tsx|mdx)',
    '../packages/sortable/src/**/*stories.(tsx|mdx)',
    '../packages/tour/src/**/*stories.(tsx|mdx)',
    '../packages/cropper/src/**/*stories.(tsx|mdx)',
    '../packages/locales/src/**/*stories.js',
    '../packages/vision/src/**/*stories.(tsx|mdx)',
    '../demo/**/*stories.(tsx|mdx)',
  ],
  webpackFinal,
}
