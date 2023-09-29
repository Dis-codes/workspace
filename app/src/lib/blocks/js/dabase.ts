import javascriptGenerator from '$lib/javascript';
import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class databaseBlocks {
    getRegistry () {
        return {
            id: "database",
            color: "#5aa48d",
            blocks: [
                {
                    func: "get",
                    text: "get [NAME] from [DATABASE]",
                    output: OutputType.ANY,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "set",
                    text: "set [NAME] as [VALUE] in [DATABASE]",
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
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "exists",
                    text: "[NAME] exists in [DATABASE]",
                    output: OutputType.BOOLEAN,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "delete",
                    text: "delete [NAME] from [DATABASE]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "all",
                    text: "get all data from [DATABASE]",
                    output: OutputType.ANY,
                    inline: true,
                    arguments: {
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "clear",
                    text: "delete all data in [DATABASE]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "push",
                    text: "push [VALUE] to [NAME] in [DATABASE]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        VALUE: {
                            type: InputShape.VALUE,
                        },
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "addsubstract",
                    text: "[A] [VALUE] to [NAME] in [DATABASE]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        A: {
                            type: InputShape.MENU,
                            options: [
                                ['add', 'add'],
                                ['subtract', 'subtract']
                            ]
                        },
                        VALUE: {
                            type: InputShape.VALUE,
                        },
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        DATABASE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }
                },
                {
                    func: "create_new",
                    text: "create new database with name [NAME]",
                    shape: BlockShape.FLOATING,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    }

                }
            ]
        };
    }

    set (args: any) {
        return `${args.DATABASE}.set(String(${args.VALUE}), "${args.NAME}")\n))`;
    }

    create_new (args: any) {
        return `const ${args.NAME} = new Database("./${args.NAME}.json")\n`;
    }

    get (args: any) {
        return `${args.DATABASE}.get(String(${args.NAME}))`;
    }

    exists (args: any) {
        return `${args.DATABASE}.has(String(${args.NAME}))`;
    }

    delete (args: any) {
        return `${args.DATABASE}.delete(String(${args.NAME}))`;
    }

    all (args: any) {
        return `${args.DATABASE}.all()`;
    }

    clear (args: any) {
        return `${args.DATABASE}.clear()`;
    }

    push (args: any) {
        return `${args.DATABASE}.push(String(${args.NAME}), ${args.VALUE})`;
    }

    addsubstract (args: any) {
        switch (args.A) {
            case 'add':
                return `${args.DATABASE}.add(String(${args.NAME}), ${args.VALUE})`;
            case 'subtract':
                return `${args.DATABASE}.subtract(String(${args.NAME}), ${args.VALUE})`;
            default:
                return '';
        }
    }
}

export default databaseBlocks;