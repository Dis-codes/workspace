<script lang='ts'>
    import { goto } from "$app/navigation";
    import { user } from "$lib/userStore";
    import { onMount } from "svelte";
</script>

{#if $user}
    <slot/>
{:else}
{onMount(() => goto('/errors/login'))}
{/if}