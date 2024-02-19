import { OutputType, BlockShape, InputShape } from "$lib/utils/blockRegistryTool";

export default class {
	getRegistry() {
		return {
			id: "loops",
			color: "%{BKY_LOOPS_HUE}",
			weight: 2,
			blocks: [
			]
		};
	}
}
