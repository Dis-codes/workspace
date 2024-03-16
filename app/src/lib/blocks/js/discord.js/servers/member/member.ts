import { InputShape, MutatorType, OutputType } from "$lib/utils/constants";

class MemberBlocks {
	getRegistry() {
		return {
			id: "member",
			color: "#187494",
			weight: 4,
			blocks: [
				{
					func: "getmemberbyid",
					text: "Get member by [MENU] [ID]",
					output: OutputType.DISCORD.MEMBER,
					mutator: "getmemberbyid_mutator",
					mutatorData: {
						type: MutatorType.CheckBox,
						inputs: [
							{
								text: "Server",
								type: OutputType.DISCORD.SERVER,
								defaultValue: false
							}
						]
					},
					arguments: {
						ID: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						MENU: {
							type: InputShape.MENU,
							options: [
								["id", "id"],
								["name", "name"],
								["role", "role"]
							]
						}
					}
				},
				{
					func: "getmemberarraybyrole",
					text: "Get all members with role [ROLE]",
					output: OutputType.ARRAY,
					arguments: {
						ROLE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.ROLE
						}
					}
				},
				{
					func: "exists",
					text: "Member [MEMBER] exists?",
					output: OutputType.BOOLEAN,
					arguments: {
						MEMBER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						}
					}
				},
				{
					func: "getmembernickname",
					text: "Nickname of member [MEMBER]",
					output: OutputType.STRING,
					arguments: {
						MEMBER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						}
					}
				},
				{
					func: "getmemberjoin",
					text: "member [INPUT] date [MEMBER]",
					output: OutputType.STRING,
					arguments: {
						INPUT: {
							type: InputShape.MENU,
							options: [
								["join", "join"],
								["create", "create"]
							]
						},
						MEMBER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						}
					}
				},
				{
					func: "timeout",
					text: "Member [MEMBER] timed out?",
					output: OutputType.BOOLEAN,
					arguments: {
						MEMBER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						}
					}
				},
				{
					func: "haspermission",
					inline: true,
					output: OutputType.BOOLEAN,
					text: "Member [MEMBER] has permission [PERMISSION]",
					mutator: "haspermission_mutator",
					mutatorData: {
						type: MutatorType.CheckBox,
						inputs: [
							{
								text: "Channel",
								type: OutputType.DISCORD.CHANNEL,
								defaultValue: false
							}
						]
					}
				}
			]
		};
	}
	getmemberbyid(args: any) {
		const identifier = args.MENU === "id" ? "id" : "name";
		if (args.SERVER) {
			return `client.guilds.cache.get(${args.SERVER}).members.cache.get(${args.ID})`;
		} else {
			return `client.members.cache.find(member => member.${identifier} === ${args.ID})`;
		}
	}
	getmemberarraybyrole(args: any) {
		return `client.members.cache.filter(member => member.roles.cache.has(${args.ROLE}))`;
	}
	exists(args: any) {
		return `${args.MEMBER} !== undefined`;
	}
	getmembernickname(args: any) {
		return `${args.MEMBER}.nickname`;
	}
	getmemberjoin(args: any) {
		return `${args.MEMBER}.${args.INPUT}Timestamp`;
	}
	timeout(args: any) {
		return `${args.MEMBER}.timeout`;
	}
	haspermission(args: any) {
		if (args.CHANNEL) {
			return `${args.MEMBER}.permissionsIn(${args.CHANNEL}).has(${args.PERMISSION})`;
		} else {
			return `${args.MEMBER}.permissions.has(${args.PERMISSION})`;
		}
	}
}

export default MemberBlocks;
