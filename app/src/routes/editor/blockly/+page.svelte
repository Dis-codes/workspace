<script lang="ts">
    //Components
    import { onMount } from "svelte";
    import { NavBar, AuthCheck } from "$lib/components/Components";
    import {storageStore} from "$lib/userStore";
    let storage = storageStore("workspace")
    // Supabase - sync session
    export let data;
    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    // Blockly
    import Blockly from "blockly/core";
    import toolbox from "$lib/toolbox";
    import En from "blockly/msg/en";
    import "blockly/blocks";

    import BlocklyComponent from "$lib/components/Blockly.svelte";
    import type { Abstract } from "blockly/core/events/events_abstract";
    import javascriptGenerator from "$lib/javascript.js";
    import  {packageJson, indexJs}  from "$lib/components/defaults";
    import "./blockRegister"
    import {test }from "$lib/components/examples";

    // better code export
    import Prism from 'prismjs';
    import * as prettier from "prettier";
    import * as prettierPluginBabel from "prettier/plugins/babel";
    import * as prettierPluginEstree from "prettier/plugins/estree";
    import * as prettierPluginHtml from "prettier/plugins/html";

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

    
        if ($storage?.blocks?.blocks && $storage.blocks.blocks.length > 0) {
        console.log("workspace found");
        Blockly.serialization.workspaces.load($storage, workspace);  
    } else {
        console.log("no workspace found");
        noworkspace.showModal();
        //modal to choose file

    }
    function saveWorkspace() {
    const state = Blockly.serialization.workspaces.save(workspace)
    if (state && state?.blocks && state?.blocks?.length > 0) {
        storage.set(state);
        console.log("workspace saved");
    }
}
   // setInterval(saveWorkspace, 30000);
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

<NavBar>
    <div class="dropdown">
        <label tabindex="0" class="btn m-1">File</label>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><button on:click={openFile}>Open a file</button></li>
          <li><button on:click={exportJS}>Export to JavaScript</button></li>
          <li><button on:click={saveFile}>Save a file</button></li>
          <li><button on:click={downloadFiles}>Download bot</button></li>
          <div class="divider">Edit</div>
          <li><button on:click={deleteUnusedBlocks}>Delete unused blocks</button></li>
          <!-- <li><button on:click={workspace.cleanUp()}>Clean up blocks</button></li> -->
        </ul>
      </div>
      <div class="dropdown">
        <label tabindex="0" class="btn m-1">Examples</label>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="https://www.discodes.xyz/search/marketplace" target="_blank">Shared code </a></li>
          <div class="divider">Build-in</div>
            <li><button on:click={()=>openExample(test)}>Test</button></li>
        </ul>
      </div>
      <div class="dropdown">
        <label tabindex="0" class="btn m-1">Links</label>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="https://discord.gg/TsQPMrNyBv">Discord Server</a></li>
          <li><a href="https://github.com/Dis-codes">Github Organization</a></li>
          <li><a href="https://www.discodes.xyz/help/">Help</a></li>
        </ul>
      </div>
</NavBar>
<div class="flex flex-col items-center justify-center h-screen">
    <div class="mt-[71px] w-full h-full">
        <BlocklyComponent {config} locale={en} bind:workspace />
    </div>
</div>

<dialog id="showjs" class="modal scroll">
    <div class="modal-box max-w-full  h-full">
      <h3 class="font-bold text-3xl text-white">JavaScript code of your bot</h3>
      <div class="bg-gray-300 w-full mt-4 h-full max-h-[43rem] rounded-md p-4 overflow-auto">
        <pre><code>
            {@html Prism.highlight(generatedCode, Prism.languages['javascript'])}
        </code> </pre>
     </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-primary " on:click={copyCode}>Copy Code to Clipboard</button>
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
</dialog>

<!-- dialog for no workspace -->
<dialog id="noworkspace" class="modal scroll">
    <div class="modal-box">
        <h3 class="font-bold text-3xl">No workspace found</h3>
        <h2 class="font-bold text-xl">Looks like you don´t have any saved file, want to open one?</h2>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary " on:click={openFile}>Open a file</button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
</dialog>