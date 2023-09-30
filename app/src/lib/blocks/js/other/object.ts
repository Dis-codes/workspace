import javascriptGenerator from '$lib/javascript';
import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class ObjectBlocks {
    getRegistry () {
        return {
            id: "objects",
            color: "#bc4c94",
            blocks: [
                {
                    func: "create",
                    text: "create object with\n",
                    branches: 1,
                    output: OutputType.OBJECT,
                    inline: true,
                },
                {
                    func: "add_to_object",
                    text: "add [NAME] with value [VALUE]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.TEXT,
                        },
                        VALUE: {
                            type: InputShape.VALUE,
                        },
                    }
                },
                {
                    func: "create_empty",
                    text: "create empty object",
                    output: OutputType.OBJECT,
                },
                {
                    func: "add",
                    text: "add [NAME] with value [VALUE] to [OBJECT]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        VALUE: {
                            type: InputShape.VALUE,
                        },
                        OBJECT: {
                            type: InputShape.VALUE,
                        }
                    }
                },
                {
                    func: "set",
                    text: "set [NAME] to [VALUE] in [OBJECT]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        VALUE: {
                            type: InputShape.VALUE,
                        },
                        OBJECT: {
                            type: InputShape.VALUE,
                        }
                    }
                },
                {
                    func: "get",
                    text: "get [NAME] from [OBJECT]",
                    output: OutputType.ANY,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        OBJECT: {
                            type: InputShape.VALUE,
                        }
                    }
                },
                {
                    func: "has",
                    text: "[OBJECT] has [NAME]?",
                    output: OutputType.BOOLEAN,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        OBJECT: {
                            type: InputShape.VALUE,
                        }
                    }
                },
                {
                    func: "delete",
                    text: "delete [NAME] from [OBJECT]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        OBJECT: {
                            type: InputShape.VALUE,
                        }
                    }
                },

            ]
        };
    }

    create_empty() {
        return `({})`;
    }

    add_to_object(args: any) {
        return `${args.NAME}: ${args.VALUE},\n`;
    }

    create(args: any) {
        return `({${args.BRANCH1}})`;
    }

    add(args: any) {
        return `${args.OBJECT}.${args.NAME} = ${args.VALUE};`;
    }

    set(args: any) {
        return `${args.OBJECT}.${args.NAME} = ${args.VALUE};`;
    }

    get(args: any) {
        return `${args.OBJECT}.${args.NAME}`;
    }

    has(args: any) {
        return `${args.OBJECT}.${args.NAME} !== undefined`;
    }

    delete(args: any) {
        return `delete ${args.OBJECT}.${args.NAME};`;
    }
}

export default ObjectBlocks;