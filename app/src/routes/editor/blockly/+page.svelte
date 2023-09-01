<script lang="ts">
    import { onMount } from "svelte";
    import { NavBar, AuthCheck } from "$lib/components/Components";

    export let data;
    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    import Blockly from "blockly/core";
    import toolbox from "$lib/toolbox";
    import En from "blockly/msg/en";
    import "blockly/blocks";

    import BlocklyComponent from "$lib/components/Blockly.svelte";
    import type { Abstract } from "blockly/core/events/events_abstract";
    import { BlocklyTool } from "$lib/utils/blockRegistryTool";
    import javascriptGenerator from "$lib/javascript.js";

    const BlockRegistryTool = new BlocklyTool();
    // register blocks
    import TestBlocks from "$lib/blocks/test";
    import TextBlocks from "$lib/blocks/text";
    BlockRegistryTool.registerFromBlockset(new TestBlocks());
    BlockRegistryTool.registerFromBlockset(new TextBlocks());

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

    const config = {
        theme: DarkTheme,
        renderer: "zelos",
        collapse: true,
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        rtl: false,
        grid: {
            spacing: 25,
            length: 7,
            colour: "#5c5a5a77",
            snap: true,
        },
        zoom: {
            controls: true,
            startScale: 0.9,
            maxScale: 5,
            minScale: 0.1,
            scaleSpeed: 1.2,
        },
        toolbox,
        move: {
            scrollbars: {
                horizontal: true,
                vertical: true,
            },
            drag: true,
            wheel: true,
        },
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
                    // empty string disables reloading
                    refreshValue = "";
                    break;
            }
        });
    });

    function copyCode() {
        const code = javascriptGenerator.workspaceToCode(workspace);
        console.log(code);
        navigator.clipboard.writeText(code);
    }
</script>

<NavBar>
    <button on:click={copyCode}>Copy Code</button>
</NavBar>
<div class="flex flex-col items-center justify-center h-screen">
    <div class="mt-[64px] w-full h-full">
        <BlocklyComponent {config} locale={en} bind:workspace />
    </div>
</div>
