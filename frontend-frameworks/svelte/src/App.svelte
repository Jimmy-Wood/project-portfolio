<script>
  import Calendar from "./lib/Calendar.svelte";
  import Clocks from "./lib/Clocks.svelte";
  import Hero from "./lib/Hero.svelte";
  import Layout from "./lib/layout/Layout.svelte";
  import Summary from "./lib/Summary.svelte";
</script>

<Layout>
  {#snippet application({ birthDate, lifeExpectancy, name, data, percentage, handleToggleModal, handleResetData })}
    <Hero {name} {percentage} {data} {handleToggleModal} {handleResetData} />
    <Clocks {data} />
    <Calendar {data} {lifeExpectancy} />
    <Summary {lifeExpectancy} {birthDate}/>
  {/snippet}
</Layout>
