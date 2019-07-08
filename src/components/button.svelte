<style>
  .button {
    background-color: #eff3f6;
    background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
    color: #24292e;
    font-size: 1.2rem;
    line-height: 2rem;
    font-weight: bold;
    padding: 3px 10px;
    appearance: none;
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 3px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  .button :global(img) {
    margin-right: 5px;
    display: inline-block;
  }
</style>

<div class="button">
  <slot />
</div>
