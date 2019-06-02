const path = require('path')

module.exports = {
  //   rootDir: path.resolve(__dirname, './components/VParagraph'),
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
}
