import { BlockShape, InputShape, OutputType } from "$lib/utils/blockRegistryTool";

export default class {
	getRegistry() {
		return {
			id: "joins",
			name: "User Joins",
			color: "#60cc6c",
			weight: 7,
			blocks: []
		};
	}
}
