<script lang="ts">
    import { onMount } from 'svelte';
    import { Loading } from "$lib/components/Components";
    export let data
    const { session,supabase } = data
  
    onMount(async () => {
      if (!session) window.location.href = '/';
      const { error } = await supabase.auth.signOut();
      if (!error) {
       window.location.href = '/';
       return
      }
      window.location.href = `/errors/logout`;
    });
  </script>
  
  <Loading />