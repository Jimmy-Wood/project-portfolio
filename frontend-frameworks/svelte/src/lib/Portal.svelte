<script>
  const { form, handleCloseModal } = $props();
</script>

<div class="portal-container">
  <div
    role="button"
    tabindex="0"
    onkeydown={() => {}}
    class="portal-underlay"
    onclick={handleCloseModal}
  ></div>
  <div class="portal-content">
    {@render form()}
  </div>
</div>
