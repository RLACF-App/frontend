module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  "extends": [
    "airbnb"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
  },
  overrides: [
    {
        files: ["*.test.js"],
        rules: {
            "react/jsx-filename-extension": "off"
        }
    },
    {
      files: ["*/serviceWorker.js"],
      rules: {
        "no-use-before-define": "off",
        "no-console": "off",
        "no-param-reassign": "off"
      },
    }
  ]
};