<script>
  export let description
  export let htmlUrl
  export let language
  export let name
  export let fullName
</script>

<style>
  .github-card {
    background-color: #fff;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    padding: 16px;
  }

  .github-card--name {
    font-weight: bold;
    font-size: 1.6rem;
  }
</style>

<div class="github-card">
  <p class="github-card--name color--gray">{fullName}</p>
  <p class="github-card--description">{description}</p>
</div>
