<script lang='ts'>
    export let roleID:string;
    export let userID:any;

    import { goto } from "$app/navigation";
    import { GetUserRoles } from 'discodes-utilities';
    import Loading from "./Loading.svelte";

    let discordUser:any = GetUserRoles(userID)
</script>


{#await discordUser}
    <Loading/>
{:then roles} 
{#if roles.includes(roleID)}
    <slot/>
{:else}
{ goto('/errors/permission')}
{/if}
{/await}

