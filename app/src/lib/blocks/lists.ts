import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class ListsBlocks {
    getRegistry() {
        return {
            id: "lists",
            color: "%{BKY_LISTS_HUE}",
            blocks: [
                {
                    func: "contains",
                    text: "[LIST] contains [ITEM]",
                    inline: true,
                    output: OutputType.BOOLEAN,
                    arguments: {
                        LIST: {
                            type: InputShape.VALUE,
                        },
                        ITEM: {
                            type: InputShape.VALUE,
                        },
                    },
                },
                //push
                {
                    func: "push",
                    text: "push [ITEM] to [LIST]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        LIST: {
                            type: InputShape.VALUE,
                        },
                        ITEM: {
                            type: InputShape.VALUE,
                        },
                    },
                },
                //concat
                {
                    func: "concat",
                    text: "Merge [LIST] with [ITEM]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        LIST: {
                            type: InputShape.VALUE,
                        },
                        ITEM: {
                            type: InputShape.VALUE,
                        },
                    },
                },
                //filter
                {
                    func: "filter",
                    text: "Filter [LIST] as [ITEM] with [CONDITION]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        LIST: {
                            type: InputShape.VALUE,
                        },
                        ITEM: {
                            type: InputShape.VALUE,
                        },
                        CONDITION: {
                            type: InputShape.VALUE, 
                        },
                    },
                },
                //map
                {
                    func: "map",
                    text: "Map [LIST] as [ITEM] with [CONDITION]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        LIST: {
                            type: InputShape.VALUE,
                        },
                        ITEM: {
                            type: InputShape.VALUE,
                        },
                        CONDITION: {
                            type: InputShape.VALUE, 
                        },
                    },
                },
            ],
        };
    }

    contains(args: any) {
        return `(${args.LIST}).includes(${args.ITEM})`;
    }

    push(args: any) {
        return `(${args.LIST}).push(${args.ITEM})`;
    }

    concat(args: any) {
        return `(${args.LIST}).concat(${args.ITEM})`;
    }

    filter(args: any) {
        return `(${args.LIST}).filter(${args.ITEM} => ${args.CONDITION})`;
    }

    map(args: any) {
        return `(${args.LIST}).map(${args.ITEM} => ${args.CONDITION})`;
    }
}

export default ListsBlocks;
