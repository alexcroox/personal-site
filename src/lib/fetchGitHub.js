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
    console.log(`Loaded ${resource} from sessionStorage`)
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
      updated_at: updated
    } = item

    data.push({
      description,
      htmlUrl,
      language,
      name,
      fullName,
      stars,
      updated
    })
  })

  // Order by updated, recent first
  if (orderByUpdated) {
    data.sort((a, b) => (a.updated > b.updated ? -1 : b.updated > a.updated ? 1 : 0))
  }

  return data
}

export default getRepos
