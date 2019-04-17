const client_id = "BRVTREXC14M4LQBIHPC1QHENPTYM4W2FTO0ODJHKD21WKLZ3"
const client_secret = "ART21GNEGJS51MELACSULCH2GUSICZGPNQPPNS5VCOSRLYG5"
const base_url = 'http://9a733aca.ngrok.io'

const searchNearby = (lon, lat, radius, limit) =>{
  const baseURL= "https://api.foursquare.com/v2/venues/search?"
  const searchParameters = {
    client_id:client_id,
    client_secret:client_secret,
    v:20190401,
    ll:`${lon},${lat}`,
    radius:radius,
    limit:limit,
    llAcc:10,
    altAcc:10
  }
  const url = baseURL+Object.entries(searchParameters).map(e=>`${e[0]}=${e[1]}`).join('&')
  return fetch(url)
    .then(res=>res.json())
}

const getVenueDetail = (id) =>{
  const baseURL= `https://api.foursquare.com/v2/venues/${id}?`
  const searchParameters = {
    client_id:client_id,
    client_secret:client_secret,
    v:20190401
  }
  const url = baseURL+Object.entries(searchParameters).map(e=>`${e[0]}=${e[1]}`).join('&')
  return fetch(url)
    .then(res=>res.json())
}

const signUp = (userInfo) => {
  const url = base_url + '/users'
  const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
     },
     body: JSON.stringify(userInfo)
  }

  return fetch(url, options)
    .then(res => res.json())
}

const logIn = (userInfo) => {
  const url = base_url + '/users/login'
  const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
     },
     body: JSON.stringify(userInfo)
  }

  return fetch(url, options)
    .then(res => res.json())
}

const getFavorites = (user_id) => {
  const url = base_url + `/users/${user_id}/favorites`

  return fetch(url)
    .then(res => res.json())
}

const addFavorite = (user_id, foursquare_id) => {
  const url = base_url + `/users/${user_id}/${foursquare_id}`

  return fetch(url)
    .then(res => res.json())
}

const deleteFavorite = (user_id, foursquare_id) => {
  const url = base_url + `/users/${user_id}/${foursquare_id}/delete`

  return fetch(url)
    .then(res => res.json())
}

const createPin = (pinInfo) => {
  const url = base_url + '/pins'
  const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
     },
     body: JSON.stringify(pinInfo)
  }
  return fetch(url, options)
    .then(res => res.json())
}

const getPins = (userId) => {
  const url = base_url + `/users/${userId}/pins`

  return fetch(url)
    .then(res => res.json())
}

const deletePin = (pinId) => {
  const url = base_url + `/pins/${pinId}/delete`

  return fetch(url)
    .then(res => res.json())
}


export default {
  searchNearby,
  getVenueDetail,
  signUp,
  logIn,
  getFavorites,
  addFavorite,
  deleteFavorite,
  createPin,
  getPins,
  deletePin
}
