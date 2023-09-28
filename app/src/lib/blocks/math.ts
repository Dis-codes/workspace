import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class Mathblocks {
    getRegistry() {
        return {
            id: "math",
            color: "%{BKY_MATH_HUE}",
            blocks: [
                {
                    func: "math_operation",
                    text: "[OPERATION] [A]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        OPERATION: {
                            type: InputShape.MENU,
                            options: [
                                ['Add 1 to', 'increment'],
                                ['Remove 1 from', 'decrement']
                            ]
                        },
                        A: {
                            type: InputShape.VARIABLE,
                            check: OutputType.NUMBER
                        },
                    },
                },
                {
                    func: "convert_to_number",
                    text: "Convert [A] to number",
                    output: OutputType.NUMBER,
                    arguments: {
                        A: {
                            type: InputShape.VALUE,
                        },
                    },
                }
            ],
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
