<!-- <script lang="ts">
    import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'
    import { onMount } from 'svelte';
    export let data
    onMount(async () => {
    if (data.session) {
        window.location.href = '/'
    }
})
</script>
<div class="flex flex-col items-center justify-center h-screen">
<Auth
supabaseClient={data.supabase}
appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
providers={['discord']}
redirectTo={`${data.url}/auth/callback`}
showLinks={false}
onlyThirdPartyProviders={true}
/>
</div> -->

<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {goto('/')})
</script>