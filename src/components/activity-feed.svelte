<script>
  import { onMount } from 'svelte'
  import GithubCard from './item-github-card.svelte'

  let timeline = []

  onMount(async () => {
    let [repos, stars] = await Promise.all([
      fetchUserGithubResource('alexcroox/repos'),
      fetchUserGithubResource('alexcroox/starred')
    ])

    timeline = [...timeline, ...repos, ...stars]

    console.log(timeline)
  })

  const fetchUserGithubResource = async resource => {
    let data = []
    let response

    if (sessionStorage.getItem(resource)) {
      console.log(`Loaded ${resource} from sessionStorage`)
      response = JSON.parse(sessionStorage.getItem(resource))
    } else {
      response = await fetch(`https://api.github.com/users/${resource}`)
      response = await response.json()
      sessionStorage.setItem(resource, JSON.stringify(response))
    }

    response.map(item => {
      let {
        description,
        html_url: htmlUrl,
        language,
        name,
        full_name: fullName,
        stargazers_count: stars,
        updated_at: updated
      } = item

      data.push({
        itemComponent: GithubCard,
        description,
        htmlUrl,
        language,
        name,
        fullName,
        stars,
        updated
      })
    })

    // Order by updated
    data.sort((a, b) => (a.updated > b.updated ? -1 : b.updated > a.updated ? 1 : 0))

    return data
  }
</script>

<style>
  .feed {
    padding: 16px;
  }
</style>

<div class="feed">
  {#each timeline as item}
    <svelte:component this={item.itemComponent} {...item} />
  {/each}
</div>
