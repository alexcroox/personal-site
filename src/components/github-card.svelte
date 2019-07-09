<script>
  import ago from 's-ago'
  import Button from './button.svelte'
  import Card from './card.svelte'

  export let flat = false
  export let noStar = false
  export let description
  export let htmlUrl
  export let language
  export let name
  export let fullName
  export let stars
  export let updated

  let repoName = flat ? name : fullName
  let updatedAgo = ago(new Date(updated))
</script>

<style>
  .update {
    border-bottom: 1px solid #e1e4e8;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  .name {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .description {
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .meta {
    font-size: 1.2rem;
  }

  .meta-item {
    margin-right: 15px;
  }

  .meta span,
  .meta img {
    vertical-align: middle;
    display: inline-block;
  }

  .meta img {
    margin-right: 3px;
  }

  .action {
    flex-shrink: 0;
  }
</style>

<div class="update">
  <Card {flat}>
    <div class="details">
      <a href={htmlUrl} class="name {flat ? 'link' : 'link--plain'}" target="_blank" rel="noopener noreferrer">
         {repoName}
      </a>

      {#if description}
        <p class="description color--gray">{description}</p>
      {/if}

      <div class="meta color--gray">
        {#if language}
          <span class="language meta-item">
            <img src="/images/languages/{language.toLowerCase()}.svg" width="20" alt={language} />
            <span>{language}</span>
          </span>
        {/if}

        {#if stars}
          <span class="stars meta-item">
            <img src="/images/star.svg" width="16" alt="stars" />
            <span>{stars}</span>
          </span>
        {/if}

        <span class="stars meta-item">Updated {updatedAgo}</span>
      </div>
    </div>

    {#if !noStar}
      <div class="action">
        <Button href={htmlUrl} newTab="true">
          <img src="/images/star.svg" width="16" alt="star" />
          Star
        </Button>
      </div>
    {/if}

  </Card>
</div>
