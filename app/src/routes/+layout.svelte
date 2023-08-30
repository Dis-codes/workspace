<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { user } from "$lib/userStore";
    import { page } from '$app/stores';  

    import RoleCheck from "$lib/components/RoleCheck.svelte";

    export let data
    export let isDev = import.meta.env.DEV
    const allowedUrls: Array<string> = ['/errors/permission', '/']

    let { supabase, session } = data
    $: ({ supabase, session } = data)
    
    onMount(() => {
        if (!session?.user) {
            if (window.location.hostname == "workspace.discodes.xyz") {
                window.location.href = "https://discodes.xyz/errors/session"
            }
        }
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



{#if $page.url.pathname == allowedUrls[0] || $page.url.pathname == allowedUrls[1] || isDev}
    <slot />

{:else}
<RoleCheck roleID={'1144641299748769864'} userID={$user?.user_metadata.provider_id}>
    <div class="min-h-screen flex flex-col">
    <slot/>
</div>
</RoleCheck>
{/if}
