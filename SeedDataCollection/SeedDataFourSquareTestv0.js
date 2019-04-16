const fetch = require('node-fetch')
const fs = require('fs')

const client_id = "BRVTREXC14M4LQBIHPC1QHENPTYM4W2FTO0ODJHKD21WKLZ3"
const client_secret = "ART21GNEGJS51MELACSULCH2GUSICZGPNQPPNS5VCOSRLYG5"

const searchNearby = () =>{
  const searchVenueURL= "https://api.foursquare.com/v2/venues/search?"
  const searchParameters = {
    client_id:client_id,
    client_secret:client_secret,
    v:20190401,
    ll:"51.5228,-0.1153",
    radius:200,
    limit:5000,
    llAcc: 10,
    altAcc:10
  }

  const url = searchVenueURL+Object.entries(searchParameters).map(e=>`${e[0]}=${e[1]}`).join('&')

  return fetch(url)
    .then(res=>res.json())
}

const writeResultFile = (responseAPI) => {
  const searchResultArray = responseAPI.response.venues

  fs.writeFile(
  'FourSquareTestData.json', JSON.stringify(searchResultArray), function(err) {
      if (err) throw err;
      console.log('successfully saved file')
  }
  )
}

searchNearby()
  .then(data=>writeResultFile(data))
