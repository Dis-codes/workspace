import type Blockly from "blockly/core";
import content from "./categories";
// import * from "./blocks"
// TODO: should each category be its own file? would make this file a lot cleaner
const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: content
};
export default toolbox;
