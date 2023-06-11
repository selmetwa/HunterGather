<script>
  let learnNewWord = false
</script>
<div class="flex flex-col items-center border-2 border-gray-300 background-gray-200 text-center p-20 m-20">
  <p>
    {#if learnNewWord}
      <p class="text-gray-400 m-auto">
        <a class="text-blue-400" href="https://en.wiktionary.org/wiki/mafeesh" target="_blank" rel="noreferrer">
          مـَفيش (māfeesh)
        </a>
        = there is nothing</p>
    {:else}
      <p class="text-gray-400 m-auto">there is nothing</p>
    {/if}
  </p>
  {#if learnNewWord}
  <button class="mt-4 text-gray-500 font-light underline" on:click={() => learnNewWord = false}>back to engish please</button>

  {:else}
  <button class="mt-4 text-gray-500 font-light underline" on:click={() => learnNewWord = true}>teach me something</button>

  {/if}
</div>