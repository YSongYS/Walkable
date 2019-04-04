const client_id = "BRVTREXC14M4LQBIHPC1QHENPTYM4W2FTO0ODJHKD21WKLZ3"
const client_secret = "ART21GNEGJS51MELACSULCH2GUSICZGPNQPPNS5VCOSRLYG5"

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

export default {
  searchNearby,
  getVenueDetail,
}
