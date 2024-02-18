import type Blockly from "blockly/core";
import content from "./blocks/categories";
const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: content
};
export default toolbox;
