<script>
  export let currentPath = '';

  const checkIfAll = currentPath === '/' ? 'font-medium' : 'font-light';
  const checkIfBlocks = currentPath === 'blocks' ? 'font-medium' : 'font-light';
  const checkIfCollections = currentPath === 'collections' ? 'font-medium' : 'font-light';
</script>

<div>
  <a href="/" class={`text-blue-400 font-sans ${checkIfAll} color-blue`}>All</a> / 
  <a href="/blocks" class={`text-blue-400 font-sans ${checkIfBlocks} color-blue`}>Blocks</a> /
  <a href="/collections" class={`text-blue-400 font-sans ${checkIfCollections} color-blue`}>Collections</a>
</div>