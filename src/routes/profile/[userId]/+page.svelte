<script>
  import Input from "../../../components/Input.svelte";
  import Button from "../../../components/Button.svelte";

  export let data;
  export let error;

  const name = data?.data[0]?.name
  const github = data?.data[0]?.github
  const twitter = data?.data[0]?.twitter
  const personalSite = data?.data[0]?.personal_site
</script>

<p>profile</p>
<h1>{name}</h1>
<h1>{github}</h1>
<h1>{twitter}</h1>
<h1>{personalSite}</h1>

<main>
  <form action="?/updateInfo" method="POST" class="mt-8 space-y-6">
    <Input type="text" text="name" iconType="solid" icon="user"/>
    <Input type="text" text="twitter" iconType="brands" icon="twitter" />
    <Input type="text" text="github" iconType="brands" icon="github" />
    <Input type="text" text="personal_site" iconType="solid" icon="window-maximize" />
    <Button text="Submit" type="submit" />
  </form>
</main>

<style>
  main {
    width: 50%;
    margin: auto;
  }
</style>