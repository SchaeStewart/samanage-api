module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    // "extends": "eslint:recommended",
    "parser": "typescript-eslint-parser",
    "plugins": [
        "typescript"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "typescript/class-name-casing": "error",
        "typescript/explicit-function-return-type": [ "error", { "allowExpressions": true }],
        "typescript/member-delimiter-style": ["error", {
            "delimiter": "comma", "requireLast": true
        }],
        "typescript/no-unused-vars": "error" 
    }
};