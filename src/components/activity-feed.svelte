<script>
  import { onMount } from 'svelte'
  import GithubCard from './item-github-card.svelte'

  let timeline = []

  onMount(async () => {
    if (window.localStorage.getItem('timeline')) {
      console.log('Loading from local storage')
      timeline = window.localStorage.getItem('timeline')
      return
    }

    let [repos, stars] = await Promise.all([
      fetchUserGithubResource('alexcroox/repos'),
      fetchUserGithubResource('alexcroox/starred')
    ])

    timeline = [...timeline, ...repos, ...stars]

    window.localStorage.setItem('timeline', timeline)

    console.log(timeline)
  })

  const fetchUserGithubResource = async resource => {
    let data = []

    let response = await fetch(`https://api.github.com/users/${resource}`)
    response = await response.json()

    response.map(item => {
      let { description, html_url: htmlUrl, language, name, full_name: fullName } = item

      data.push({
        itemComponent: GithubCard,
        description,
        htmlUrl,
        language,
        name,
        fullName
      })
    })

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
