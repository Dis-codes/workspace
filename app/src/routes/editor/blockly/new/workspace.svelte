<script lang="ts">
    //Components
    import { onMount } from "svelte";
    import { NavBar, AuthCheck } from "$lib/components/Components";
    import {storageStore} from "$lib/userStore";
    // Supabase - sync session
    // export let data;
    // let { supabase, session } = data;
    // $: ({ supabase, session } = data);
    
    // Blockly
    import Blockly from "blockly/core";
    import toolbox from "$lib/toolbox";
    import En from "blockly/msg/en";
    import "blockly/blocks";
    
    import BlocklyComponent from "$lib/components/Blockly.svelte";
    import type { Abstract } from "blockly/core/events/events_abstract";
    import javascriptGenerator from "$lib/javascript.js";
    import  {packageJson, indexJs}  from "$lib/components/defaults";
    import "../blockRegister"
    import {test }from "$lib/components/examples";
    
    // better code export
    import Prism from 'prismjs';
    import * as prettier from "prettier";
    import * as prettierPluginBabel from "prettier/plugins/babel";
    import * as prettierPluginEstree from "prettier/plugins/estree";
    import * as prettierPluginHtml from "prettier/plugins/html";
    export let file = "index.dsc";
    let storage = storageStore(file)
    // Other
    import JSZip from "jszip";
    
    let generatedCode = ``;
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
            length: 3,
            colour: "#5c5a5a",
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

    
        if ($storage[file]?.blocks?.blocks && $storage[file]?.blocks.blocks.length > 0) {
        console.log("workspace found");
        Blockly.serialization.workspaces.load($storage[file], workspace);  
    } else {
        console.log("no workspace found");
    }
    function saveWorkspace() {
    console.log("saving workspace");
    const state = Blockly.serialization.workspaces.save(workspace);
    storage.update((s) => {
        s[file] = state;
        return s;
    });
    // if (state  && state?.blocks?.blocks?.length > 0) {
    //     console.log("workspace saved");
    // }
}
  setInterval(saveWorkspace, 10000);
});


    async function copyCode() {
        navigator.clipboard.writeText(await generateCode());
    }
    function openExample(example: any){
        Blockly.serialization.workspaces.load(example, workspace);
    }
    function openFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".dsc, .json, .zip";
    input.onchange = (event: any) => {
        if (event.target.files[0].name.endsWith(".zip")) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async (event: any) => {
                const contents = event.target.result;
                try {
                    const zip = await JSZip.loadAsync(contents);
                    const workspaceFile = await zip.file("workspace.dsc")?.async("string");
                    if (workspaceFile) {
                        const state = JSON.parse(workspaceFile);
                        Blockly.serialization.workspaces.load(state, workspace);
                    }
                } catch (error) {
                    console.error("Error loading workspace:", error);
                }
            };
            reader.readAsArrayBuffer(file);
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const contents = event.target.result;
            try {
                const state = JSON.parse(contents);
                Blockly.serialization.workspaces.load(state, workspace);
            } catch (error) {
                console.error("Error loading workspace:", error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function saveFile() {
    const state = Blockly.serialization.workspaces.save(workspace);
    const data = JSON.stringify(state);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const fileName = "workspace.dsc";
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    
    URL.revokeObjectURL(url);
}

    function updatePackage(){
        const allBlocks = workspace.getAllBlocks();
        for (const block of allBlocks) {
            switch (block.type) {
                case "blockname" :
                packageJson.dependencies["moment"] = "^2.29.1"
                    continue;
                default:
                    continue;
            }
        }
    }
    async function generateCode() {
        let code = indexJs + javascriptGenerator.workspaceToCode(workspace);
        try {
            code = await prettier.format(code, { semi: true, parser: "babel", plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],});
        } catch (error) {
            code = `\nError exporting code: ${error.message}`; // TODO: show this in a dialog
        }
        return code;
    }
    async function exportJS() {
        generatedCode = await generateCode();
        const dialog:any = document.getElementById("showjs");
        dialog.showModal();	
    }
    async function downloadFiles() {
        updatePackage()
        const zip = new JSZip();
        zip.file("index.js", await generateCode());
        zip.file("package.json", JSON.stringify(packageJson, null, 2));
        zip.file("README.md", "# Bot created with DisCodes Blockly\n ## How to use\n 1. Install the dependencies with `npm install`\n 2. Run the bot with `node index \n ## Help \n If you need help, join our [Discord server](https://discord.gg/TsQPMrNyBv)\n ## Credits \n This bot was created with [DisCodes](https://www.discodes.xyz)`");
        zip.file("workspace.dsc", JSON.stringify(Blockly.serialization.workspaces.save(workspace), null, 2));
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bot.zip";
        a.click();
        URL.revokeObjectURL(url);
    }
    function deleteUnusedBlocks() {
        const allBlocks = workspace.getAllBlocks(true);
        for (const block of allBlocks) {
            if (!block.isEnabled()) {
                block.dispose(false, true);
            }
        }
    }
</script>
  
<div class="flex flex-col items-center justify-center h-full">
    <div class="w-full h-full">
        <BlocklyComponent {config} locale={en} bind:workspace />
    </div>
</div>