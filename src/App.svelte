<script>
  import { onMount } from 'svelte'
  import Sidebar from './components/sidebar.svelte'
  import ActivityFeed from './components/activity-feed.svelte'
</script>

<style>
  .app {
    display: flex;
  }
</style>

<div class="app">
  <Sidebar />
  <ActivityFeed />
</div>
