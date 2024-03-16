import { InputShape, OutputType } from "$lib/utils/constants";

class userBlocks {
	getRegistry() {
		return {
			id: "user",
			color: "#60bcec",
			weight: 6,
			blocks: [
				{
					func: "getid",
					text: "Get [INPUT] of [USER]",
					output: OutputType.STRING,
					arguments: {
						USER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						},
						INPUT: {
							type: InputShape.MENU,
							options: [
								["id", "id"],
								["username", "username"],
								["Display name", "displayName"],
								["discriminator", "discriminator"],
								["presence", "presence"],
								["avatar", "avatar"],
								["animated avatar", "animatedAvatar"],
								["banner", "banner"],
								["createDate", "createDate"]
							]
						}
					}
				},
				{
					func: "isuser",
					text: "user [USER] [MENU]",
					output: OutputType.BOOLEAN,
					arguments: {
						USER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						},
						MENU: {
							type: InputShape.MENU,
							options: [
								["is bot?", "isBot"],
								["has a banner?", "has a banner?"],
								["has a banner?", "isBot"],
								["system?", "system"],
								["has DM with bot?", "hasDMWithBot"],
								["is missing information", "isMissingInformation"],
								["is a verified bot?", "isVerifiedBot"],
								["is a discord employee?", "isDiscordEmployee"],
								["is a partnered server owner?", "isPartneredServerOwner"],
								["is a bot HTTP interaction?", "isBotHTTPInteraction"]
							]
						}
					}
				}
			]
		};
	}
	getid(args: any) {
		return `(${args.USER}).${args.INPUT}`;
	}
	isuser(args: any) {
		return `(${args.USER}).${args.INPUT}`;
	}
}

export default userBlocks;
