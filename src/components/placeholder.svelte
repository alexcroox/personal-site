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
    height: 74px;
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
      <rect x="0" y="0" rx="3" ry="3" width="286" height="18" />
      <rect x="0" y="26" rx="3" ry="3" width="460" height="18" />
      <rect x="0" y="54" rx="3" ry="3" width="85" height="20" />
      <rect x="100" y="54" rx="3" ry="3" width="37" height="20" />
      <rect x="152" y="54" rx="3" ry="3" width="65" height="20" />
    </clipPath>
  </defs>
</svg>
