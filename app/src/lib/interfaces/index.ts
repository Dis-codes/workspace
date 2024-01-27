import Blockly from "blockly/core";
import {MutatorType} from "$lib/interfaces/mutator";
import {WarningData} from "./warnings"
interface Register {
    id: string,
    color: number | string,
    blocks: BlockDefinition[]
}
interface BlockDefinition {
    func: string
    text: string | string[]
    output?: string
    branches?: number
    shape?: string
    mutator?: string
    mutatorData?: MutatorData
    arguments?: { [k: string]: Argument };
    inline?: boolean
    warnings: WarningData[]
}
interface Argument {
    type: string
    text: string
    src?: string
    width?: number
    height?: number
    alt?: string
    spellcheck?: boolean
    check?: string
}
interface MutatorData {
    type: string
    // if this is not "" it will use this for mutator.ts block and then add checkbox inputs to that block
    blockType?: string
    color?: string
    inputs: MutatorInput[]

    inputModifier?: (block: Blockly.Block) => void // BlockList mutator type field
    blockList: string[]
}
interface MutatorInput {
    text?: string // adding string[] type will be later when adding more mutators
    inputName?: string // used in js code generation for example `${args.inputName}`
    type?: string // optional when used with branch
    branch?: boolean //if true will add a branch instead of a input field and in that case type is optional
    defaultValue?: boolean//may change later after adding more mutator.ts types

    //fields for blocklist mutator
    blockId?: string,

}

export {
    Register,
    MutatorInput,
    MutatorData,
    Argument,
    BlockDefinition,
}