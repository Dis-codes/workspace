import { MutatorType } from "$lib/interfaces/mutator";
import { WarningType } from "$lib/interfaces/warnings";
import javascriptGenerator from "$lib/javascript";
import type { Register } from "../../../interfaces";
import { BlockShape, InputShape, OutputType, BlockModifierAction} from "../../../utils/blockRegistryTool";

class TestBlocks {
	/**
	 * Details for this blockset and its blocks.
	 */
	getRegistry() {
		//! FIX THE ERROR BELOW ASAP
		return {
			id: "coretest",
			color: 60,
			hidden: !import.meta.env.DEV,
			blocks: [
				{
					func: "mutator_mutator",
					text: "mutator select menu modify the block mutator test [SELECT]",
					shape: BlockShape.EVENT,

					mutatorData: {
						type: MutatorType.ModifyBlock,
						arguments: {
							SELECT_SECRET: {
								check: OutputType.STRING,
								type: InputShape.VALUE,
							},
						},
						blockModifier:
							{
								"SELECT": {
									conditions: {
										codeshow1: [
											{
												input: "SELECT_SECRET",
												action: BlockModifierAction.Show
											}
										],
										codeshow2: [
											{
												input: "SELECT_SECRET",
												action: BlockModifierAction.Hide
											}
										],
									}
								},
							},

					},
					arguments: {

						SELECT: {
							type: InputShape.MENU,
							options: [
									["show1", "codeshow1"],
									["show2", "codeshow2"]

							],
						},


					}
				},
				{
					func: "test_warning",
					text: "Warning parent\n input: [INPUT]",
					shape: BlockShape.STATEMENT,
					warnings: [
						{
							type: WarningType.RequiredParent,
							parentType: "coretest_testevent",
							message: "belongs under test event block!"
						},
						{
							type: WarningType.EmptyInput,
							inputName: "INPUT",
							message: "Input field is empty"
						}
					],
					arguments: {
						INPUT: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "test_mainblock",
					text: "advanced mutator",
					mutator: "test_mainblock_mutator",
					mutatorData: {
						type: MutatorType.CheckBox,
						inputs: [
							{
								text: "Title", // text for input text

								inputName: "Title",

								type: OutputType.STRING, // type for input added to the main block
								defaultValue: true, // whether the checkbox is checked also will affect if input is showed on start
								
							},
							{
								text: "Description",

								inputName: "", // leaving this empty will use text as inputName

								type: OutputType.STRING,
								defaultValue: false
							}
						]
					},
					shape: BlockShape.EVENT
				},
				{
					func: "test_sec_mut",
					text: "statement not imp",
					// mutator: "test_sec_mut_mutator",
					// mutatorData: {
					//     type: MutatorType.BlockList,
					//     blockType: "controls_if_if",
					//     inputs: [
					//         {
					//             blockId: "controls_if_elseif",
					//             text: "else if",
					//             inputName: "ELSE_IF",
					//             type: OutputType.BOOLEAN,
					//             branch: false,
					//             //wont be made since with this also you would need to make delete input func
					//             modifyBlock: function (block: Blockly.Block) { // if this is present
					//             }
					//
					//         },
					//         {
					//             blockId: "controls_if_else",
					//             text: "else",
					//             //inputName: "ELSE", // no need for input name since `text` field is a single word
					//             type: OutputType.BOOLEAN,
					//             branch: false,
					//
					//
					//             modifyBlock: function (block: Blockly.Block) { // if this is present
					//             }
					//         },
					//
					//     ]
					// },
					shape: BlockShape.EVENT
				},
				{
					func: "teststatement",
					text: "statement block",
					shape: BlockShape.STATEMENT
				},
				{
					func: "testoutput",
					text: "output string block",
					output: OutputType.STRING
				},
				{
					func: "testevent",
					text: "event\n",
					shape: BlockShape.EVENT,
					branches: 1
				},
				{
					func: "testbranch",
					text: ["branch\n", "with more stuff\n", "and text here"],
					shape: BlockShape.STATEMENT,
					branches: 2
				},
				{
					func: "testterminal",
					text: "terminal block",
					shape: BlockShape.TERMINAL
				},
				{
					func: "testinput",
					text: "block with an [INPUT]",
					shape: BlockShape.STATEMENT,
					arguments: {
						INPUT: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "testfield",
					text: "block with a [FIELD] and an [IMAGE]",
					output: OutputType.STRING,
					arguments: {
						FIELD: {
							type: InputShape.TEXT,
							text: "field",
							spellcheck: true
						},
						IMAGE: {
							type: InputShape.IMAGE,
							src: "https://www.discodes.xyz/Images/favicon1.png",
							width: 32,
							height: 32,
							alt: "logo"
						}
					}
				},
				{
					func: "testnontupleoutput",
					text: "output string block (returns non-tuple)",
					output: OutputType.STRING
				}
			]
		} as Register;
	}
	mutator_mutator(args: any) {
		return `${args.SELECT_SECRET}`
	}
	test_sec_mut(args: any) {
		return `${args.TITLE}`;
	}
	test_warning(args: any) {
		return "console.log('warning lol')";
	}
	test_mainblock(args: any) {
		return `${args.Description};`; // both of these work
	}
	teststatement() {
		return "void;";
	}
	testoutput() {
		return ['"abc"', javascriptGenerator.ORDER_NONE];
	}
	testevent(args: any) {
		return `setInterval(() => {
            ${args.BRANCH1}
        }, 100);`;
	}
	testbranch(args: any) {
		return `${args.BRANCH1}\n${args.BRANCH2}`;
	}
	testterminal() {
		return `return;`;
	}
	testinput(args: any) {
		return `console.log(${args.INPUT});`;
	}
	testfield(args: any) {
		// JSON.stringify escapes strings and places "" around them
		return [`${JSON.stringify(args.FIELD)}`, javascriptGenerator.ORDER_NONE];
	}
	testnontupleoutput() {
		// we dont even have to return tuple outputs in BlockSets,
		// they will default to exporting as ORDER_NONE
		return '"see code, this is just returned as a string"';
	}
}

export default TestBlocks;
