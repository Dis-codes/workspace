import BlocklyTool from "$lib/utils/blockRegistryTool";
const BlockRegistryTool = new BlocklyTool();

import blockClasses from "$lib/blockly/blocks";

blockClasses.forEach((block) => {
	BlockRegistryTool.registerFromBlockset(new block());
});
