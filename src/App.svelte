<script>
  import { onMount } from 'svelte'
  import Sidebar from './components/sidebar.svelte'
  import Activity from './components/activity.svelte'
</script>

<style>
  .app {
    display: flex;
  }
</style>

<div class="app">
  <Sidebar />
  <Activity />
</div>
