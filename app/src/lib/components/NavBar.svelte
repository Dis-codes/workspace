<script lang="ts">
    import Account from "./Account.svelte";
    import { user } from '$lib/userStore';
    let searchContent = '';
    export let links:boolean = true;
  </script>

<div class="navbar bg-base-200 fixed z-10 h-16">
  <div class="flex-1">
    <a href="/" class="btn btn-square btn-ghost">
      <img src="/Images/favicon1.png" alt="logo" class="w-full h-full rounded" />
    </a>
    <h2 class="ml-4 normal-case text-xl">DisCodes</h2>
    {#if !links}
    <div class="ml-6">
      <slot />
    </div>
    {/if}
  </div>
  {#if links}
    <div class="flex-auto">
      <slot />
    </div>
      

      <div class="flex-auto">
      <a class="btn btn-ghost normal-case no-animation" href="https://www.discodes.xyz/">Home page</a>
      <a class="btn btn-ghost normal-case no-animation mx-2" href="https://www.discodes.xyz/search/marketplace">Marketplace</a>
      <div class="dropdown w-64">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered input-sm w-full break-keep"
          bind:value={searchContent}
          maxlength="32"
          on:keydown={(event) => {
            if (event.key === "Enter") {
              window.location.href = `https://www.discodes.xyz/search/users?keyword=${searchContent}`;
            } else if (event.key === "Escape") {
              searchContent = "";
            }
          }}
        />

        {#if searchContent}
        <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
            <li><button on:click={() => window.location.href = `https://www.discodes.xyz/search/users?keyword=${searchContent}`}>Search <span class="truncate">{searchContent}</span> in people</button></li>
            <li><button on:click={() => window.location.href =`https://www.discodes.xyz/search/plugins/${searchContent}`}>Search <span class="truncate">{searchContent}</span> in plugins</button></li>
            <li><button on:click={() => window.location.href =`https://www.discodes.xyz/search/marketplace/${searchContent}`}>Search <span class="truncate">{searchContent}</span> in marketplace</button></li>
          </ul>
        {/if}
      </div>
    </div>
    {/if}
    <div class="flex-none">
      {#if $user}
        <a class="btn btn-ghost normal-case" href="https://www.discodes.xyz/dashboard">Dashboard</a>
        <Account />
      {:else}  
        <!-- <a class="btn btn-ghost normal-case" href="/login">Log In</a> -->
      {/if}
    </div>
  </div>
  <!-- <div class="mt-16 flex flex-col items-center">

  </div> -->

