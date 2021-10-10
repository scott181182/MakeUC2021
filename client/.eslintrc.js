module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "indent": [ "error", 4 ],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "quotes": ["error", "double", { "avoidEscape": false }],
        "vue/html-indent": ["error", 4 ],
        "vue/html-self-closing": [ "error", {
            "html": {
                "void": "always",
                "normal": "any"
            }
        }],
        "vue/script-indent": [ "error", 4 ]
    }
}
