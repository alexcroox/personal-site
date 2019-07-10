<script>
  import dayjs from 'dayjs'
  import Divider from './divider.svelte'
</script>

<style>
  .sidebar {
    background-color: #fff;
    border-right: 1px solid #e1e4e8;
    padding: 24px;
    flex-shrink: 0;
  }

  .avatar {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
    margin-right: 15px;
    background: url('/images/avatar-placeholder.svg') no-repeat center center;
    background-size: 100px 100px;
  }

  h1 {
    font-size: 2.6rem;
    line-height: 30px;
    font-weight: bold;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .username {
    color: #666;
    font-size: 2rem;
    font-weight: 300;
    line-height: 24px;
    margin-top: 5px;
  }

  .skills {
    font-size: 1.4rem;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .sidebar-item {
    margin-top: 12px;
    display: flex;
    align-items: center;
  }

  .sidebar-item img {
    margin-right: 10px;
  }

  .company {
    margin-top: 20px;
  }

  .company-name {
    font-weight: bold;
    display: block;
  }

  .company-role {
    margin-top: 3px;
    display: block;
  }

  .company-time {
    display: block;
    font-size: 1.4rem;
    color: #888;
  }

  @media (max-width: 700px) {
    .sidebar {
      border-right: none;
      border-bottom: 1px solid #e1e4e8;
    }

    .overview {
      display: inline-block;
      vertical-align: middle;
    }

    .skills {
      margin-top: 12px;
    }
  }
</style>

<div class="sidebar">
  <div class="user">
    <img src="/images/avatar.jpg" class="avatar" alt="Alex Crooks picture" />

    <div class="overview">
      <h1>
        <a class="link--plain" href="https://github.com/alexcroox" target="_blank" rel="noopener noreferrer">
          Alex Crooks
        </a>
      </h1>

      <p class="username">
        <a class="link--plain" href="https://github.com/alexcroox" target="_blank" rel="noopener noreferrer">
          @alexcroox
        </a>
      </p>

      <p class="skills">Node / React / Vue.js / Svelte</p>
    </div>
  </div>

  <p class="location sidebar-item">
    <img src="/images/location.svg" width="16" alt="location" />
    Hampshire, UK
  </p>

  <p class="sidebar-item">
    <img src="/images/email.svg" width="16" alt="email" />
    <a class="link" href="mailto:alexcrooks@gmail.com">alexcrooks@gmail.com</a>
  </p>

  <p class="sidebar-item">
    <img src="/images/github.svg" width="16" alt="github" />
    <a class="link" href="https://github.com/alexcroox" target="_blank" rel="noopener noreferrer">
      github.com/alexcroox
    </a>
  </p>

  <p class="sidebar-item">
    <img src="/images/twitter.svg" width="16" alt="twitter" />
    <a class="link" href="https://twitter.com/alexcroox" target="_blank" rel="noopener noreferrer">
      twitter.com/alexcroox
    </a>
  </p>

  <Divider />

  <h3>Organisations</h3>

  <p class="company">
    <a href="https://hectare.farm" target="_blank" rel="noopener noreferrer" class="company-name link--plain">
      Hectare Agritech
    </a>
    <span class="company-role">Front End Lead Developer</span>
    <span class="company-time">{dayjs().diff(dayjs('2019-05-01'), 'month')} months</span>
  </p>

  <p class="company">
    <a href="https://sidigital.co" target="_blank" rel="noopener noreferrer" class="company-name link--plain">
      Si digital
    </a>
    <span class="company-role">Lead Developer</span>
    <span class="company-time">10 years 5 months</span>
  </p>

  <Divider />

  <p class="sidebar-item">
    <img src="/images/github-full.svg" width="16" alt="github" />
    <a class="link" href="https://github.com/alexcroox/personal-site" target="_blank" rel="noopener noreferrer">
      This site is open source
    </a>
  </p>
</div>
