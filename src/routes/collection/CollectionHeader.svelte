<script>
  export let collection;

  console.log({ collection })

  const { title, description } = collection[0];
</script> 

<header class="header">
  <h1 class="text-blue-200 font-sans text-3xl xl:text-5xl md:text-4xl">{title}</h1>
  <p>{description}</p>
</header>

<style>
  .header { 
		background: #3b82f6;
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