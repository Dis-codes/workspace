import { BlockShape, InputShape, OutputType } from "$lib/utils/constants";

class TerminalBlocks {
	getRegistry() {
		return {
			id: "terminal",
			color: "#d3437b",
			blocks: [
				{
					func: "log",
					text: "log [TEXT] in console",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						TEXT: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "clear_console",
					text: "clear console",
					shape: BlockShape.STATEMENT
				},
				{
					func: "error",
					text: "error",
					output: OutputType.BOOLEAN,
					inline: true
				},
				// {
				//     func: "insert_code_statement",
				//     text: "insert code [CODE]",
				//     shape: BlockShape.STATEMENT,
				//     inline: true,
				//     arguments: {
				//         CODE: {
				//             type: InputShape.MULTILINE_TEXT,
				//             check: OutputType.STRING
				//         }
				//     }
				// },
				// {
				//     func: "insert_code_value",
				//     text: "insert code [CODE]",
				//     output: OutputType.STRING,
				//     inline: true,
				//     arguments: {
				//         CODE: {
				//             type: InputShape.MULTILINE_TEXT,
				//             check: OutputType.STRING
				//         }
				//     }
				// },
				// {
				//     func: "insert_code_floating",
				//     text: "insert code [CODE]",
				//     shape: BlockShape.FLOATING,
				//     inline: true,
				//     arguments: {
				//         CODE: {
				//             type: InputShape.MULTILINE_TEXT,
				//             check: OutputType.STRING
				//         }
				//     }
				// },
				{
					func: "try_catch",
					text: ["try\n", "if error\n"],
					branches: 2,
					shape: BlockShape.STATEMENT,
					inline: true
				},
				{
					func: "throw",
					text: "throw custom error [TEXT]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						TEXT: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: "force",
					text: "force [CODE]",
					inline: true,
					output: OutputType.ANY,
					arguments: {
						CODE: {
							type: InputShape.VALUE
						}
					}
				}
			]
		};
	}

	log(args: any) {
		return `console.log(${args.TEXT});`;
	}

	clear_console() {
		return `console.clear();`;
	}

	error() {
		return `err`;
	}

	insert_code_statement(args: any) {
		return args.CODE;
	}

	insert_code_value(args: any) {
		return args.CODE;
	}

	insert_code_floating(args: any) {
		return args.CODE;
	}

	try_catch(args: any) {
		return `try {\n${args.BRANCH1}} catch (err) {\n${args.BRANCH2}}`;
	}

	throw(args: any) {
		return `throw new Error(${args.TEXT});`;
	}

	force(args: any) {
		return args.CODE;
	}
}

export default TerminalBlocks;
