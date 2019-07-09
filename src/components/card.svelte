<script>
  export let flat = false
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
</style>

<div class="card {!flat || 'flat'}">
  <slot />
</div>
