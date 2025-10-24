<script>
  let { lifeExpectancy, birthDate } = $props();
  const finalYear = $derived((parseInt(birthDate.split("-")[0]) + lifeExpectancy));
</script>

<section id="summary">
  <div>
    <p class="text-gradient">
      <i class="fa-solid fa-heart-crack"></i> You are expected to live until
      the year <strong>{finalYear}</strong> with an age of
      <strong>{lifeExpectancy}</strong>. Make the most of it!
    </p>
  </div>
</section>
