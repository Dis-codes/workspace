import Blockly, { type ICollapsibleToolboxItem, type IToolbox } from "blockly/core";
import En from "blockly/msg/en";

import { DarkTheme } from "$lib/blockly/defaultWorkspace";
import type { CategoryInfo } from "blockly/core/utils/toolbox";

export const _en = {
	rtl: false,
	msg: {
		...En
	}
};

class CustomCategory extends Blockly.ToolboxCategory {
	constructor(categoryDef: CategoryInfo, toolbox: IToolbox, opt_parent: ICollapsibleToolboxItem) {
		super(categoryDef, toolbox, opt_parent);
	}
}

Blockly.registry.register(
	Blockly.registry.Type.TOOLBOX_ITEM,
	Blockly.ToolboxCategory.registrationName,
	CustomCategory,
	true
);

export const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: [
		{
			id: "generated",
			kind: "category",
			expanded: true,
			name: "Generated Block",
			colour: "#5b80a5",
			contents: [
				{
					kind: "block",
					type: "test_myfunction"
				}
			]
		}
	]
};

export const config = {
	theme: DarkTheme,
	renderer: "zelos",
	collapse: false,
	disable: false,
	maxBlocks: 1,
	trashcan: false,
	horizontalLayout: false,
	rtl: false,
	grid: {
		spacing: 25,
		length: 2,
		colour: "#5c5a5a",
		snap: true
	},
	toolbox
};
