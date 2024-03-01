import type {BlockDefinition} from "../interfaces";
import type Blockly from "blockly";
import javascriptGenerator from "$lib/javascript";

export function BlockModifierMutator(blockData: BlockDefinition, block: Blockly.Block) {
    if(!blockData.mutatorData?.blockModifier) return
    let keys = Object.keys(blockData.mutatorData?.blockModifier)
    for(const key of keys) {

        let valueStr = block.getFieldValue(key)
        let main = blockData.mutatorData.blockModifier[key]
        let value = main.conditions[valueStr]


        //set message 0 now
    }
    //check for all args and do the conditionals thing each time
}