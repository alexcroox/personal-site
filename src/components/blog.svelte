<script>
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'
  import marked from 'marked'
  import Card from './card.svelte'
  import Placeholder from './placeholder.svelte'

  let posts = []

  onMount(async () => {
    if (sessionStorage.getItem('blog-posts')) {
      posts = JSON.parse(sessionStorage.getItem('blog-posts'))
    } else {
      let postList = await fetch('https://api.github.com/repos/alexcroox/personal-site/contents/blog')
      postList = await postList.json()

      posts = await Promise.all(
        postList.map(meta =>
          fetch(meta.download_url).then(async response => {
            let content = await response.text()

            content.replace(/\n\n/g, '</p><p>')

            return {
              created: meta.name.replace(/.md/g, ''),
              content
            }
          })
        )
      )

      posts.sort((a, b) => (a.created > b.created ? -1 : b.created > a.created ? 1 : 0))

      sessionStorage.setItem('blog-posts', JSON.stringify(posts))
    }
  })
</script>

<style>
  .post-wrapper {
    margin-bottom: 15px;
  }

  .created {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }

  .post :global(h2) {
    font-weight: bold;
    margin-bottom: 15px;
  }

  .post :global(p) {
    margin-top: 10px;
  }

  .post :global(code) {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 1.6rem;
    overflow: auto;
    padding: 5px 10px;
    display: inline-block;
  }
</style>

{#if posts.length === 0}
  {#each new Array(3) as item}
    <Placeholder />
  {/each}
{:else}
  {#each posts as post}
    <div class="post-wrapper">
      <Card>
        <div class="post">
          <div class="created color--gray">{dayjs(post.created).format('MMMM YYYY')}</div>
          {@html marked(post.content)}
        </div>
      </Card>
    </div>
  {/each}
{/if}
