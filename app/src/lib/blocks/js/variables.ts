import { OutputType, BlockShape, InputShape } from "$lib/utils/blockRegistryTool";

class VariablesBlocks {
	getRegistry() {
		return {
			id: "variables",
			color: "%{BKY_VARIABLES_HUE}",
			blocks: [
				{
					func: "variable",
					text: "[VARIABLE] [NAME] = [VALUE]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						VARIABLE: {
							type: InputShape.MENU,
							options: [
								["const", "const"],
								["let", "let"],
								["var", "var"]
							]
						},
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						VALUE: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "floatingvariable",
					text: "[VARIABLE] [NAME] = [VALUE]",
					shape: BlockShape.FLOATING,
					inline: true,
					arguments: {
						VARIABLE: {
							type: InputShape.MENU,
							options: [
								["const", "const"],
								["let", "let"],
								["var", "var"]
							]
						},
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						VALUE: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "get_variable",
					text: "‎‎‎ [NAME] ‎‎‎",
					output: OutputType.ANY,
					arguments: {
						NAME: {
							type: InputShape.TEXT
						}
					}
				},
				{
					func: "change_variable",
					text: "change [NAME] [CHANGE] [VALUE]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						CHANGE: {
							type: InputShape.MENU,
							options: [
								["add", "add"],
								["subtract", "subtract"],
								["multiply by", "multiply"],
								["divide by", "divide"],
								["set to", "set"]
							]
						},
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						VALUE: {
							type: InputShape.VALUE
						}
					}
				}
			]
		};
	}

	variable(args: any) {
		return `${args.VARIABLE} ${args.NAME.replace(/'/g, "")} = ${args.VALUE}\n`;
	}
	floatingvariable(args: any) {
		return `${args.VARIABLE} ${args.NAME.replace(/'/g, "")} = ${args.VALUE}`;
	}
	get_variable(args: any) {
		return `${args.NAME}`;
	}

	change_variable(args: any) {
		let newName = args.NAME.replace(/'/g, "");
		switch (args.CHANGE) {
			case "add":
				return `${newName} += ${args.VALUE}\n`;
			case "subtract":
				return `${newName} -= ${args.VALUE}\n`;
			case "multiply":
				return `${newName} *= ${args.VALUE}\n`;
			case "divide":
				return `${newName} /= ${args.VALUE}\n`;
			case "set":
				return `${newName} = ${args.VALUE}\n`;
			default:
				return "";
		}
	}
}

export default VariablesBlocks;
