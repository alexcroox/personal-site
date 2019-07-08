<script>
  import dayjs from 'dayjs'
  import Button from './button.svelte'

  export let description
  export let htmlUrl
  export let language
  export let name
  export let fullName
  export let stars
  export let updated

  updated = dayjs(updated)

  const dateFormat = dayjs().isSame(updated, 'year') ? 'MMMM D' : 'MMMM D YYYY'
  let updatedDate = updated.format(dateFormat)
</script>

<style>
  .update {
    border-bottom: 1px solid #e1e4e8;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  .github-card {
    background-color: #fff;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>

<div class="update">
  <div class="github-card">
    <div class="details">
      <p class="name">{fullName}</p>

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

        <span class="stars meta-item">Updated {updatedDate}</span>
      </div>
    </div>

    <Button>
      <img src="/images/star.svg" width="16" alt="star" />
      Star
    </Button>
  </div>
</div>
