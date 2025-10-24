<script>
  import { calculateTimeLeft, getLifePercentageLived } from "../../utils";
  import Portal from "../Portal.svelte";
  import Form from "../Form.svelte";

  const { application } = $props();

  let showModal = $state(false);
  function handleToggleModal() {
    showModal = !showModal;
  }

  let defaultBirthDate = "1992-06-12";
  let defaultLifeExpectancy = 80;
  let birthDate = $state(defaultBirthDate);
  let lifeExpectancy = $state(defaultLifeExpectancy);
  let name = $state("James");
  let data = $state(calculateTimeLeft(defaultBirthDate, defaultLifeExpectancy));

  let percentage = $derived(getLifePercentageLived(birthDate, lifeExpectancy));

  function handleUpdateData(newName, newBirthDate, newLifeExpectancy) {
    if (!newBirthDate || !newLifeExpectancy || !newName) return;

    localStorage.setItem(
      "formData",
      JSON.stringify({
        name: newName,
        birthDate: newBirthDate,
        lifeExpectancy: newLifeExpectancy,
      })
    );

    name = newName;
    birthDate = newBirthDate;
    lifeExpectancy = parseInt(newLifeExpectancy);
    data = calculateTimeLeft(birthDate, lifeExpectancy);
    showModal = false;
  }

  function handleResetData() {
    name = "James";
    birthDate = defaultBirthDate;
    lifeExpectancy = defaultLifeExpectancy;
    data = calculateTimeLeft(defaultBirthDate, defaultLifeExpectancy);
    localStorage.clear();
  }

  $effect(() => {
    const interval = setInterval(() => {
      data = calculateTimeLeft(birthDate, lifeExpectancy);
    }, 1000);

    return () => clearInterval(interval);
  });

  $effect(() => {
    if (!localStorage) return;

    if (localStorage.getItem("formData")) {
      const {
        name: savedName,
        birthDate: savedBirthDate,
        lifeExpectancy: savedLifeExpectancy,
      } = JSON.parse(localStorage.getItem("formData"));
      name = savedName;
      birthDate = savedBirthDate;
      lifeExpectancy = parseInt(savedLifeExpectancy);
      data = calculateTimeLeft(defaultBirthDate, defaultLifeExpectancy);
    }
  });
</script>

{#if showModal}
  <Portal handleCloseModal={handleToggleModal}>
    {#snippet form()}
      <Form {handleUpdateData} handleCloseModal={handleToggleModal} />
    {/snippet}
  </Portal>
{/if}

<header>
  <h1 class="text-medium text-gradient">Age Calculator</h1>
</header>

<main>
  {@render application({
    birthDate,
    lifeExpectancy,
    name,
    data,
    percentage,
    handleToggleModal,
    handleResetData,
  })}
</main>

<footer>
  <small>Created by</small>
  <a href="https://www.linkedin.com/in/jhwood/" target="_blank">
    <img
      src="https://media.licdn.com/dms/image/v2/C5603AQHu3JHMgofvOg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1532597313945?e=1762387200&v=beta&t=AIkyYe1QGNa__m5IzyYan7huN-VXqQ4g6vYBbBH10Jw"
      alt="profile_picture"
    />
    <p>James Wood</p>
    <i class="fa-brands fa-linkedin-in"></i>
  </a>
</footer>
