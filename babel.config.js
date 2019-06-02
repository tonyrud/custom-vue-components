module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['transform-vue-jsx'],
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        'transform-es2015-modules-commonjs',
      ],
    },
  },
}
