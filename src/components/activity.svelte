<script>
  import { onMount } from 'svelte'
  import { gitHubRepos, gitHubStars } from '../store'
  import GitHubRepos from './activity-github-repos.svelte'
  import GitHubStars from './activity-github-stars.svelte'
  import Blog from './blog.svelte'
  import Placeholder from './placeholder.svelte'
  import Chip from './chip.svelte'
  import fetchGitHub from '../lib/fetchGitHub'

  let route = window.location.pathname

  onMount(() => {
    fetchGitHub()
  })

  const updateRoute = path => {
    route = path
    window.history.pushState(null, '', path)
  }
</script>

<style>
  .activity {
    padding: 10px 16px;
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
  }

  .tabs a.active {
    border-bottom-color: #e36209;
    color: #24292e;
    font-weight: bold;
  }

  @media (max-width: 700px) {
    .activity {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>

<div class="activity">
  <nav class="tabs" aria-label="Main Navigation">
    <a
      href="/"
      on:click|preventDefault={() => updateRoute('/')}
      class="link--plain {(route !== '/' && !route.includes('/recent')) || 'active'}">
      Recent Work
    </a>

    <a
      href="/"
      on:click|preventDefault={() => updateRoute('/repos')}
      class="link--plain {route !== '/repos' || 'active'}">
      My Repos
      <Chip>{$gitHubRepos.length}</Chip>
    </a>

    <a
      href="/"
      on:click|preventDefault={() => updateRoute('/stars')}
      class="link--plain {route !== '/stars' || 'active'}">
      Starred
      <Chip>{$gitHubStars.length}</Chip>
    </a>
  </nav>

  {#if route === '/' || route.includes('/recent')}
    <Blog />
  {/if}

  {#if route === '/repos'}
    <GitHubRepos />
  {/if}

  {#if route === '/stars'}
    <GitHubStars />
  {/if}
</div>
