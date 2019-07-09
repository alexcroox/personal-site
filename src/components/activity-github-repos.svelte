<script>
  import { gitHubRepos } from '../store'
  import GithubCard from './github-card.svelte'
</script>

{#each $gitHubRepos as item}
  <GithubCard {...item} />
{/each}
