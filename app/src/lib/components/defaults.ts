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
        "discord.js": "^14.13.0",
        "easy-json-database": "^1.5.1"
    },
    "devDependencies": {
        "node": "^17"
    }
}
const indexJs = `//default
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log('Your bot ' + c.user.tag + ' is ready!');
});

//Discodes generated code
const delay = ms => new Promise(res => setTimeout(res, ms));

//generated code
`
function copyCode() {
    navigator.clipboard.writeText(generateCode());
}
export { packageJson, indexJs, copyCode}