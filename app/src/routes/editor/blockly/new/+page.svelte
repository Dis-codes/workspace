<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import { onMount, onDestroy } from "svelte";
    import Workspace from "./workspace.svelte";
    import JSZip from "jszip";
    import {storageStore} from "$lib/userStore";

    let settings = storageStore("notes");
    let sidebarOpen = true;
    let files = ["index.dsc"]; // Array of file names
    let activeFileIndex = 0; // Index of the active file
    let commands = []
    //get commands from settings all having .dsc except index.dsc
    for (const [key, value] of Object.entries($settings)) {
      if (key && key !== "index.dsc" && key.endsWith(".dsc")) {
        commands = [...commands, key];
      }
    }
    let addCommandText = "";
    function setActiveFile(file) {
        if (files.includes(file)) {
            activeFileIndex = files.indexOf(file);
        } else {
            files = [...files, file];
            activeFileIndex = files.length - 1;
        }
    }
  function closeFile(index) {
      // if (files.length === 1) {
      //   //files = ["index.dsc"];
      //   activeFileIndex = 0;
      //   return;
      // }
    files = files.filter((_, i) => i !== index);
    if (activeFileIndex >= index) {
      activeFileIndex = Math.max(0, activeFileIndex - 1);
    }
  }
  async function addCommand() {
    if (addCommandText.length > 0) {
      commands = [...commands, addCommandText + ".dsc"];
      addCommandText = "";
      addcommand.close();
    }
  }
 async function openFile() {
    console.log("open file");
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".dsc, .zip";
    input.onchange = (event: any) => {
        if (event.target.files[0].name.endsWith(".zip")) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async (event: any) => {
                const contents = event.target.result;
                try {
                  console.log("loading zip");
                    const zip = await JSZip.loadAsync(contents);
                    const workspaceFile = await zip.file("index.dsc")?.async("string");
                    console.log(workspaceFile);
                    if (!workspaceFile) {
                      console.log("no workspace file found");
                      return;
                    }
                    const state = JSON.parse(workspaceFile);
                    settings.update((s) => {
                        s["index.dsc"] = state;
                        return s;
                    });
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
                settings.update((s) => {
                    s["index.dsc"] = state;
                    return s;
                });
            } catch (error) {
                console.error("Error loading workspace:", error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}
  onMount(() => {
    // check if url has open=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("open") === "true") {
      openFile();
    }
  });
</script>

<div class="h-full w-full flex flex-col">
<div>
    <NavBar links={false}>
            <div class="flex flex-row gap-6 items-center">
            <button class="btn btn-square btn-neutral btn-sm" on:click={() => sidebarOpen = !sidebarOpen}><span class="material-symbols-outlined">menu</span></button>
            <h2 class="text-3xl font-bold">{$settings.settings.botName}</h2>
            <button class="btn btn-square btn-accent btn-sm"><span class="material-symbols-outlined">play_arrow</span></button>
        </div>
    </NavBar>
</div>

<div class="flex flex-row">
        {#if sidebarOpen}
        <div class="bg-base-200 w-80 h-screen">
            <div class="flex flex-col justify-between h-full">
            <div>
            <div class="mt-24 mb-4 px-4 flex flex-row justify-between items-center">
                <h2 class="text-3xl font-bold">Files</h2>
                <div class="">
                    <button on:click={() => addcommand.showModal()} class="btn btn-square btn-sm btn-neutral"><span class="material-symbols-outlined">note_add</span></button>
                    <button class="btn btn-square btn-sm btn-neutral"><span class="material-symbols-outlined">menu</span></button>
                </div>
            </div>
            <ul class="menu max-w-xs w-full">
                <li><button on:click={() => setActiveFile("index.dsc")}>
                    <span class="material-symbols-outlined">
                        deployed_code
                        </span>
                  index.dsc
                </button></li>
                <li>
                  <details open>
                    <summary>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                      commands
                    </summary>
                    <ul>
                      {#each commands as command}
                      <li class="flex flex-row items-center justify-between"><button on:click={() => setActiveFile(command)}>
                        <span class="material-symbols-outlined">deployed_code</span>
                        {command}
                      </button>
                      <div class="dropdown btn-square btn-sm justify-center">
                        <label tabindex="0"><span class="material-symbols-outlined">more_vert</span></label>
                        <ul tabindex="0" class="dropdown-content z-[99] menu p-2 shadow bg-base-100 rounded-box w-52 ml-10">
                          <li><button>Edit</button></li>
                        <li><button>Download</button></li>
                          <li><button class="text-red-500">Delete</button></li>
                        </ul>
                      </div></li>
                      {/each}
                    </ul>
                  </details>
                </li>
                <li><button>
                    <span class="material-symbols-outlined">
                        inventory_2
                        </span>
                  package.json
                </button></li>
                <li><button on:click={() => markdown.showModal()}>
                    <span class="material-symbols-outlined">
                        markdown
                        </span>
                    notes.md
                  </button></li>
              </ul>
              </div>
              <div class="flex flex-col">
              <div class="bg-gray-600 w-full h-32 grid grid-cols-4 gap-2 p-4">
                <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">settings</span></button>
                <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">bar_chart_4_bars</span></button>
                <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">encrypted</span></button>
                <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">group</span></button>
                <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">data_usage</span></button>
            </div>
            <a href="https://discodes.xyz/help" class="btn">help</a>
        </div>
            </div>
        </div>
        {/if}
        <div class="w-full h-full flex flex-col">
            {#if files.length > 0}
            <div class="mt-16 bg-gray-700 h-10 w-full flex items-center">
                <div class="flex flex-row ml-5">
                  {#each files as file, index (file)}
                    <div class="flex flex-row w-fit max-w-[12rem] gap-2">
                        <button on:click={() => setActiveFile(file)}><h3 class="text-2xl truncate  {index == activeFileIndex? "font-bold": ""}">{file}</h3></button>
                        <button on:click={() => closeFile(index)} class="btn btn-square btn-ghost btn-sm">
                          <span class="material-symbols-outlined">close</span>
                        </button>
                  </div>
                    <div class="divider divider-horizontal mx-0"></div>
                  {/each}
                </div>
              </div>
            {/if}
            <div class="flex-1">
                <div class="w-full {files.length > 0? "h-[54rem]" : "h-[56.5rem] mt-[4rem]"}">
                    <Workspace file={files[activeFileIndex]} />
                </div>
            </div>
          </div>
    </div>
</div>



<dialog id="markdown" class="modal scroll">
  <div class="modal-box max-w-full h-full">
    <h3 class="font-bold text-3xl text-white">Your notes for your bot</h3>
      <textarea class="mt-4  h-full w-full resize-none rounded-md p-2 overflow-auto max-h-[43rem]" placeholder="Write your notes here" bind:value={$settings["notes"]}></textarea>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="addcommand" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-3xl text-white">Give your new command a name</h3>
    <div class="flex justify-center mt-4">
      <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" bind:value={addCommandText} />
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary" on:click={() => addCommand()}>Submit</button>
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>