import { gitHubRepos, gitHubStars } from '../store'

const getRepos = async () => {
  let [repos, stars] = await Promise.all([
    fetchUserGithubResource('alexcroox/repos?per_page=100', true),
    fetchUserGithubResource('alexcroox/starred?per_page=30')
  ])

  gitHubRepos.update(() => repos)
  gitHubStars.update(() => stars)
}

const fetchUserGithubResource = async (resource, orderByUpdated = false) => {
  let data = []
  let response

  if (sessionStorage.getItem(resource)) {
    response = JSON.parse(sessionStorage.getItem(resource))
  } else {
    response = await fetch(`https://api.github.com/users/${resource}`)
    response = await response.json()
    sessionStorage.setItem(resource, JSON.stringify(response))
  }

  response.map(item => {
    let {
      description,
      html_url: htmlUrl,
      language,
      name,
      full_name: fullName,
      stargazers_count: stars,
      pushed_at: pushedAt
    } = item

    data.push({
      description,
      htmlUrl,
      language,
      name,
      fullName,
      stars,
      pushedAt
    })
  })

  // Order by updated, recent first
  if (orderByUpdated) {
    data.sort((a, b) => (a.pushedAt > b.pushedAt ? -1 : b.pushedAt > a.pushedAt ? 1 : 0))
  }

  return data
}

export default getRepos
