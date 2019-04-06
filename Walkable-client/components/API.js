const client_id = "5K2PO0TCBUH5ZKRLQQVZVYOV21JQSUVJ44T35142BHVUFKUI"
const client_secret = "GIZVTNTL3HOXRFIUDPT1O050GBPCKF3ZRPI3RMS5L0T4JD1M"
const base_url = 'http://localhost:3000'

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


export default {
  searchNearby,
  getVenueDetail,
  signUp,
  logIn,
  getFavorites
}
