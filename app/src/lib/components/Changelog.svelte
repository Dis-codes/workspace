<script>
    export let logs = [
      { name: "Awesome mountain!", image: "https://picsum.photos/seed/picsum/500/300", description: "Best looiking mountain ever tbh", author: "LimeNade", time:"10/8/2023",tags: ['site', 'database']},
      { name: "Best update EVER", image: "https://picsum.photos/500/300/", description: "Ikr, I'm the best dev!!!", author: "Noxyyk", time:"9/8/2023",tags: ['backend', 'documentation'] },
      { name: "I love chicken nuggets", image: "https://picsum.photos/500/300", description: "When I met you in the summer 😘", author: "LimeNade", time:"9/8/2023", tags: ['blocks', 'website']}
    ];
  </script>
  




  <h2 class='text-2xl mb-2'>Changelog</h2>
  <div class="changelog-container w-1/4 mx-auto">
    {#each logs as log, i (log.name)}
    <div class="card w-100 bg-base-100 shadow-xl">
      <figure><img src={log.image} alt={log.name}/></figure>
      <div class="card-body">
        <h2 class="card-title">
          {log.name}
          {#if i == 0}
          <div class="badge badge-secondary">NEW</div>
          {/if}
        </h2>
        <p>{log.description}</p>
        <div class="card-actions justify-end">
          {#each log.tags as tag}
          <div class="badge badge-accent badge-outline">{tag}</div> 
          {/each}
        </div>
      </div>
    </div>
    {#if i != 0}
    <div class='divider'></div>
    {:else}
    <div class='divider'>NEW</div>
    {/if}

    {/each}
  </div>
  <style>
    .changelog-container {
      max-height: 50vh;
      overflow-y: auto;
  
      /* Custom scroll bar styles */
      scrollbar-width: thin;
      scrollbar-color: transparent  rgb(209 213 219);
  
      &::-webkit-scrollbar {
        width: 8px;
      }
  
      &::-webkit-scrollbar-thumb {
        background-color:  rgb(209 213 219);
        border-radius: 4px;
      }
  
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }
  </style>
  