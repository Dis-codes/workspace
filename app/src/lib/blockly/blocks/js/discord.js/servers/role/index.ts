import { BlockShape, InputShape, MutatorType, OutputType, Permissions } from "$lib/utils/constants";
class RoleBlocks {
	getRegistry() {
		return {
			id: "role",
			color: "#30B474",
			weight: 3,
			blocks: [
				{
					func: "get",
					text: "Get role with ID [ID] on server [SERVER]",
					output: OutputType.DISCORD.ROLE,
					inline: true,
					arguments: {
						ID: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						SERVER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.SERVER
						}
					}
				},
				{
					func: "get_all",
					text: "Get all roles from [VAL] then \n",
					branches: 1,
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						VAL: {
							type: InputShape.VALUE,
							check: [OutputType.DISCORD.SERVER, OutputType.DISCORD.MEMBER].flat()
						}
					}
				},
				{
					func: "get_all_value",
					text: "Role",
					output: OutputType.DISCORD.ROLE,
					inline: true
				},
				{
					func: "member_has",
					text: "Member[MEMBER] has role [ROLE]",
					output: OutputType.BOOLEAN,
					inline: true,
					arguments: {
						MEMBER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						},
						ROLE: {
							type: InputShape.VALUE,
							check: [OutputType.STRING, OutputType.DISCORD.ROLE].flat()
						}
					}
				},
				{
					func: "property",
					text: "Role [ROLE] [THING]",
					output: [OutputType.STRING, OutputType.NUMBER, OutputType.DISCORD.SERVER].flat(),
					inline: true,
					arguments: {
						ROLE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.ROLE
						},
						THING: {
							type: InputShape.MENU,
							options: [
								["name", "name"],
								["id", "id"],
								["color", "color"],
								["icon", "icon"],
								["unicode icon", "unicodeEmoji"],
								["position", "rawPosition"],
								["server", "guild"]
							]
						}
					}
				},
				{
					func: "is",
					text: "Is role [ROLE] [THING]",
					output: OutputType.BOOLEAN,
					inline: true,
					arguments: {
						ROLE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.ROLE
						},
						THING: {
							type: InputShape.MENU,
							options: [
								["mentionable", "mentionable"],
								["hoisted", "hoist"],
								["managed", "managed"],
								["existent", "exist"]
							]
						}
					}
				},
				{
					func: "member_give_remove",
					text: "[ACTION] role(s) [ROLE] to member [MEMBER]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						ACTION: {
							type: InputShape.MENU,
							options: [
								["Give", "add"],
								["Remove", "remove"]
							]
						},
						ROLE: {
							type: InputShape.VALUE,
							check: [OutputType.DISCORD.ROLE, OutputType.ARRAY].flat()
						},
						MEMBER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MEMBER
						}
					}
				},
				{
					func: "create",
					text: "Create role in server [SERVER] Name [NAME] Color [COLOR] Reason [REASON]",
					shape: BlockShape.STATEMENT,
					inline: false,
					arguments: {
						SERVER: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.SERVER
						},
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						COLOR: {
							type: InputShape.VALUE,
							check: [OutputType.STRING, OutputType.NUMBER, "Colour"].flat()
						},
						REASON: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					},
					mutator: "create_mutator",
					mutatorData: {
						type: MutatorType.CheckBox,
						inputs: [
							{
								text: "Then",
								inputName: "Then",
								type: OutputType.STRING,
								defaultValue: false,
								branch: true
							}
						]
					}
				},
				{
					func: "created",
					text: "Created role",
					output: OutputType.DISCORD.ROLE,
					inline: true
				},
				{
					func: "delete",
					text: "Delete role [ROLE]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						ROLE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.ROLE
						}
					}
				},
				{
					func: "edit",
					text: "In role [ROLE] set [THING] to [VALUE]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						ROLE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.ROLE
						},
						THING: {
							type: InputShape.MENU,
							options: [
								["name", "name"],
								["color", "color"],
								["icon", "icon"],
								["unicode icon", "unicodeEmoji"],
								["position", "position"],
								["mentionable", "mentionable"],
								["hoisted", "hoist"]
							]
						},
						VALUE: {
							type: InputShape.VALUE,
							check: [
								OutputType.STRING,
								OutputType.NUMBER,
								OutputType.COLOR,
								OutputType.BOOLEAN,
								"Colour"
							].flat()
						}
					}
				},
				{
					func: "has_perm",
					text: "Role [ROLE] has permission [PERM]",
					output: OutputType.BOOLEAN,
					inline: true,
					arguments: {
						ROLE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.ROLE
						},
						PERM: {
							type: InputShape.MENU,
							options: Permissions
						}
					}
				},
				{
					func: "set_perm",
					text: "Set permission [PERM] in role [ROLE] to [ALLOW]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						PERM: {
							type: InputShape.MENU,
							options: Permissions
						},
						ROLE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.ROLE
						},
						ALLOW: {
							type: InputShape.MENU,
							options: [
								["Allow", "add"],
								["Disallow", "remove"]
							]
						}
					}
				}
			]
		};
	}
	get(args: any) {
		return `${args.SERVER}.roles.cache.get(${args.ID})`;
	}
	get_all(args: any) {
		return `${args.VAL}.roles.cache.forEach(__DIS__Role => {
  ${args.BRANCH1}
})`;
	}
	get_all_value(args: any) {
		return "__DIS__Role";
	}
	member_has(args: any) {
		return `${args.MEMBER}.roles.cache.has(${args.ROLE})`;
	}
	property(args: any) {
		return `${args.ROLE}.${args.THING}`;
	}
	is(args: any) {
		if (args.THING == "exist") return `(!!${args.ROLE})`;
		return `${args.ROLE}.${args.THING}`;
	}
	member_give_remove(args: any) {
		return `${args.MEMBER}.roles.${args.ACTION}(${args.ROLE})`;
	}
	create(args: any) {
		let code = `${args.SERVER}.roles.create({
  name: ${args.NAME},
  color: ${args.COLOR},
  reason: ${args.REASON},
})\n`;
		if (args.THEN) {
			code += `.then(__DIS__CreatedRole => {
        ${args.THEN}
      })\n`;
		}
		return code;
	}
	created(args: any) {
		return "__DIS__CreatedRole";
	}
	delete(args: any) {
		return `${args.ROLE}.delete()`;
	}
	edit(args: any) {
		switch (args.THING) {
			case "name":
				return `${args.ROLE}.setName(${args.VALUE})`;
			case "color":
				return `${args.ROLE}.setColor(${args.VALUE})`;
			case "icon":
				return `${args.ROLE}.setIcon(${args.VALUE})`;
			case "unicodeEmoji":
				return `${args.ROLE}.setUnicodeEmoji(${args.VALUE})`;
			case "position":
				return `${args.ROLE}.setPosition(${args.VALUE})`;
			case "mentionable":
				return `${args.ROLE}.setMentionable(${args.VALUE})`;
			case "hoist":
				return `${args.ROLE}.setHoist(${args.VALUE})`;
		}
	}
	has_perm(args: any) {
		return `${args.ROLE}.permissions.has(${args.PERM})`;
	}
	set_perm(args: any) {
		return `${args.ROLE}.setPermissions(${args.ROLE}.permissions.${args.ALLOW}(${args.PERM}))`;
	}
}

export default RoleBlocks;
