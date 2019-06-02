const VueLoaderPlugin = require('vue-loader/lib/plugin')
// require('./.styleguide/styles.css')
module.exports = {
  components: 'components/**/*.vue',
  usageMode: 'expand',
  exampleMode: 'collapse',
  defaultExample: false,
  skipComponentsWithoutExample: true,
  pagePerSection: true,
  sections: [
    {
      name: 'Introduction',
      content: '.styleguide/docs/introduction.md',
    },
    {
      name: 'Components',
      components: 'components/**/[A-Za-z]*.vue',
      sectionDepth: 2,
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        // Vue loader
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
        },
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      // add vue-loader plugin
      new VueLoaderPlugin(),
    ],
  },
}
