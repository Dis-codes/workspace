import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class Mathblocks {
	getRegistry() {
		return {
			id: 'math',
			color: '%{BKY_MATH_HUE}',
			blocks: [
				{
					func: 'convert_to_number',
					text: 'Convert [A] to number',
					output: OutputType.NUMBER,
					arguments: {
						A: {
							type: InputShape.VALUE
						}
					}
				}
			]
		};
	}

	math_operation(args: any) {
		switch (args.OPERATION) {
			case 'increment':
				return `(${args.A})++`;
			case 'decrement':
				return `(${args.A})--`;
			default:
				return '';
		}
	}

	convert_to_number(args: any) {
		return `Number(${args.A})`;
	}
}

export default Mathblocks;
