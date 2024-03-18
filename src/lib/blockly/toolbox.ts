import type Blockly from "blockly/core";
import content from "../blockly/blocks/categories";
const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: content
};
export default toolbox;
