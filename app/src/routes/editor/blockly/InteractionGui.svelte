<script lang="ts">
    import {persisted} from "$lib/localstorage";
    let settings = persisted('workspace')
    let commands = $settings.commands || [{name: "yey", description: "yey"}]
    let newCommand = {name: "", description: ""}
    $ : newCommand.name = newCommand.name.toLowerCase()
    $ : commands = $settings.commands || [{name: "yey", description: "yey"}]

    function addCommand() {
        if (newCommand.name.length < 4) return
        if (commands.find(c => c.name == newCommand.name)) return
        commands.push(newCommand)
        settings.update(s => {
            s.commands = commands
            return s
        })
        newCommand = {name: "", description: ""}
    }
  </script>
  
  <div class=" w-full h-screen">
    <div class="mt-20">
        <h2 class="font-bold text-3xl flex justify-center">Slash commands</h2>

        <div class="grid grid-cols-4 p-10 gap-10">
            {#each commands as command}
                <button class="btn h-20 w-80">
                    <div class="font-bold">{command.name}</div>
                    <div class="text-gray-400 text-xs">{command.description}</div>
                </button>
            {/each}
            <button class="btn h-20 w-80" on:click={() => newcmds.showModal()}>
            <div class="font-bold">Create a new command</div>
            <div class="text-gray-400 text-xs">click here to create a new command</div>
        </button>
    </div>
    </div>
</div>

<dialog id="newcmds" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-3xl text-white">Create a command</h3>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Command Name</span>
        </div>
        <input type="text" class="input input-bordered w-full" bind:value={newCommand.name} />
        <div class="label">
            {#if newCommand.name.length < 4}
            <span class="label-text-alt text-red-500">Name cannot be shorter than 3 characters</span>
            {/if}
        </div>
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Command description</span>
        </div>
        <input type="text" class="input input-bordered w-full" bind:value={newCommand.description} />
      </label>
      <div class="modal-action">
        <form method="dialog">
            <button class="btn" on:click={() => addCommand()}>Create</button>
            <button class="btn">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>