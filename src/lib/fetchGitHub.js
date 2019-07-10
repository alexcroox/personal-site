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

  // Do we have anything in session storage yet?
  if (sessionStorage.getItem(resource)) {
    response = JSON.parse(sessionStorage.getItem(resource))
  } else {
    response = await fetch(`https://api.github.com/users/${resource}`)
    response = await response.json()

    // Save to session storage, GitHub has 60 calls per hour limit
    sessionStorage.setItem(resource, JSON.stringify(response))
  }

  response.map(item => {
    data.push({
      description: item.description,
      htmlUrl: item.html_url,
      language: item.language,
      name: item.name,
      fullName: item.full_name,
      stars: item.stargazers_count,
      pushedAt: item.pushed_at
    })
  })

  // Order by updated, recent first
  if (orderByUpdated) {
    data.sort((a, b) => (a.pushedAt > b.pushedAt ? -1 : b.pushedAt > a.pushedAt ? 1 : 0))
  }

  return data
}

export default getRepos
