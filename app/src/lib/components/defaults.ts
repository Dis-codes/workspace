const packageJson = {
    "name": "discodes-bot",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "start": "npm i && node index.js",
        "node-update": "npm i --save-dev node@17 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH",
        "node-clean": "rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i"
    },
    "dependencies": {
        "discord.js": "^13.7.0",
        "easy-json-database": "^1.5.0"  
    },
    "devDependencies": {
        "node": "^17"
    }
}
const indexJs = `
//default
const Discord = require('discord.js');

const delay = ms => new Promise(res => setTimeout(res, ms));

//generated code
`
function copyCode() {
    navigator.clipboard.writeText(generateCode());
}
export { packageJson, indexJs, copyCode}