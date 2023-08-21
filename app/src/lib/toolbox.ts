import type Blockly from "blockly/core";

// TODO: should each category be its own file? would make this file a lot cleaner
const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
    kind: "categoryToolbox",
    contents: [
        {
            id: "logic",
            kind: "category",
            name: "Logic",
            colour: "#5b80a5",
            contents: [
                // these are built in
                {
                    kind: "block",
                    type: "logic_compare"
                },
                {
                    kind: "block",
                    type: "logic_operation"
                },
                {
                    kind: "block",
                    type: "logic_boolean"
                }
            ]
        }
    ]
};

export default toolbox;