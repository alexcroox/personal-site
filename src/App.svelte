<script>
  import { onMount } from 'svelte'
  import Sidebar from './components/sidebar.svelte'
  import ActivityFeed from './components/activity-feed.svelte'
</script>

<style>
  body {
    background-color: #f5f7f9;
  }

  .app {
    display: flex;
  }
</style>

<div class="app">
  <Sidebar />
  <ActivityFeed />
</div>
