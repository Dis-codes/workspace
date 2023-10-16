<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import SideBar from "$lib/components/SideBar.svelte";
    import {storageStore} from "$lib/userStore";
    let settings = storageStore();
    function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = new Date(dateString).toLocaleString(undefined, options);

  const [date, time] = formattedDate.split(", ");
  const [day] = date.split(".");
  const [hour, minute] = time.split(":");
  
  return `${day} - ${hour}:${minute}`;
}
    </script>
    
    <NavBar /> 
    <SideBar>
        <div class="ml-40 mt-40">
            <h2 class="text-4xl font-bold">Home</h2>
            <div class="flex flex-col gap-4 mt-6">
                <a href="editor/new" class="btn btn-wide btn-primary">Create a new bot</a>
                <a href="editor/blockly/new?open=true" class="btn btn-wide btn-secondary">Open file</a>
            </div>
            <div class="mt-20 mb-2">
                <h3 class="text-xl">Recent</h3>
            </div>
            <div class="flex flex-col gap-4">
                <!-- recent should be done with github interaction, also localstorage, there is no other way -->
                {#if $settings["index.dsc"]?.blocks?.blocks.length > 0}
                <div class="w-96 h-16 bg-slate-700 px-2 flex flex-row justify-between rounded-lg">
                    <div>
                        <p class="font-bold">{$settings.settings.botName}</p>
                        <p class="text-sm mt-4">updated: {formatDate($settings.settings.updatedAt)}</p>
                    </div>
                    <a href="editor/blockly/new" class="btn btn-primary my-auto">Edit</a>
                </div>
                {:else}
                <div class="w-96 h-16 bg-slate-700 px-2 flex flex-row justify-between rounded-lg">
                    <div>
                        <p class="font-bold">No recent files</p>
                    </div>
                </div>
                {/if}
                <!-- <div class="w-96 h-16 bg-slate-700 px-2 flex flex-row justify-between rounded-lg">
                    <div>
                        <p class="font-bold">bot name</p>
                        <p class="text-sm mt-4">updated: 12.10.2023 - 18:24</p>
                    </div>
                    <div class="btn btn-primary my-auto">Edit</div>
                </div>
                <div class="w-96 h-16 bg-slate-700 px-2 flex flex-row justify-between rounded-lg">
                    <div>
                        <p class="font-bold">bot name</p>
                        <p class="text-sm mt-4">updated: 12.10.2023 - 18:24</p>
                    </div>
                    <div class="btn btn-primary my-auto">Edit</div>
                </div>
                <div class="w-96 h-16 bg-slate-700 px-2 flex flex-row justify-between rounded-lg">
                    <div>
                        <p class="font-bold">bot name</p>
                        <p class="text-sm mt-4">updated: 12.10.2023 - 18:24</p>
                    </div>
                    <div class="btn btn-primary my-auto">Edit</div>
                </div> -->
            </div>
        </div>
    </SideBar>
    