<script lang="ts">
    import { goto } from "$app/navigation";
    import {persisted} from "$lib/localstorage";
    let storage = persisted('workspace');
    storage.set({
    "index.dsc": {},
    settings: {
        botName: "Mys Bot",
        botDescription: "My Bot Description",
        updatedAt: new Date().toISOString(),
        secrets: {
            token: "HELLO",
            test: "TEST",
        }
    },
    notes: "",
});
</script>

<div class="flex flex-col md:flex-row justify-center items-center h-screen gap-10">
    <button on:click={() => goto('/editor/blockly/new')}>
    <div class="card card-compact w-96 bg-base-100 shadow-xl mb-10 h-[360px] border border-neutral hover:border-white hover:-translate-y-5 
    duration-150">

    <figure><img src="https://cdn.discordapp.com/attachments/977890124912279563/1146103029741928559/image.png" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">Blockly</h2>
        <p>Use scratch-like blocks to design your very own bot!</p>
        <div class="card-actions justify-end">
            <!-- <button class="btn btn-primary">Create Command</button> -->

        </div>
    </div>
    </div>
</button>

    <div class="card card-compact w-96 bg-base-100 shadow-xl mb-10 h-[360px] border border-neutral hover:border-white hover:-translate-y-5 
    duration-150">
        <figure><img src="https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">Comming soon!</h2>
            <p>It's a secret for now</p>
            <div class="card-actions justify-end">
                <!-- <button class="btn btn-primary">Create Command</button> -->
            </div>
        </div>
    </div>
</div>

<style>
</style>