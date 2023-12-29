import type {BlockDefinition, MutatorInput} from "$lib/interfaces";
import {MutatorType} from "$lib/interfaces/mutator";
import Blockly from "blockly/core";

export function CheckBoxMutator(blockData: BlockDefinition, id: string) {
    let blockFields: string[] = []
    let blockTypes: string[] = []
    let blockInputs: boolean[] = []
    for (const input of blockData.mutatorData?.inputs as MutatorInput[]) {
        blockFields.push(input.text)
        blockTypes.push(input.type)
        blockInputs.push(input.defaultValue)
    }

    if(blockData.mutatorData?.blockType === "") {
        Blockly.Blocks[blockData.mutator as string] = {
            init: function () {
                let msg: string = ""
                if(blockData.mutatorData?.inputs.length !== 0) {
                    msg = "No inputs detected"
                }
                this.jsonInit({
                    "message0": msg === ""? msg: "",
                    'color': blockData.mutatorData?.color? blockData.mutatorData?.color : "#eb7734",
                    'previousStatement': null,
                    'nextStatement': null,
                })

            }
        }
    }
    
    Blockly.Extensions.registerMutator(
        blockData.mutator as string,
        {
            inputs_: blockInputs,
            fields_: blockFields,
            types_: blockTypes,
            saveExtraState: function () {
                if(!this.inputs_ || this.inputs_.length === 0) return null
                const state = Object.create(null);
                if(this.inputs_ && this.fields_)  {
                    for (let i = 0; i<this.inputs_.length; i++) {
                        if(this.inputs_[i]) state[this.fields_[i]] = this.inputs_[i]
                    }
                }
                return state;
            },

            loadExtraState: function (state: any) {
                for (let i = 0; i < this.inputs_.length; i++) {
                    this.inputs_[i] = state[this.fields_[i]]
                }
                this.updateShape_();
            },
            decompose: function (workspace: Blockly.Workspace) {


                const containerBlock = workspace.newBlock(blockData.mutatorData.blockType !== ""? blockData.mutatorData.blockType : blockData.mutator);
                for (let i = 0; i < this.inputs_.length; i++) {
                    containerBlock.appendDummyInput()
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField(this.fields_[i])
                        .appendField(new Blockly.FieldCheckbox(this.inputs_[i] ? "TRUE" : "FALSE"), this.fields_[i]);
                }

                containerBlock.initSvg();

                return containerBlock;
            },


            compose: function (topBlock: any) {
                for (let i = 0; i < this.inputs_.length; i++) {
                    this.inputs_[i] = (topBlock.getFieldValue(this.fields_[i]) == "TRUE");
                }
                this.updateShape_();
            },
            updateShape_: function () {
                for (let i = 0; i < this.inputs_.length; i++) {
                    if (this.getInput(this.fields_[i])) this.removeInput(this.fields_[i]);
                }
                for (let i = 0; i < this.inputs_.length; i++) {
                    if (this.inputs_[i]) {
                        this.appendValueInput(this.fields_[i])
                            .setCheck(blockTypes[i])
                            .setAlign(Blockly.ALIGN_RIGHT)
                            .appendField(this.fields_[i]);
                    }
                }
            }
        },
        function () {
            this.inputs_ = [...blockInputs]
            this.fields_ = [...blockFields]
            this.types_ = [...blockTypes]
        },
        []);

}
export function CheckMutatorType(blockData: BlockDefinition, id: string) {
    switch (blockData.mutatorData?.type) {
        case MutatorType.CheckBox: if (!Blockly.Extensions.isRegistered(blockData.mutator as string)) CheckBoxMutator(blockData, id)
    }
}