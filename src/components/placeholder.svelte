<script>
  import Card from './card.svelte'
</script>

<style>
  .placeholder {
    animation: linear 1s placeHolderShimmer infinite;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    width: 460px;
    height: 150px;
    clip-path: url(#svgPath);
    transform: translateZ(0);
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
</style>

<Card>
  <div class="placeholder" />
</Card>

<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
  <defs>
    <clipPath id="svgPath">
      <rect x="0" y="0" rx="3" ry="3" width="100" height="11.25" />
      <rect x="0" y="17.61" rx="0" ry="0" width="286.35" height="20.7" />
      <rect x="0" y="32.61" rx="0" ry="0" width="0" height="0" />
      <rect x="0" y="45.61" rx="0" ry="0" width="0" height="0" />
      <rect x="0" y="55" rx="0" ry="0" width="400" height="18" />
      <rect x="0" y="80" rx="0" ry="0" width="350" height="18" />
      <rect x="0" y="105" rx="0" ry="0" width="370" height="18" />
    </clipPath>
  </defs>
</svg>
