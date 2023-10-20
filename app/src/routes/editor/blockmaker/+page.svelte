<script lang="ts">
    import { onMount } from "svelte";
    import { NavBar } from "$lib/components/Components";

    export let data;
    let { supabase, session } = data;
    $: ({ supabase, session } = data);
    $: {
        try {
            generator.set(JSON.parse(block))
            console.log("set generator", $generator)
        } catch (e) {
            console.log(e)
        }
        testCode()
    }
    import {generator} from "$lib/userStore";
    import Blockly from "blockly/core";
    import En from "blockly/msg/en";
    import { BlocklyTool } from "$lib/utils/blockRegistryTool";
    const BlockRegistryTool = new BlocklyTool();
    import javascriptGenerator from "$lib/javascript.js";
    import BlocklyComponent from "$lib/components/Blockly.svelte";
    import type { Abstract } from "blockly/core/events/events_abstract";

    import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';
    if (!$generator["func"]){
        console.log("no generator", $generator)
        generator.set({
"func": "myfunction",
"text": "Hello [ARGUMENT1] World!",
"inline": true,
"shape": BlockShape.STATEMENT,
"arguments": {
        "ARGUMENT1": {
            "type": InputShape.VALUE,
            "check": OutputType.ANY
            }} 
    })
    }
    const DarkTheme = Blockly.Theme.defineTheme("a", {
        name: "true_dark",
        base: Blockly.Themes.Classic,
        componentStyles: {
            workspaceBackgroundColour: "#0C111A",
            toolboxBackgroundColour: "#111827",
            toolboxForegroundColour: "#ffffff",
            flyoutBackgroundColour: "#111827",
            flyoutForegroundColour: "#cccccc",
            flyoutOpacity: 0.5,
            scrollbarColour: "#797979",
            insertionMarkerColour: "#ffffff",
            insertionMarkerOpacity: 0.3,
            scrollbarOpacity: 0.01,
            cursorColour: "#d0d0d0",
        },
    });
    // For styling the categories
    class CustomCategory extends Blockly.ToolboxCategory {
        /**
         * Constructor for a custom category.
         * @override
         */
        constructor(categoryDef: any, toolbox: any, opt_parent: any) {
            super(categoryDef, toolbox, opt_parent);
        }
        // /** @override */
        // addColourBorder_(colour:any) {
        //   this.rowDiv_.style.backgroundColor = colour;
        // }
    }
    Blockly.registry.register(
        Blockly.registry.Type.TOOLBOX_ITEM,
        Blockly.ToolboxCategory.registrationName,
        CustomCategory,
        true
    );

    const en = {
        rtl: false,
        msg: {
            ...En,
        },
    };
    let functionName = "myfunction";
    const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
    kind: "categoryToolbox",
    contents: [
        {
        id: "generated",
        kind: "category",
        expanded: true,
        name: "Generated Block",
        colour: "#5b80a5",
        contents: [{
        kind: "block",
        type: `test_myfunction`
        }
        ]
    }
    ]
}
    const config = {
        theme: DarkTheme,
        renderer: "zelos",
        collapse: false,
        disable: true,
        maxBlocks: 1,
        trashcan: false,
        horizontalLayout: false,
        rtl: false,
        grid: {
            spacing: 25,
            length: 2,
            colour: "#5c5a5a",
            snap: true,
        },
        toolbox,
    };

    let workspace: Blockly.WorkspaceSvg;
    onMount(() => {
        // dont close out instantly if changes were made
        let refreshValue: any = undefined;
        window.onbeforeunload = () => refreshValue;
        // according to blockly, event is type Abstract
        
        workspace.addChangeListener((event: Abstract) => {
            switch (event.type) {
                case Blockly.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE:
                case Blockly.Events.BLOCK_CREATE:
                case Blockly.Events.BLOCK_DELETE:
                case Blockly.Events.BLOCK_CHANGE:
                case Blockly.Events.BLOCK_DRAG:
                case Blockly.Events.BLOCK_MOVE:
                    refreshValue = "";
                    break;
                default:
                    console.log(event.type);
                    break;
            }
        });
    });
    
    // Define variables for selector values
    let testedCode = undefined
    let functionCode = `return args.ARGUMENT1 + " World!";` 
    let block = JSON.stringify($generator, null, 4)
    class Block {
        getRegistry() {
            return {
                id: "test",
                color: "%{BKY_VARIABLES_HUE}",
                blocks: [
                    $generator
                ],
            };
        }
        constructor() {
            this.getRegistry = this.getRegistry.bind(this);
        }
    }
    BlockRegistryTool.registerFromBlockset(new Block());
    //load workspace
    function testCode() {
        try {
            generator.set(JSON.parse(block))
            let code = `let args = {`
            for (const [key, value] of Object.entries($generator.arguments)) {
                code += `${key}: ${value.type == InputShape.VALUE ? "1" : "true"},`
            }
            code += `};`
            code += functionCode
            let func = new Function(code);
            testedCode = func();
        } catch (e) {
            testedCode = e;
        }
    }
</script>

<NavBar>
</NavBar>
<div class="flex flex-row h-screen">
    <div class="mt-[64px] w-full flex">
        <div class="w-full h-full">
            <BlocklyComponent {config} locale={en} bind:workspace />
        </div>
        <div class="w-full m-6">
            <!-- You can add more selectors as needed -->
            <h3 class="text-2xl font-bold">Block JSON</h3>
            <div>
                <div class="m-6">
                    <textarea class="textarea textarea-bordered w-full h-96 resize-none" placeholder="Bio" bind:value={block}></textarea>
                </div>
                <h3 class="text-2xl font-bold ">Function</h3>
                <pre class="m-6 textarea textarea-bordered">{`${$generator["func"]}(args: any){
    ${functionCode}
}`}</pre>
            </div>
            <h3 class="text-2xl font-bold">Console</h3>
            <div class="m-6">
                <textarea class="textarea textarea-bordered w-full resize-none" placeholder="Bio">{testedCode}</textarea>
                <button class="btn btn-primary mt-2" on:click={testCode}>Run</button>
            </div>
        </div>
    </div>
</div>
