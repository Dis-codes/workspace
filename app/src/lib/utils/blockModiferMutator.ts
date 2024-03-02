import type {BlockDefinition} from "../interfaces";
import type Blockly from "blockly";
import javascriptGenerator from "$lib/javascript";

export function BlockModifierMutator(blockData: BlockDefinition, block: Blockly.Block) {
    if(!blockData.mutatorData?.blockModifier) return
    let keys = Object.keys(blockData.mutatorData?.blockModifier)
    for (const key of keys) {
        let conditions = blockData.mutatorData?.blockModifier[key].conditions
        let sCond = conditions[block.getFieldValue(key)]
        for (const sCondElement of sCond) {
            /*
            * input: string
            * action: string
            * */
            switch (sCondElement.action) {
                case "show":
                    if(!block.getInput(sCondElement.input)) block.appendValueInput(sCondElement.input)
                break
                case "hide":
                    block.removeInput(sCondElement.input, true)
                    break
            }

        }
        //loop conditions

    }
    //check for all args and do the conditionals thing each time
}