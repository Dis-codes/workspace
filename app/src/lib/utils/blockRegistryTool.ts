import { type BlockDefinition, WarningType } from "$lib/interfaces";
import javascriptGenerator from "$lib/javascript";
import { CheckMutatorType } from "$lib/utils/mutators";
import Blockly from "blockly/core";
import { WarningMessages } from "../../data";
import { BlockShape } from "./constants";

const EventsToTriggerWarnings = {
	[Blockly.Events.CHANGE]: 0,
	[Blockly.Events.MOVE]: 0,
	[Blockly.Events.FINISHED_LOADING]: 0
	// [Blockly.Events.CREATE]: 0,
};

export default class BlocklyTool {
	// doesnt like that the BlockSet class is missing stuff
	// because its a base block set that should be edited
	// so, just use "any" typing for now
	registerFromBlockset(blockset: any) {
		const registry = blockset.getRegistry();
		const idPrefix: string = `${registry.id}_`;
		if (!registry.blocks) {
			return; // we are done here if theres no blocks
		}
		for (const block of registry.blocks) {
			if (typeof block.manual === "string") {
				// manual block, dont do anything actually
				// just run the function
				blockset[block.manual](Blockly, javascriptGenerator);
				continue; // move to the next block
			}
			// extract inputs from the block
			const blockDisplayContent: any = {
				message0: "",
				args0: []
			};
			// set block arguments if its non existent
			if (!block.arguments) {
				block.arguments = {};
			}

			const blockArguments = block.arguments;
			const rawArrayText: Array<string> = Array.isArray(block.text) ? block.text : [block.text];
			// each new line is an "input_dummy" argument
			let idxa = 1;
			const arrayText: Array<string> = rawArrayText.map((text) => {
				const newText = text.replace(/\n/gim, (match) => {
					// add to arguments
					const currentIdx = idxa;
					const id = `DUMMYNEWLINE_${currentIdx}`;
					// add to arguments
					blockArguments[id] = {
						type: "input_dummy"
					};
					idxa++;
					// replaces the first entry
					return match.replace("\n", `[${id}]`);
				});
				return newText;
			});
			// add branches
			if (block.branches) {
				for (let idx = 0; idx < block.branches; idx++) {
					const id = `BRANCH${idx + 1}`;
					// add to arguments
					blockArguments[id] = {
						type: "input_statement"
					};
				}
				// now add them to arrayText
				for (let idx = 0; idx < block.branches; idx++) {
					const id = `[BRANCH${idx + 1}]`;
					// insert with splice (we can just insert the ID)
					// each added element changes the index, so account for that
					const index = idx * 2 + 1;
					arrayText.splice(index, 0, id);
				}
			}
			// now parse this and add to message0 and args0
			const blockMessage = arrayText.join(" ");
			let idx = 0;
			// parse blockMessage and add it to message0
			blockDisplayContent.message0 = String(blockMessage).replace(/(\[\S+\])+/gim, (match) => {
				idx++;
				// reads the text inside of the brackets
				const inputName: string = String(match).replace(/[\[\]]*/gim, "");
				// add to arguments
				// get the argument data
				const realArgument = block.arguments[inputName]
					? block.arguments[inputName]
					: // if not defined, default to blank input_value
						{ type: "input_value" };
				blockDisplayContent.args0.push({
					// adds all argument data like type
					...realArgument,
					// add argument name
					name: inputName
				});
				// return the %1 thing blockly wants
				return `%${idx}`;
			});
			//block with type
			const nBlock = block as BlockDefinition;

			const fullId = `${idPrefix}${block.func}`;
			const warningsNew = Object.create(null);
			if (nBlock.warnings) {
				warningsNew[fullId] = Object.create(null);
				for (const warning of nBlock.warnings) {
					let defaultType: string | string[] = "";
					let suffix = "";
					switch (warning.type) {
						case WarningType.RequiredParent:
							defaultType = warning.parentType;
							suffix = "_rp"; //required_parent all suffixes require to be 3 length
							break;
						case WarningType.EmptyInput:
							defaultType = warning.inputName;
							suffix = "_ri"; //required_input all suffixes require to be 3 length
							break;
					}
					if (Array.isArray(defaultType)) {
						for (const t of defaultType) {
							warningsNew[fullId][t + suffix.slice(suffix.length - 3, suffix.length)] =
								warning.message;
						}
					} else {
						warningsNew[fullId][defaultType + suffix.slice(suffix.length - 3, suffix.length)] =
							warning.message;
					}
				}
			}

			// actually define the block
			Blockly.Blocks[`${idPrefix}${block.func}`] = {
				init: function () {
					this.jsonInit({
						message0: blockDisplayContent.message0,
						args0: blockDisplayContent.args0,
						inputsInline: block.inline,
						output: block.output,
						tooltip: block.tooltip ? block.tooltip : "",
						helpUrl: block.url ? block.url : "",
						mutator: block.mutator !== "" ? block.mutator : ""
					});
					if (block.shape) {
						// apply block shape
						switch (block.shape) {
							case BlockShape.STATEMENT:
								this.setPreviousStatement(true);
								this.setNextStatement(true);
								break;
							case BlockShape.EVENT:
							case BlockShape.FLOATING:
								// dont change, already floating
								break;
							case BlockShape.TERMINAL:
								this.setPreviousStatement(true);
								break;
							case BlockShape.TOPPER:
								// opposite of terminal
								this.setNextStatement(true);
								break;
						}
					}
					this.setColour(registry.color);
					if (block.color) {
						this.setColour(block.color);
					}
					if (nBlock.warnings) {
						const tBlock = this;

						this.setOnChange(function (changeEvent) {
							/*
							 * when tab opens make the error not be added to WarningMessages
							 *
							 *
							 *
							 * */
							// if(changeEvent.type == "delete") {
							//     if(WarningMessages[changeEvent.blockId]) delete WarningMessages[changeEvent.blockId]
							// }

							if (
								((EventsToTriggerWarnings[changeEvent.type] === 0 &&
									changeEvent.blockId === this.id) ||
									changeEvent.type == "change") &&
								!this.isInFlyout
							) {
								const topMostParent = this.getRootBlock();
								// let wtext = ""
								let nwtext = "";
								for (const key in warningsNew[fullId]) {
									if (!WarningMessages[this.id]) {
										WarningMessages[this.id] = Object.create(null);
									}
									switch (key.slice(key.length - 3, key.length)) {
										case "_rp": //required parent suffix
											const parent = key.slice(0, key.length - 3);

											if (topMostParent.type !== parent) {
												nwtext += `${warningsNew[fullId][key]}\n`;
												if (WarningMessages[this.id]) {
													WarningMessages[this.id][key] = `${warningsNew[fullId][key]}\n`;
												}
											} else {
												if (WarningMessages[this.id]) {
													if (WarningMessages[this.id][key]) delete WarningMessages[this.id][key];
												}
											}
											break;
										case "_ri": //required input suffix
											const input = key.slice(0, key.length - 3);
											if (tBlock.getInput(input).connection.targetConnection === null) {
												nwtext += `${warningsNew[fullId][key]}\n`;

												if (WarningMessages[this.id]) {
													WarningMessages[this.id][key] = `${warningsNew[fullId][key]}\n`;
												}
											} else {
												if (WarningMessages[this.id]) {
													if (WarningMessages[this.id][key]) delete WarningMessages[this.id][key];
												}
											}
											break;
									}
								}
								if (WarningMessages[this.id]) {
									if (Object.keys(WarningMessages[this.id]).length === 0) {
										delete WarningMessages[this.id];
									}
								}
								console.log(WarningMessages);
								if (nwtext === "") {
									nwtext = null;
								}

								this.setWarningText(nwtext);
								nwtext = "";
							}
						});
					}
				}
			};
			// define JS gen
			javascriptGenerator.forBlock[`${idPrefix}${block.func}`] = function (
				exportblock: Blockly.Block
			) {
				const args: any = {};

				for (const argument of blockDisplayContent.args0) {
					// args0 is an array of blockly argument objects
					// the [INPUT] -> INPUT names are saved in the "name" property
					const argName = argument.name;
					switch (argument.type) {
						case "input_value":
							args[argName] = javascriptGenerator.valueToCode(
								exportblock,
								argName,
								javascriptGenerator.ORDER_ATOMIC
							);
							break;
						case "input_statement":
							args[argName] = javascriptGenerator.statementToCode(exportblock, argName);
							break;
						case "input_dummy":
						case "input_space":
							args[argName] = "";
							break;
						default:
							args[argName] = exportblock.getFieldValue(argName);
							break;
					}
				}

				if (exportblock.fields_ && exportblock.fields_.length !== 0) {
					for (const field of (exportblock as any).fields_ as string[]) {
						const input = exportblock.getInput(field);
						if (input) {
							if (input.type === 3) {
								// 3 is statement type
								const val = javascriptGenerator.statementToCode(exportblock, field);
								args[field] = val.slice(1, val.length - 1);
								args[field.toUpperCase()] = val.slice(1, val.length - 1);
								continue;
							}

							const val = javascriptGenerator.valueToCode(
								exportblock,
								field,
								javascriptGenerator.ORDER_ATOMIC
							);
							args[field] = val.slice(1, val.length - 1);
							args[field.toUpperCase()] = val.slice(1, val.length - 1);
						}
					}
				}
				const returnValue = blockset[block.func](args);
				// if a non-tuple was returned as an output block,
				// we need to convert it to one
				if (typeof block.output !== "undefined" && !Array.isArray(returnValue)) {
					// default is ORDER_NONE, meaning () around the whole thing
					return [returnValue, javascriptGenerator.ORDER_NONE];
				}
				return returnValue;
			};

			CheckMutatorType(block, idPrefix);
		}
		// let blockName = "controls_if_test"
		// let mut = "coretest_mutator_mutator"
		// if(!Blockly.Blocks[blockName]) {
		//     Blockly.Blocks[blockName] = {
		//         init: function () {
		//             this.jsonInit({
		//                 'message0': 'eeee',
		//                 'previousStatement': null,
		//                 'nextStatement': null,
		//                 'style': 'logic_blocks',
		//                 'helpUrl': '',
		//                 'mutator.ts': mut,
		//             })
		//         }
		//     }
		//
		//
		//     Blockly.Extensions.registerMutator(
		//         mut,
		//         {
		//             saveExtraState: function () {
		//                 return {};
		//             },
		//
		//             loadExtraState: function (state: any) {
		//
		//                 this.updateShape_();
		//             },
		//             decompose: function (workspace: Blockly.Workspace) {
		//
		//
		//                 const containerBlock = workspace.newBlock(mut);
		//                 containerBlock.initSvg();
		//
		//                 return containerBlock;
		//             },
		//
		//
		//             compose: function (topBlock: any) {
		//                 this.updateShape_()
		//             },
		//             updateShape_: function () {
		//
		//             }
		//         },
		//         undefined,
		//         []);
		// }
	}
}

// const Blockly = require("blockly/core");
// /* eslint-disable */
// module.exports.createBlock = (data) => {
//     // data = {
//     //     id: "blobkaname",
//     //     text: "among us [DUMMY] [TROLOLO]",
//     //     color: "#ff0000",
//     //     tooltip: "abc",
//     //     url: "abc",
//     //     output: module.exports.OutputType.STRING,
//     //     inline: true,
//     //     hidden: false,
//     //     inputs: {
//     //         DUMMY: { type: "input_dummy" },
//     //         TROLOLO: { type: "input_value", check: module.exports.OutputType.STRING }
//     //     },
//     //     export: (block, args) => {
//     //         return `banana ${args.TROLOLO}`
//     //     }
//     // }
//     if (!data.id) throw new Error("Block ID cannot be undefined");
//     if (!data.text) throw new Error("Block text cannot be undefined");
//     const inputNames = [];
//     let i = 0;
//     const message = String(data.text).replace(/(\[\S+\])+/gmi, (match) => {
//         i++;
//         inputNames.push(String(match).replace(/[\[\]]*/gmi, ""));
//         return "%" + i;
//     });
//     const argumentss = [];
//     inputNames.forEach(name => {
//         argumentss.push({
//             type: data.inputs[name].type,
//             check: data.inputs[name].check,
//             options: data.inputs[name].options,
//             name: name
//         });
//     });
//     Blockly.Blocks[data.id] = {
//         init: function () {
//             this.jsonInit(
//                 data.floating == true ? {
//                     "message0": message,
//                     "args0": argumentss,
//                     "inputsInline": data.inline,
//                     "colour": data.color,
//                     "output": data.output,
//                     "tooltip": data.tooltip ? data.tooltip : "",
//                     "helpUrl": data.url ? data.url : ""
//                 } : {
//                     "message0": message,
//                     "args0": argumentss,
//                     "inputsInline": data.inline,
//                     "colour": data.color,
//                     "output": data.output,
//                     "previousStatement": null,
//                     "nextStatement": null,
//                     "tooltip": data.tooltip ? data.tooltip : "",
//                     "helpUrl": data.url ? data.url : ""
//                 }
//             );
//         },
//         isHiden: data.hidden
//     };
//     Blockly.JavaScript[data.id] = function (block) {
//         const args = {};
//         inputNames.forEach(input => {
//             switch (data.inputs[input].type) {
//                 case 'input_value':
//                     args[input] = Blockly.JavaScript.valueToCode(block, input, Blockly.JavaScript.ORDER_ATOMIC);
//                     break;
//                 case 'input_statement':
//                     args[input] = Blockly.JavaScript.statementToCode(block, input);
//                     break;
//                 case 'input_dummy':
//                     args[input] = "";
//                     break;
//                 case 'input_space':
//                     args[input] = "";
//                     break;
//                 default:
//                     args[input] = block.getFieldValue(input);
//                     break;
//             }
//         });
//         if (data.output == null) return data.export(block, args);
//         return [data.export(block, args), Blockly.JavaScript.ORDER_NONE];
//     };
// };
