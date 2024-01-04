import javascriptGenerator from '$lib/javascript';
import { OutputType, BlockShape, InputShape } from '../../../utils/blockRegistryTool';
import type {Register} from "../../../interfaces";
import {MutatorType} from "$lib/interfaces/mutator";

class TestBlocks {
    /**
     * Details for this blockset and its blocks.
     */
    getRegistry () {
        return {
            id: "coretest",
            color: 60,
            blocks: [
                {
                  func: "mutator_mutator",
                  text: "test_block\n Bozo: [INPUT]",
                  shape: BlockShape.EVENT,
                    arguments: {
                        INPUT: {
                            type: InputShape.CHECKBOX
                        }
                    }
                },
                {
                    func: "test_mainblock",
                    text: "statement blockwdwdwdw",
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
                                defaultValue: false,
                            }
                        ]
                    },
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
                    text: [
                        "branch\n",
                        "with more stuff\n",
                        "and text here"
                    ],
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
                },
            ]
        } as Register;
    }
    test_mainblock(args: any) {
        return `${args.Description}; ${args.DESCRIPTION}` // both of these work
    }
    teststatement () {
        return 'void;';
    }
    testoutput () {
        return ['"abc"', javascriptGenerator.ORDER_NONE];
    }
    testevent (args: any) {
        return `setInterval(() => {
            ${args.BRANCH1}
        }, 100);`;
    }
    testbranch (args: any) {
        return `${args.BRANCH1}\n${args.BRANCH2}`;
    }
    testterminal () {
        return `return;`;
    }
    testinput (args: any) {
        return `console.log(${args.INPUT});`;
    }
    testfield (args: any) {
        // JSON.stringify escapes strings and places "" around them
        return [`${JSON.stringify(args.FIELD)}`, javascriptGenerator.ORDER_NONE];
    }
    testnontupleoutput () {
        // we dont even have to return tuple outputs in BlockSets,
        // they will default to exporting as ORDER_NONE
        return '"see code, this is just returned as a string"';
    }
}

export default TestBlocks;