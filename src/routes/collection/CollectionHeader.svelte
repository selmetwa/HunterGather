<script>
  export let collection;

  console.log({ collection })

  const { title, description } = collection && collection[0];
</script> 

<header class="header bg-gray-100">
  <h1 class="text-gray-500 font-sans text-3xl xl:text-5xl md:text-4xl">{title}</h1>
</header>

<style>
  .header { 
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  h1 {
    position: absolute;
    top: 70px;
    padding-top: 30px;
    font-weight: 900;
  }
</style>