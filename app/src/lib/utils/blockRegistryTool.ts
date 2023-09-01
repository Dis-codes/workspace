import javascriptGenerator from '$lib/javascript';
import Blockly from "blockly/core";

/**
 * List of constants for different output types.
 */
const OutputType = {
    /**
     * Output type for string blocks or inputs.
     */
    STRING: ["String", "Text"],

    /**
     * Output type for number blocks or inputs.
     */
    NUMBER: ["Number"],

    /**
     * Output type for boolean blocks or inputs.
     */
    BOOLEAN: ["Boolean", "Bool"],

    /**
     * Output type for array / list blocks or inputs.
     */
    ARRAY: ["List", "Array"],

    /**
     * Output type for object / JSON blocks or inputs.
     */
    OBJECT: ["Object", "JSON"],

    /**
     * Input type for allowing any blocks inside.
     * Can be used by outputs if needed.
     */
    ANY: null,
}

/**
 * List of constants for different block shapes.
 */
const BlockShape = {
    /**
     * Block shape for a statement block.
     * Not actually required, but keeps code consistent.
     */
    STATEMENT: "statement",

    /**
     * Block shape for a floating block with an input inside.
     * Can be replaced with FLOATING, but keeps code consistent.
     */
    EVENT: "event",

    /**
     * Block shape for a block with no blocks allowed to attach after.
     */
    TERMINAL: "terminal",

    /**
     * Block shape for a block that cannot have any parent blocks.
     */
    FLOATING: "floating",

    /**
     * Block shape for a block that cannot have any blocks attached before it.
     */
    TOPPER: "topper",

    /**
     * Custom block shape, can be used if "manual" is used for the block.
     */
    CUSTOM: "custom",
}

/**
 * List of constants for different input shapes / fields.
 */
const InputShape = {
    /**
     * Input shape for inputs that allow output blocks.
     */
    VALUE: "input_value",

    /**
     * Input shape for dummy inputs.
     * Can be used for seperating content on a block by a new line.
     */
    DUMMY: "input_dummy",

    /**
     * Similar to DUMMY.
     * Can be used for seperating content on a block.
     */
    SPACE: "input_space",

    /**
     * Not actually an input, but an image.
     */
    IMAGE: "field_image",

    /**
     * Angle field for directional inputs.
     */
    ANGLE: "field_angle",

    /**
     * Checkbox field usually for toggles.
     */
    CHECKBOX: "field_checkbox",

    /**
     * Color field.
     */
    COLOR: "field_colour",

    /**
     * Dropdown menu field with options.
     */
    MENU: "field_dropdown",

    /**
     * Label that serializes to the project.
     */
    SERIALIZABLE_LABEL: "field_label_serializable",

    /**
     * Number field. Used for restricting to certain numbers.
     */
    NUMBER: "field_number",

    /**
     * Text field. Used if blocks shouldnt be used here,
     * but text can still be input here.
     */
    TEXT: "field_input",

    /**
     * Multi-line text field.
     * Similar to TEXT, but new line characters are allowed.
     */
    MULTILINE_TEXT: "field_multilinetext",

    /**
     * Variable field.
     * Similar to MENU, but the options are all variables.
     */
    VARIABLE: "field_variable"
}

class BlocklyTool {
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
            if (typeof block.manual === 'string') {
                // manual block, dont do anything actually
                // just run the function
                blockset[block.manual](Blockly, javascriptGenerator);
                continue; // move to the next block
            }
            // extract inputs from the block
            const blockDisplayContent: any = {
                message0: '',
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
            const arrayText: Array<string> = rawArrayText.map(text => {
                const newText = text.replace(/\n/gmi, (match) => {
                    // add to arguments
                    const currentIdx = idxa;
                    const id = `DUMMYNEWLINE_${currentIdx}`;
                    // add to arguments
                    blockArguments[id] = {
                        type: "input_dummy"
                    };
                    idxa++;
                    // replaces the first entry
                    return match.replace('\n', `[${id}]`);
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
                    const index = (idx * 2) + 1;
                    arrayText.splice(index, 0, id);
                }
            }
            // now parse this and add to message0 and args0
            const blockMessage = arrayText.join(' ');
            let idx = 0;
            // parse blockMessage and add it to message0
            blockDisplayContent.message0 = String(blockMessage).replace(/(\[\S+\])+/gmi, (match) => {
                idx++;
                // reads the text inside of the brackets
                const inputName: string = String(match).replace(/[\[\]]*/gmi, "");
                // add to arguments
                // get the argument data
                const realArgument = block.arguments[inputName] ?
                    block.arguments[inputName]
                    // if not defined, default to blank input_value
                    : { type: "input_value" };
                blockDisplayContent.args0.push({
                    // adds all argument data like type
                    ...realArgument,
                    // add argument name
                    name: inputName
                });
                // return the %1 thing blockly wants
                return "%" + idx;
            });
            // actually define the block
            Blockly.Blocks[`${idPrefix}${block.func}`] = {
                init: function () {
                    this.jsonInit({
                        message0: blockDisplayContent.message0,
                        args0: blockDisplayContent.args0,
                        inputsInline: block.inline,
                        output: block.output,
                        tooltip: block.tooltip ? block.tooltip : "",
                        helpUrl: block.url ? block.url : ""
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
                }
            };
            // define JS gen
            javascriptGenerator[`${idPrefix}${block.func}`] = function (exportblock: Blockly.Block) {
                const args: any = {};
                for (const argument of blockDisplayContent.args0) {
                    // args0 is an array of blockly argument objects
                    // the [INPUT] -> INPUT names are saved in the "name" property
                    const argName = argument.name;
                    switch (argument.type) {
                        case 'input_value':
                            args[argName] = javascriptGenerator.valueToCode(exportblock, argName, javascriptGenerator.ORDER_ATOMIC);
                            break;
                        case 'input_statement':
                            args[argName] = javascriptGenerator.statementToCode(exportblock, argName);
                            break;
                        case 'input_dummy':
                        case 'input_space':
                            args[argName] = "";
                            break;
                        default:
                            args[argName] = exportblock.getFieldValue(argName);
                            break;
                    }
                }
                const returnValue = blockset[block.func](args);
                // if a non-tuple was returned as an output block,
                // we need to convert it to one
                if (typeof block.output !== 'undefined' && !Array.isArray(returnValue)) {
                    // default is ORDER_NONE, meaning () around the whole thing
                    return [returnValue, javascriptGenerator.ORDER_NONE];
                }
                return returnValue;
            };
        }
    }
}

export {
    OutputType,
    BlockShape,
    InputShape,
    BlocklyTool
};

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