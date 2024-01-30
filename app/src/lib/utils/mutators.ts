import type { BlockDefinition, MutatorInput } from "$lib/interfaces";
import { MutatorType } from "$lib/interfaces/mutator";
import Blockly from "blockly/core";

export function CheckBoxMutator(blockData: BlockDefinition, id: string) {
	let blockFields: string[] = [];
	let blockTypes: string[] = [];

	let blockFieldNames: string[] = [];
	let blockInputs: boolean[] = [];
	let inputsData: MutatorInput[] = [];

	for (const input of blockData.mutatorData?.inputs as MutatorInput[]) {
		blockFields.push(input.text);
		blockTypes.push(input.type);
		blockInputs.push(input.defaultValue);

		blockFieldNames.push(input.inputName);
		inputsData.push(input);
	}

	if (blockData.mutatorData?.blockType === "") {
		Blockly.Blocks[blockData.mutator as string] = {
			init: function () {
				let msg: string = "";
				if (blockData.mutatorData?.inputs.length !== 0) {
					msg = "No inputs detected";
				}
				this.jsonInit({
					message0: msg === "" ? msg : "",
					color: blockData.mutatorData?.color !== "" ? blockData.mutatorData?.color : "#eb7734",
					previousStatement: null,
					nextStatement: null
				});
			}
		};
	}

	Blockly.Extensions.registerMutator(
		blockData.mutator as string,
		{
			inputs_: blockInputs,
			fields_: blockFields,
			types_: blockTypes,
			saveExtraState: function () {
				if (!this.inputs_ || this.inputs_.length === 0) return null;
				const state = Object.create(null);
				if (this.inputs_ && this.fields_) {
					for (let i = 0; i < this.inputs_.length; i++) {
						if (this.inputs_[i]) state[this.fields_[i]] = this.inputs_[i];
					}
				}
				return state;
			},

			loadExtraState: function (state: any) {
				for (let i = 0; i < this.inputs_.length; i++) {
					this.inputs_[i] = state[this.fields_[i]];
				}
				this.updateShape_();
			},
			decompose: function (workspace: Blockly.Workspace) {
				const containerBlock = workspace.newBlock(
					blockData.mutatorData.blockType !== ""
						? blockData.mutatorData.blockType
						: blockData.mutator
				);
				for (let i = 0; i < this.inputs_.length; i++) {
					containerBlock
						.appendDummyInput()
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(this.fields_[i])
						.appendField(
							new Blockly.FieldCheckbox(this.inputs_[i] ? "TRUE" : "FALSE"),
							this.fields_[i]
						);
				}

				containerBlock.initSvg();

				return containerBlock;
			},

			compose: function (topBlock: any) {
				for (let i = 0; i < this.inputs_.length; i++) {
					this.inputs_[i] = topBlock.getFieldValue(this.fields_[i]) == "TRUE";
				}
				this.updateShape_();
			},
			updateShape_: function () {
				for (let i = 0; i < this.inputs_.length; i++) {
					if (this.getInput(this.fields_[i]) && !this.inputs_[i]) {
						this.removeInput(this.fields_[i]);
					}
				}
				for (let i = 0; i < this.inputs_.length; i++) {
					if (this.inputs_[i] && !this.getInput(this.fields_[i])) {
						if (inputsData[i].branch) {
							this.appendStatementInput(
								blockFieldNames[i] ? blockFieldNames[i] : this.fields_[i]
							).appendField(this.fields_[i]);
							continue;
						}

						this.appendValueInput(blockFieldNames[i] ? blockFieldNames[i] : this.fields_[i])
							.setCheck(blockTypes[i])
							.setAlign(Blockly.ALIGN_RIGHT)
							.appendField(this.fields_[i]);
					}
				}
			}
		},
		function () {
			this.inputs_ = [...blockInputs];
			this.fields_ = [...blockFields];
			this.types_ = [...blockTypes];
		},
		[]
	);
}

/*
id: block id group
*/
export function BlockListMutator(blockData: BlockDefinition, id: string) {
	if (blockData.mutatorData?.blockType === "") {
		Blockly.Blocks[blockData.mutator as string] = {
			init: function () {
				let msg: string = "";
				if (blockData.mutatorData?.inputs.length !== 0) {
					msg = "No inputs detected";
				}
				this.jsonInit({
					message0: msg === "" ? msg : "",
					color: blockData.mutatorData?.color !== "" ? blockData.mutatorData?.color : "#eb7734",
					previousStatement: null,
					nextStatement: null
				});
			}
		};
	}
	let blockIds = [];
	if (blockData.mutatorData?.inputs.length !== 0) {
		for (const input of blockData.mutatorData?.inputs) {
			blockIds.push(input.blockId);
		}
	}
	Blockly.Extensions.registerMutator(
		blockData.mutator as string,
		{
			saveExtraState: function (thist: any) {
				const state = Object.create(null);
				for (const inp of blockData.mutatorData?.inputs) {
					if (this[inp.inputName ? inp.inputName : inp.text]) {
						state[inp.inputName ? inp.inputName : inp.text] =
							this[inp.inputName ? inp.inputName : inp.text];
					}
				}
				return state;
			},
			loadExtraState: function (state: any) {
				for (const inp of blockData.mutatorData?.inputs) {
					this[inp.inputName ? inp.inputName : inp.text] =
						state[inp.inputName ? inp.inputName : inp.text];
				}
				this.updateShape_();
			},
			compose: function (topBlock: any) {},

			decompose: function (workspace: Blockly.Workspace) {
				let containerBlock: Blockly.Block;
				if (blockData.mutatorData?.blockType === "") {
					containerBlock = workspace.newBlock(blockData.mutator);
				} else {
					containerBlock = workspace.newBlock(blockData.mutatorData?.blockType);
				}
				let connection = containerBlock.nextConnection!;
				const elseifBlock = workspace.newBlock("controls_if_elseif");
				elseifBlock.initSvg();
				connection.connect(elseifBlock.previousConnection!);
				containerBlock.initSvg();
				return containerBlock;
			},
			saveConnections: function (containerBlock: Blockly.Block) {
				// let clauseBlock =
				//     containerBlock!.nextConnection!.targetBlock() as ClauseBlock | null;
				// let i = 1;
				// while (clauseBlock) {
				//     if (clauseBlock.isInsertionMarker()) {
				//         clauseBlock = clauseBlock.getNextBlock() as ClauseBlock | null;
				//         continue;
				//     }
				//     clauseBlock.connections
				//     switch (clauseBlock.type) {
				//         case 'controls_if_elseif': {
				//
				//             i++;
				//             break;
				//         }
				//         case 'controls_if_else': {
				//             const inputDo = this.getInput('ELSE');
				//             clauseBlock.connections =
				//                 inputDo && inputDo.connection!.targetConnection;
				//             break;
				//         }
				//         default:
				//             throw TypeError('Unknown block type: ' + clauseBlock.type);
				//     }
				//     console.log(clauseBlock.type)
				//     clauseBlock = clauseBlock.getNextBlock() as ClauseBlock | null;
				// }
			},
			rebuildShape_: function () {},
			reconnectChildBlocks_: function (
				connections: Blockly.Connection /*needs arguments with connections*/
			) {},

			updateShape_: function () {}
		},
		function () {
			for (const inp of blockData.mutatorData?.inputs) {
				this[inp.inputName ? inp.inputName : inp.text] = 0;
			}
		},
		blockIds as string[]
	);
}

export function CheckMutatorType(blockData: BlockDefinition, id: string) {
	if (Blockly.Extensions.isRegistered(blockData.mutator as string)) return;
	switch (blockData.mutatorData?.type) {
		case MutatorType.CheckBox:
			if (!Blockly.Extensions.isRegistered(blockData.mutator as string))
				CheckBoxMutator(blockData, id);
		// case MutatorType.BlockList:
		//     if (!Blockly.Extensions.isRegistered(blockData.mutator as string)) BlockListMutator(blockData, id)
	}
}
