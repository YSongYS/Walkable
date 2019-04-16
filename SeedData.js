const fetch = require('node-fetch')
const fs = require('fs')

const client_id = "BRVTREXC14M4LQBIHPC1QHENPTYM4W2FTO0ODJHKD21WKLZ3"
const client_secret = "ART21GNEGJS51MELACSULCH2GUSICZGPNQPPNS5VCOSRLYG5"

//////////////////////////// NearbySearch /////////////////////////////////////////////////////////////////////
const searchNearby = () =>{
  const searchVenueURL= "https://api.foursquare.com/v2/venues/search?"
  const searchParameters = {
    client_id:client_id,
    client_secret:client_secret,
    v:20190413,
    ll:"51.520316,-0.087573",
    radius:500,
    limit:5000,
    llAcc: 10,
    altAcc:10
  }

  const url = searchVenueURL+Object.entries(searchParameters).map(e=>`${e[0]}=${e[1]}`).join('&')

  return fetch(url)
    .then(res=>res.json())
}

const writeNearbyResultFile = (responseAPI) => {
  const searchResultArray = {...responseAPI}

  fs.writeFile(
  'RoadTestSearchNearByData.json', JSON.stringify(searchResultArray), function(err) {
      if (err) throw err;
      console.log('successfully saved file')
  }
  )
  return responseAPI
}

/////////////////////////////////////// Cut off at 50 m and return IDs /////////////////////////////////////////

const cutOffList = (searchNearbyResponse) => {
  const venues = searchNearbyResponse.response.venues
  const nearByVenues = venues.filter(venue=>{
    const d = venue.location.distance
    return (d<=100)
  })
  const venueIDs = nearByVenues.map(venue=>venue.id)
  return venueIDs
}

////////////////////////////////////// Specific VenueSearch //////////////////////////////////////////////////
const getVenueDetail = async (id) => {
  const baseURL= `https://api.foursquare.com/v2/venues/${id}?`
  const searchParameters = {
    client_id:client_id,
    client_secret:client_secret,
    v:20190413
  }
  const url = baseURL+Object.entries(searchParameters).map(e=>`${e[0]}=${e[1]}`).join('&')
  const venueInfo = await fetch(url).then(res=>res.json())
  return venueInfo
}

const venueS = async (venuesIDs) => {
  const result = {}
  for (i = 0; i < venuesIDs.length; i++) {
    const venueInfo = await getVenueDetail(venuesIDs[i])
    result[venuesIDs[i]]=venueInfo
    if (i===venuesIDs.length-1) {
      writeVenueDetailResultFile(result)
    }
  }
}

const writeVenueDetailResultFile = (responseAPI) => {
  fs.writeFile(
  'RoadTestDetailData.json', JSON.stringify(responseAPI), function(err) {
      if (err) throw err;
      console.log('successfully saved file')
  }
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

searchNearby()
  .then(data=>writeNearbyResultFile(data))
  .then(data=>cutOffList(data))
  .then(venueIDs=>venueS(venueIDs))
