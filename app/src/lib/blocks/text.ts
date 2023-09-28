import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

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
                    text: "[TEXT] [OPTION] [OTHERTEXT]",
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
                                ['starts with', 'startsWith'],
                                ['ends with', 'endsWith'],
                                ['includes', 'includes']
                            ]
                        },
                        OTHERTEXT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                    }
                },
                {
                    func: "newline",
                    text: "new line",
                    output: OutputType.STRING,
                },
                {
                    func: "containsNumber",
                    text: "[TEXT] contains numbers ?",
                    output: OutputType.BOOLEAN,
                    inline: true,
                    arguments: {
                        TEXT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "forEach",
                    text: "for each [SELECT] in [TEXT]",
                    shape: BlockShape.STATEMENT,
                    branches: 1,
                    inline: true,
                    arguments: {
                        TEXT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        SELECT: {
                            type: InputShape.MENU,
                            options: [
                                ['character', 'char'],
                                ['word', 'word']
                            ]
                        }
                    }
                },
               {
                func: "character",
                text: "[SELECT]",
                output: OutputType.STRING,
                inline: true,
                arguments: {
                    SELECT: {
                        type: InputShape.MENU,
                        options: [
                            ['character', 'char'],
                            ['word', 'word']
                        ]
                    }
                }
               }
                
            ]
        };
    }

    startsEndsWith (args: any) {
        return `String(${args.TEXT}).${args.OPTION}(${args.OTHERTEXT})`;
    }

    newline (args: any) {
        return `\\n`;
    }

    containsNumber (args: any) {
        return `String(${args.TEXT}).match(/\\d+/g) !== null`;
    }

    forEach (args: any) {
        switch (args.SELECT) {
            case 'char':
                return `for (let char_i = 0; char_i < String(${args.TEXT}).length; char_i++)\n { ${args.BRANCH1} \n}`;
            case 'word':
                return `for (let word_i = 0; word_i < String(${args.TEXT}).split(' ').length; word_i++)\n { ${args.BRANCH1} \n}`;
            default:
                return '';
        }
    }

    character (args: any) {
        switch (args.SELECT) {
            case 'char':
                return `String(${args.TEXT}).charAt(char_i)`;
            case 'word':
                return `String(${args.TEXT}).split(' ')[word_i]`;
            default:
                return '';
        }
    }
}

export default TextBlocks;