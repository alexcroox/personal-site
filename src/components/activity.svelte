<script>
  import { onMount } from 'svelte'
  import { gitHubRepos, gitHubStars } from '../store'
  import GitHubRepos from './activity-github-repos.svelte'
  import GitHubStars from './activity-github-stars.svelte'
  import TwitterFeed from './activity-twitter.svelte'
  import Chip from './chip.svelte'
  import fetchGitHub from '../lib/fetchGitHub'

  let activeTab = 'my-repos'

  onMount(() => {
    fetchGitHub()
  })
</script>

<style>
  .content {
    padding: 16px;
    flex-grow: 1;
  }

  .tabs {
    border-bottom: 1px solid #d1d5da;
    margin-bottom: 20px;
    display: flex;
  }

  .tabs a {
    border-bottom: 2px solid transparent;
    color: #586069;
    font-size: 14px;
    line-height: 1.5;
    margin-right: 16px;
    padding: 16px 8px;
    text-align: center;
  }

  .tabs a:hover {
    border-bottom-color: #d1d5da;
    color: #24292e;
    text-decoration: none;
    transition: 0.2s ease;
  }

  .tabs a.active {
    border-bottom-color: #e36209;
    color: #24292e;
    font-weight: bold;
  }
</style>

<div class="content">
  <nav class="tabs" aria-label="Main Navigation">
    <a
      href="/"
      on:click|preventDefault={() => (activeTab = 'my-repos')}
      class="link--plain {activeTab !== 'my-repos' || 'active'}">
      My Repos
      <Chip>{$gitHubRepos.length}</Chip>
    </a>

    <a
      href="/"
      on:click|preventDefault={() => (activeTab = 'my-stars')}
      class="link--plain {activeTab !== 'my-stars' || 'active'}">
      Starred
      <Chip>{$gitHubStars.length}</Chip>
    </a>
  </nav>

  {#if activeTab === 'my-repos'}
    <GitHubRepos />
  {/if}

  {#if activeTab === 'my-stars'}
    <GitHubStars />
  {/if}

  {#if activeTab === 'twitter'}
    <TwitterFeed />
  {/if}
</div>
