<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { user } from "$lib/userStore";
    import { page } from '$app/stores';  

    import RoleCheck from "$lib/components/RoleCheck.svelte";

    export let data

    const allowedUrls: Array<string> = ['/errors/permission', '/']

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    onMount(() => {
        const {
        data: { subscription },
        } = supabase.auth.onAuthStateChange((event, _session) => {
        if (_session?.expires_at !== session?.expires_at) {
            invalidate('supabase:auth')
        }
        })

        return () => subscription.unsubscribe()
    });

</script>

<svelte:head>
	<title>Discodes</title>
</svelte:head>



{#if $page.url.pathname == allowedUrls[0] || $page.url.pathname == allowedUrls[1]}
    <slot />

{:else}
<RoleCheck roleID={'1139658510343344291'} userID={$user.user_metadata.provider_id}>
    <div class="min-h-screen flex flex-col">
    <slot/>
</div>
</RoleCheck>
{/if}
