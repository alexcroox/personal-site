<script>
  export let flat = false
  export let limitedWidth = false
  export let extraPadding = false
</script>

<style>
  .card {
    background-color: #fff;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card.flat {
    background-color: transparent;
    border: none;
  }

  .card.limited-width {
    max-width: 770px;
  }

  .card.extra-padding {
    padding: 25px;
  }
</style>

<div class="card {!flat || 'flat'} {!limitedWidth || 'limited-width'} {!extraPadding || 'extra-padding'}">
  <slot />
</div>
