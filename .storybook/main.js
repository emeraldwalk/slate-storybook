const path = require('path')
const SourceCodePlugin = require('./sourceCodeAddon/webpackPlugin')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    './sourceCodeAddon/register.js',
    //'./slateControlsAddon/register.js',
  ],
  /** @param config {import('webpack').Configuration} */
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: path.resolve(
            __dirname,
            'sourceCodeAddon',
            'webpackLoader.js'
          ),
          options: {
            sourceRoot: path.resolve(__dirname, '..', 'src'),
          },
        },
      ],
    })

    config.plugins.push(new SourceCodePlugin())

    return config
  },
}
