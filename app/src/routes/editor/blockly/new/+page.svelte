<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    let sidebarOpen = true;
</script>

<div class="h-full w-full flex flex-col">
<div>
    <NavBar links={false}>
            <div class="flex flex-row gap-6 items-center">
            <button class="btn btn-square btn-neutral btn-sm" on:click={() => sidebarOpen = !sidebarOpen}><span class="material-symbols-outlined">menu</span></button>
            <h2 class="text-3xl font-bold">Bot name</h2>
            <button class="btn btn-square btn-accent btn-sm"><span class="material-symbols-outlined">play_arrow</span></button>
        </div>
    </NavBar>
</div>

<div class="flex flex-row">
        {#if sidebarOpen}
        <div class="bg-base-200 w-80 h-screen">
            <div class="flex flex-col justify-between h-full">
            <div>
            <div class="mt-24 mb-4 px-4 flex flex-row justify-between">
                <h2 class="text-3xl font-bold">Files</h2>
                <div>
                    <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">note_add</span></button>
                    <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">folder</span></button>
                    <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">menu</span></button>
                </div>
            </div>
            <ul class="menu max-w-xs w-full">
                <li><a>
                    <span class="material-symbols-outlined">
                        deployed_code
                        </span>
                  index.dsc
                </a></li>
                <li>
                  <details open>
                    <summary>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                      commands
                    </summary>
                    <ul>
                      <li><a>
                        <span class="material-symbols-outlined">
                            deployed_code
                            </span>
                        message.dsc
                      </a></li>
                      <li><a>
                        <span class="material-symbols-outlined">
                            deployed_code
                            </span>
                        interaction.dsc
                      </a></li>
                    </ul>
                  </details>
                </li>
                <li><a>
                    <span class="material-symbols-outlined">
                        inventory_2
                        </span>
                  package.json
                </a></li>
                <li><a>
                    <span class="material-symbols-outlined">
                        markdown
                        </span>
                    notes.md
                  </a></li>
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
            <div class="mt-16 bg-gray-700 h-10 w-full flex items-center">
                <div class="flex flex-row">
                    <div class="flex flex-row w-40 justify-between">
                        <h3 class="text-2xl truncate">index.dsc</h3>
                        <button class="btn btn-square btn-ghost btn-sm"><span class="material-symbols-outlined">close</span></button>
                    </div>
                    <div class="divider divider-horizontal"></div>
                    <button class="btn btn-square btn-ghost btn-sm"><span class="material-symbols-outlined">add</span></button>
                </div>
            </div>
            <div class="flex m-auto mt-96">
                WORKSPACE
            </div>
        </div>
    </div>
</div>