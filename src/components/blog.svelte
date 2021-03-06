<script>
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'
  import marked from 'marked'
  import Card from './card.svelte'
  import Placeholder from './placeholder.svelte'
  import Divider from './divider.svelte'
  import { remove } from 'lodash-es'

  let posts = []
  let post = null

  let route = window.location.pathname
  let singlePostDate = null

  // Single blog post
  if (route.includes('/recent/')) {
    let routeElements = route.split('/')
    singlePostDate = routeElements[2]
  }

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

    // Showing single post?
    if (singlePostDate) {
      // Remove our matching single post from the posts array
      post = remove(posts, p => {
        return p.created === singlePostDate
      })

      post = post[0]
    }
  })
</script>

<style>
  .post-wrapper {
    margin-bottom: 25px;
  }

  .created {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }

  .post-break-title {
    font-weight: 400;
    font-size: 1.6rem;
    margin-bottom: 25px;
  }

  .post {
    max-width: 100%;
  }

  .post :global(h2) {
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 1.8rem;
  }

  .post :global(h3) {
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 1.5rem;
  }

  .post :global(p) {
    margin-top: 10px;
  }

  .post :global(img) {
    border: 1px solid #d1d5da;
    max-width: 100%;
    margin: 15px 0;
    display: block;
  }

  .post :global(a) {
    color: #0366d6;
    text-decoration: underline;
  }

  .post :global(code) {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 1.6rem;
    overflow: auto;
    padding: 0px 5px;
    display: inline-block;
    vertical-align: middle;
  }

  .post :global(pre) {
    margin: 20px 0;
    overflow: auto;
  }

  .post :global(pre) :global(code) {
    display: block;
    font-size: 1.4rem;
  }
</style>

{#if posts.length === 0}
  {#each new Array(3) as item}
    <Placeholder />
  {/each}
{:else}
  {#if post}
    <div class="post-wrapper">
      <Card limitedWidth extraPadding>
        <div class="post">
          <div class="created color--gray">{dayjs(post.created).format('MMMM YYYY')}</div>
          {@html marked(post.content)}
        </div>
      </Card>
    </div>

    <Divider />

    <h3 class="post-break-title">More Recent Work</h3>
  {/if}

  {#each posts as post}
    <div class="post-wrapper">
      <Card limitedWidth extraPadding>
        <div class="post">
          <div class="created color--gray">{dayjs(post.created).format('MMMM YYYY')}</div>
          {@html marked(post.content)}
        </div>
      </Card>
    </div>
  {/each}
{/if}
