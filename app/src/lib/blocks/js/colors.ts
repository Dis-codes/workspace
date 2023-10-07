import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class ColorsBlocks {
    getRegistry() {
        return {
            id: "colour",
            color: "%{BKY_COLOUR_HUE}",
            blocks: [
                {
                    func: "RGB",
                    text: "Colour with Red[R] Green[G] Blue[B]",
                    inline: false,
                    output: OutputType.STRING,
                    arguments: {
                        R: {
                            type: InputShape.VALUE,
                            check: OutputType.NUMBER
                        },
                        G: {
                            type: InputShape.VALUE,
                            check: OutputType.NUMBER
                        },
                        B: {
                            type: InputShape.VALUE,
                            check: OutputType.NUMBER
                        },
                    },
                },
                {
                    func: "hex",
                    text: "Hex # [HEX]",
                    inline: true,
                    output: OutputType.STRING,
                    arguments: {
                        HEX: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    },
                },
                {
                    func: "random",
                    text: "Random color",
                    output: OutputType.STRING,
                }
            ],
        };
    }

    RGB(args: any) {
        return `rgb(${args.R},${args.G},${args.B})`;
    }

    hex(args: any) {
        return `"#${args.HEX.replace(/'/g,'')}"`;
    }

    random() {
        return `"#${Math.floor(Math.random() * 16777215).toString(16)}"`;
    }
}

export default ColorsBlocks;
