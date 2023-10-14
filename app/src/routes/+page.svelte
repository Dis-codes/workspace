<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import SideBar from "$lib/components/SideBar.svelte";
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
                </div>
            </div>
        </div>
    </SideBar>
    