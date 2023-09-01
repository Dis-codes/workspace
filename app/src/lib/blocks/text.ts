import { OutputType, BlockShape, InputShape } from '../utils/blockRegistryTool';

class TextBlocks {
    /**
     * Details for this blockset and its blocks.
     */
    getRegistry () {
        return {
            id: "text",
            color: "%{BKY_TEXTS_HUE}",
            blocks: [
                {
                    func: "startsEndsWith",
                    text: "[TEXT] [OPTION] with [OTHERTEXT]",
                    output: OutputType.BOOLEAN,
                    inline: true,
                    arguments: {
                        TEXT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        OPTION: {
                            type: InputShape.MENU,
                            options: [
                                ['starts', 'startsWith'],
                                ['ends', 'endsWith']
                            ]
                        },
                        OTHERTEXT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                    }
                }
            ]
        };
    }

    startsEndsWith (args: any) {
        return `String(${args.TEXT}).${args.OPTION}(${args.OTHERTEXT})`;
    }
}

export default TextBlocks;