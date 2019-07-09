<script>
  import { gitHubStars } from '../store'
  import GithubCard from './github-card.svelte'
</script>

{#each $gitHubStars as item}
  <GithubCard flat noStar {...item} />
{/each}
