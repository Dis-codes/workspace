import {MutatorType} from "$lib/interfaces/mutator";

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
}
interface MutatorInput {
    text: string // adding string[] type will be later when adding more mutators
    type: string
    defaultValue: boolean//may change later after adding more mutator.ts types
}

export {
    Register,
    MutatorInput,
    MutatorData,
    Argument,
    BlockDefinition,
}