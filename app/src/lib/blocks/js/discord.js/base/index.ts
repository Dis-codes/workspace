import { OutputType, BlockShape, InputShape } from "$lib/utils/constants";

class BaseBlocks {
	getRegistry() {
		return {
			id: "base",
			color: "#f5677f",
			weight: 1,
			blocks: [
				{
					func: "token",
					text: "Connect to bot using [TOKEN]",
					blockShape: BlockShape.FLOATING,
					arguments: {
						TOKEN: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: "env",
					text: "Get environment variable [NAME]",
					output: OutputType.STRING,
					arguments: {
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING,
							text: "env"
						}
					}
				},
				{
					func: "bot_connected",
					text: " [INFO] \n",
					color: "#ffab19",
					branches: 1,
					BlockShape: BlockShape.EVENT,
					arguments: {
						INFO: {
							type: InputShape.MENU,
							options: [
								["bot is connected", "bot_connected"],
								["Insert code", "insert_code"]
							]
						}
					}
				},
				{
					func: "bot_status",
					text: "Type: [TYPE] Status: [STATUS] Title: [NAME] Message: [MESSAGE]",
					tooltip:
						"Set bot status, type is the type of activity, status is the status of the bot, title is the title of the activity, and message is the message of the activity", // copilot wrote that entire tooltip lol
					shape: BlockShape.STATEMENT,
					arguments: {
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						TYPE: {
							type: InputShape.MENU,
							options: [
								["playing", "Playing"],
								["streaming", "Streaming"],
								["watching", "Watching"],
								["listening", "Listening"],
								["custom", "Custom"]
							]
						},
						STATUS: {
							type: InputShape.MENU,
							options: [
								["dnd", "dnd"],
								["idle", "idle"],
								["online", "online"],
								["invisible", "invisible"]
							]
						}
					}
				},
				{
					func: "bot_as_member",
					text: "Bot as member",
					output: OutputType.OBJECT,
					color: "#187494"
				},
				{
					func: "bot_in_server",
					text: "Bot as member in server [SERVER]",
					color: "#187494",
					output: OutputType.OBJECT,
					arguments: {
						SERVER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.SERVER
						}
					}
				},
				{
					func: "bot_info",
					text: "get bot info [INFO]",
					color: "#4fa7c7",
					output: OutputType.ANY,
					arguments: {
						INFO: {
							type: InputShape.MENU,
							options: [
								["startup time", "startup_time"],
								["ping", "ping"],
								["uptime", "uptime"],
								["user count", "user_count"],
								["server count", "server_count"],
								["channel count", "channel_count"]
							]
						}
					}
				}
			]
		};
	}

	// login to discord and if token invalid let them know
	token(args: any) {
		return `client.login(${args.TOKEN}).catch((err) => {
            console.error(err);
            return "Invalid token";
        });`;
	}

	env(args: any) {
		return `process.env.${args.NAME}`;
	}

	bot_connected(args: any) {
		switch (args.INFO) {
			case "bot_connected":
				return `client.once("ready", () => {
                    ${args.BRANCH1}
                });`;
			case "insert_code":
				return `${args.BRANCH1}`;
		}
	}

	bot_as_member(args: any) {
		return "client.user";
	}

	bot_status(args: any) {
		return `const status = client.user.setPresence({
            status: '${args.STATUS}',
            activities: [{
                type: ActivityType.${args.TYPE},
                name: ${args.MESSAGE}, // accidentially flipped them earlier and I won't fix because I'm lazy
                state: ${args.NAME}
            }]
        })`;
	}

	bot_in_server(args: any) {
		return `client.guilds.cache.get(${args.SERVER})`;
	}

	bot_info(args: any) {
		switch (args.INFO) {
			case "startup_time":
				return "client.readyAt";
			case "ping":
				return "client.ws.ping";
			case "uptime":
				return "client.uptime";
			case "user_count":
				return "client.users.cache.size";
			case "server_count":
				return "client.guilds.cache.size";
			case "channel_count":
				return "client.channels.cache.size";
		}
	}
}

export default BaseBlocks;
