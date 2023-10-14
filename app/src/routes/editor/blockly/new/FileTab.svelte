<script>
    export let fileName;
    export let isActive;
    export let onClose;
  </script>
  
  <div class="flex flex-row w-fit max-w-[12rem] gap-2">
    <h3 class="text-2xl truncate">{fileName}</h3>
      <button on:click={onClose} class="btn btn-square btn-ghost btn-sm">
        <span class="material-symbols-outlined">close</span>
      </button>
  </div>
  