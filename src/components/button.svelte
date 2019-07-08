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

  .button:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);
    background-position: -3px;
    border-color: rgba(27, 31, 35, 0.35);
  }

  .button:active {
    background-color: #e9ecef;
    background-image: none;
    border-color: rgba(27, 31, 35, 0.35);
    box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15);
  }

  .button :global(img) {
    margin-right: 5px;
    display: inline-block;
  }
</style>

<div class="button">
  <slot />
</div>
