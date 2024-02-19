import { BlockShape, InputShape, OutputType } from "$lib/utils/blockRegistryTool";

export default class {
	getRegistry() {
		return {
			id: "messageset",
			name: "Set Message",
			weight: 2,
			color: "#4b9afb",
			blocks: []
		};
	}
}
