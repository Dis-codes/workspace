import Blockly from "blockly/core";
import En from "blockly/msg/en";
import toolbox from "$lib/toolbox";
class CustomCategory extends Blockly.ToolboxCategory {
	/**
	 * Constructor for a custom category.
	 * @override
	 */
	constructor(categoryDef: any, toolbox: any, opt_parent: any) {
		super(categoryDef, toolbox, opt_parent);
	}
	// /** @override */
	// addColourBorder_(colour:any) {
	//   this.rowDiv_.style.backgroundColor = colour;
	// }
}
Blockly.registry.register(
	Blockly.registry.Type.TOOLBOX_ITEM,
	Blockly.ToolboxCategory.registrationName,
	CustomCategory,
	true
);
const DarkTheme = Blockly.Theme.defineTheme("a", {
	name: "true_dark",
	base: Blockly.Themes.Classic,
	componentStyles: {
		workspaceBackgroundColour: "#0C111A",
		toolboxBackgroundColour: "#111827",
		toolboxForegroundColour: "#ffffff",
		flyoutBackgroundColour: "#111827",
		flyoutForegroundColour: "#cccccc",
		flyoutOpacity: 0.5,
		scrollbarColour: "#797979",
		insertionMarkerColour: "#ffffff",
		insertionMarkerOpacity: 0.3,
		scrollbarOpacity: 0.01,
		cursorColour: "#d0d0d0"
	}
});
const en = {
	rtl: false,
	msg: {
		...En
	}
};
const config = {
	theme: DarkTheme,
	renderer: "zelos",
	collapse: true,
	comments: true,
	disable: true,
	maxBlocks: Infinity,
	trashcan: true,
	horizontalLayout: false,
	rtl: false,
	grid: {
		spacing: 25,
		length: 3,
		colour: "#5c5a5a",
		snap: true
	},
	zoom: {
		controls: true,
		startScale: 0.9,
		maxScale: 5,
		minScale: 0.1,
		scaleSpeed: 1.2
	},
	toolbox,
	move: {
		scrollbars: {
			horizontal: true,
			vertical: true
		},
		drag: true,
		wheel: true
	}
};
export { en, Blockly, config };
