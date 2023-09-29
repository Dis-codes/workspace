import javascriptGenerator from '$lib/javascript';
import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class TerminalBlocks {
    getRegistry () {
        return {
            id: "terminal",
            color: "#d3437b",
            blocks: [
                {
                    func: "log",
                    text: "log [TEXT] in console",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        TEXT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "clear_console",
                    text: "clear console",
                    shape: BlockShape.STATEMENT,
                },
                {
                    func: "prompt",
                    text: "prompt [TEXT] in console",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        TEXT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
            ]
        };
    }

    log(args: any) {
        return `console.log(${args.TEXT});`;
    }

    clear_console() {
        return `console.clear();`;
    }

    prompt(args: any) {
        return `console.prompt(${args.TEXT});`;
    }
}

export default TerminalBlocks;