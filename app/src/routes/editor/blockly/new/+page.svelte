<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import { onMount, onDestroy } from "svelte";
    import Workspace from "./workspace.svelte";
    import JSZip from "jszip";
    import {persisted} from "$lib/localstorage";
    let settings = persisted('workspace')
    let sidebarOpen = true;
    let files = ["index.dsc"]; // Array of file names
    let activeFileIndex = 0; // Index of the active file
    let commands = []
    let page = "envs"
    let showSecrets = []
    let changeSecret = []
    let oldSecret = null
    const toggleVisibility = (i) => {
    showSecrets[i] = !showSecrets[i]
  };
    let secrets = JSON.stringify($settings.settings.secrets)
    function saveSecrets(){
      try {
        $settings.settings.secrets = JSON.parse(secrets)
        settings.set($settings)
      } catch (error) {
        alert("Invalid JSON")
      }
    }
    function updateEnv(index){
      if (index === -1){
        changeSecret = ["", ""]
      }
      else changeSecret = Object.entries($settings.settings.secrets)[index]
      oldSecret = changeSecret[0]
      changeenv.showModal()
    }
    function editEnv(){
      settings.update((s) => {
        s.settings.secrets[changeSecret[0]] = changeSecret[1]
         if(oldSecret !== changeSecret[0]){  delete s.settings.secrets[oldSecret]}
        return s;
      });
      changeSecret = []
      secrets = JSON.stringify($settings.settings.secrets)
    }
    function SecretsDelete(key){
      settings.update((s) => {
        delete s.settings.secrets[key]
        return s;
      });
      secrets = JSON.stringify($settings.settings.secrets)
    }
    for (const [key, value] of Object.entries($settings)) {
      if (key && key !== "index.dsc" && key.endsWith(".dsc")) {
        commands = [...commands, key];
      }
    }
    let addCommandText = "";
    function setActiveFile(file) {
      page = undefined
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
  function downloadCmd(command) {
    const data = JSON.stringify($settings[command]);

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const fileName = command;
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    
    URL.revokeObjectURL(url);
  }
  function deleteCmd(command) {
    if (files.includes(command)) {
      closeFile(files.indexOf(command));
    }
    commands = commands.filter((cmd) => cmd !== command);
      settings.update((s) => {
      s[command] = undefined;
      return s;
    });
  }
  function openFile(){
   alert("open single file...")
  }
  function copyText(text) {
    navigator.clipboard.writeText(text);
  }	
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
                  <button on:click={() => openFile()} class="btn btn-square btn-sm btn-neutral"><span class="material-symbols-outlined">attach_file_add</span></button>
                    <button on:click={() => addcommand.showModal()} class="btn btn-square btn-sm btn-neutral"><span class="material-symbols-outlined">note_add</span></button>
                    <button class="btn btn-square btn-sm btn-neutral"><span class="material-symbols-outlined">menu</span></button>
                </div>
            </div>
            <ul class="menu max-w-xs w-full">
                <li class="flex flex-row items-center justify-between"><button on:click={() => setActiveFile("index.dsc")}>
                    <span class="material-symbols-outlined">
                        deployed_code
                        </span>
                  index.dsc
                </button><div class="dropdown btn-square btn-sm justify-center">
                  <label tabindex="0"><span class="material-symbols-outlined">more_vert</span></label>
                  <ul tabindex="0" class="dropdown-content z-[99] menu p-2 shadow bg-base-100 rounded-box w-52 ml-10">
                  <li><button on:click={() => downloadCmd("index.dsc")}>Download</button></li>
                    <li><button class="text-red-500" on:click={() => deleteCmd("index.dsc")}>Clear workspace</button></li>
                  </ul>
                </div></li>
                <li>
                  <details open>
                    <summary>
                      <span class="material-symbols-outlined">
                        folder_open
                        </span>
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
                        <li><button on:click={() => downloadCmd(command)}>Download</button></li>
                          <li><button class="text-red-500" on:click={() => deleteCmd(command)}>Delete</button></li>
                        </ul>
                      </div></li>
                      {/each}
                    </ul>
                  </details>
                </li>
                <!-- <li><button>
                    <span class="material-symbols-outlined">
                        inventory_2
                        </span>
                  package.json
                </button></li> -->
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
                <button on:click={() => page = "settings"} class="btn btn-square btn-neutral"><span class="material-symbols-outlined">settings</span></button>
                <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">bar_chart_4_bars</span></button>
                <button on:click={() => page = "envs"} class="btn btn-square btn-neutral"><span class="material-symbols-outlined">encrypted</span></button>
                <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">group</span></button>
                <button on:click={() => page = "usage"} class="btn btn-square btn-neutral"><span class="material-symbols-outlined">data_usage</span></button>
            </div>
            <a href="https://discodes.xyz/help" class="btn">help</a>
        </div>
            </div>
        </div>
        {/if}
        <div class="w-full h-full flex flex-col">
          {#if !page}
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
            {:else if page === "settings"}
            <div class=" w-full h-screen">
              <div class="mt-16 p-10">
                <div class="bg-gray-700 w-60 h-96 rounded-2xl p-6">
                    <h2 class="font-bold text-xl">Bot Information</h2>
                    <p>Bot Name: </p>
                    <input type="text" class="input input-bordered w-full max-w-xs" bind:value={$settings.settings.botName} maxlength=20/>
                    <p>Bot Description: </p>
                    <!-- <input type="text" class="input input-bordered w-full max-w-xs h-20" bind:value={$settings.settings.botDescription} /> -->
                    <textarea class="textarea textarea-bordered w-full h-52 resize-none" placeholder="Description" bind:value={$settings.settings.botDescription} maxlength=140></textarea>
                </div>
              </div>
            </div>
            {:else if page === "dashboard"}
            <p>dashboard</p>
            {:else if page === "envs"}
            <div class=" w-full h-screen">
              <div class="mt-16 p-10">
                <div class="flex flex-row justify-between">
                  <h3 class="font-bold text-2xl">Secrets</h3>
                  <div class="flex gap-2">
                    <button on:click={() => editenv.showModal()} class="btn btn-neutral btn-sm"><span class="material-symbols-outlined">data_object</span>Edit as JSON</button>
                    <a href="https://discodes.xyz/help" class="btn btn-neutral btn-sm"><span class="material-symbols-outlined">menu_book</span>Docs</a>
                    <button on:click={() => updateEnv(-1)} class="btn btn-neutral bg-blue-500 text-white btn-sm"><span class="material-symbols-outlined">add</span>new Secret</button>
                  </div>
                </div>
                <div class="mt-4 grid grid-cols-1 gap-2">
                  {#if $settings?.settings?.secrets && Object.keys($settings?.settings?.secrets).length > 0}
                  {#each Object.entries($settings?.settings?.secrets) as [key, value], index (key)}
                  <div class="flex flex-row justify-between gap-2 items-center">
                    <div class="flex flex-row gap-2 w-full">
                      <div class="bg-gray-700 w-full rounded-lg p-1 flex gap-2">
                        <button on:click={copyText(key)}><span class="material-symbols-outlined">content_copy</span></button>
                        <p class="font-bold">{key}</p>
                      </div>
                      <div class="bg-gray-700 w-full rounded-lg p-1 flex gap-2 justify-between">
                        <div class="flex gap-2">
                          <button on:click={copyText(value)}><span class="material-symbols-outlined">content_copy</span></button>
                          {#if showSecrets[index]}
                          <input
                            type="text"
                            class="font-bold bg-gray-700"
                            bind:value={value}
                            disabled
                          />
                        {:else}
                          <input
                            type="password"
                            class="font-bold bg-gray-700"
                            bind:value={value}
                            disabled
                          />
                        {/if}
                        </div>
                        <label for="toggle{index}"><span class="material-symbols-outlined">{showSecrets[index] ? "visibility_off" : "visibility"}</span></label>
                        <input id="toggle{index}" class="hidden" type="checkbox" on:click={() => toggleVisibility(index)}>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button on:click={() => updateEnv(index)} class="btn btn-neutral btn-sm"><span class="material-symbols-outlined">edit</span></button>
                      <button on:click={() => SecretsDelete(key)} class="btn btn-neutral btn-sm"><span class="material-symbols-outlined">delete</span></button>
                    </div>
                  </div>
                  <div class="divider divider-horizontal"></div>
                  {/each}       
                  {/if}     
              </div>
            </div>
          </div>
            {:else if page === "coop"}
            <p>coop</p>
            {:else if page === "usage"}
            <p>usage</p>
            {/if}
          </div>
    </div>
</div>



<dialog id="markdown" class="modal scroll">
  <div class="modal-box max-w-full h-full">
    <h3 class="font-bold text-3xl text-white">Your notes for your bot</h3>
      <textarea class="mt-4  h-full w-full resize-none rounded-md p-2 overflow-auto max-h-[43rem]" placeholder="Write your notes here" bind:value={$settings["notes"]} maxlength=2000></textarea>
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

<dialog id="editenv" class="modal scroll">
  <div class="modal-box">
    <h3 class="font-bold text-3xl text-white">Raw Secrets Editor</h3>
    <p>Secrets are specified in JSON. Values must be strings.</p>
      <textarea class="mt-4 resize-none w-full rounded-md p-2 overflow-auto h-fit" placeholder="Write your envs here" bind:value={secrets}></textarea>
    <div class="modal-action">
      <form method="dialog">
        <button on:click={saveSecrets} class="btn btn-primary">Save</button>
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="changeenv" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-3xl text-white">Change key and value of your secret</h3>
    <div class="flex justify-center mt-4 gap-4">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Key</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"  bind:value={changeSecret[0]}/>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Token</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" bind:value={changeSecret[1]} />
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary" on:click={() => editEnv()}>Submit</button>
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>