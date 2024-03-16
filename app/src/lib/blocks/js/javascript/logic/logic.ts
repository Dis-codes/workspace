import { OutputType, BlockShape, InputShape } from "$lib/utils/constants";

class LogicBlocks {
	getRegistry() {
		return {
			id: "logic",
			color: "%{BKY_LOGIC_HUE}",
			weight: 1,
			blocks: [
				{
					func: "isEqual",
					text: "[A] value and type = [B]",
					inline: true,
					output: OutputType.BOOLEAN,
					arguments: {
						A: {
							type: InputShape.VALUE
						},
						B: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "typeof",
					text: "type of [A]",
					output: OutputType.STRING,
					arguments: {
						A: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "isOneOfType",
					text: "type of [A] is [TYPES]?",
					output: OutputType.BOOLEAN,
					inline: true,
					arguments: {
						A: {
							type: InputShape.VALUE
						},
						TYPES: {
							type: InputShape.MENU,
							options: [
								["Number", "number"],
								["String", "string"],
								["Boolean", "boolean"],
								["Object", "object"],
								["List", "array"],
								["Function", "function"],
								["Undefined", "undefined"],
								["Null", "null"]
							]
						}
					}
				},
				{
					func: "switchStatement",
					text: ["Check for [A]", "If no check\n"],
					shape: BlockShape.STATEMENT,
					color: 280,
					branches: 2,
					arguments: {
						A: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "caseStatement",
					text: "[CASE] [CONDITION]",
					shape: BlockShape.STATEMENT,
					color: 280,
					branches: 1,
					arguments: {
						CASE: {
							type: InputShape.MENU,
							options: [
								["Try", "case"],
								["Try or", "nobreak"]
							]
						},
						CONDITION: {
							type: InputShape.VALUE
						},
						STATEMENTS: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "stopScript",
					text: "Stop script",
					shape: BlockShape.TERMINAL,
					color: 310
				}
			]
		};
	}

	isEqual(args: any) {
		return `(${args.A} === ${args.B})`;
	}

	typeof(args: any) {
		return `typeof (${args.A})`;
	}

	isOneOfType(args: any) {
		return `typeof (${args.A}) === '${args.TYPES}'`;
	}

	switchStatement(args: any) {
		return `switch (${args.A}) {\n${args.BRANCH1}default:\n${args.BRANCH2}}`;
	}

	caseStatement(args: any) {
		switch (args.CASE) {
			case "case":
				return `case ${args.CONDITION}:\n${args.BRANCH1}break\n`;
			case "nobreak":
				return `case ${args.CONDITION}:\n${args.BRANCH1}`;
			default:
				return "";
		}
	}

	stopScript(args: any) {
		return `return\n`;
	}
}

export default LogicBlocks;
