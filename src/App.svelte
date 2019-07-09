<script>
  import { onMount } from 'svelte'
  import Sidebar from './components/sidebar.svelte'
  import Activity from './components/activity.svelte'
</script>

<style>
  .app {
    display: flex;
    min-height: 100%;
  }

  @media (max-width: 700px) {
    .app {
      display: block;
    }
  }
</style>

<div class="app">
  <Sidebar />
  <Activity />
</div>
