class BlockSet {
    /**
     * Details for this blockset and its blocks.
     * View utils/blockRegistryTool.ts for more info.
     */
    getRegistry() {
        return {
            id: "base", // prefix for all block IDs in this blockset
            color: 60, // color for all blocks in this blockset (unless the block overwrites it)
            /**
            * Array of blocks.
            * This defines how the blocks will be shaped and their functionality.
            * View blocks/base.ts for more info.
            */
            /*
                Example:

                {
                    // manual will just ask for a function name
                    // this is if you want to skip all the "easy block maker" stuff
                    // and just make a new block with blockly by itself
                    // leave this out if you want to use the easier block stuff
                    // manual: "manualFunction",

                    func: "blockFunction", // function name (also used as the block's ID)
                    text: "text [INPUT]", // block text (brackets denote an input)
                    // note: if text is an array and the block has branches,
                    // items after the first will appear below those branch inputs.

                    // you can also use \n in the text to place a dummy input to move the text down a line.

                    // output blocks should use OutputType and put it in "output"
                    output: OutputType.STRING,

                    // normal blocks should use BlockShape and put it in "shape"
                    // view utils/blockRegistryTool.ts for more
                    shape: BlockShape.STATEMENT,
                    
                    // note: "output" and "shape" shouldnt be used at the same time
                    // either use one or the other
                    
                    // how many statement inputs are on this block
                    // these inputs can be accessed with "BRANCH(number)" when exporting
                    branches: 1,
                    
                    // overwrites the base registry color for this block (not required)
                    color: "#ff0000",
                    
                    // whether to use inline inputs or not (not required)
                    inline: false,
                    
                    // tooltip for this block (not required)
                    tooltip: 'bla bla',
                    // help url for this block (not required)
                    url: '',

                    // block inputs:
                    arguments: {
                        // the text inbetween brackets
                        // undefined arguments will default to "VALUE" inputs
                        INPUT: {
                            type: InputShape.TEXT, // the input shape / field for this input
                            // below are just options that this field has
                            text: "field",
                            spellcheck: true
                        }
                    }
                }
            */
            blocks: []
        };
    }
}

export default BlockSet;