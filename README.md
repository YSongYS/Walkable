# Headsup
Neighborhood Explorer On the Go. Powered by Augmented Reality


Front-end User Feature List - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Non-AR features:
* Search listing of venues available nearby through Foursquare API
    * Configure Foursquare API
      - finished with area search
* Filter listing based on user inputed criteria
    * Build user selection form (only category filter for now)
    * Filter Foursquare API
* Click to see venue details
    * Render venue details tab
    * save favorites button
* Check-in and review
    * Edit/create own record

AR:
* Render search result accurately with viewable range and in accurate position
    * Import 3D marker from Google AR
    * Write camera function and render 3D marker
    * AR SDK (maybe)
    * Calculate size and position of render
* Provide indicator on direction of walk
    * Left or Right? Calculate based on list filter
    * Define area limit of the whole walk
* Add new venue (personal tagging)
    * Create personalize tags for friends only


Backend Models - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
Classes and Models:
* User
    * Name,  email address
* Search setting
    * Category filter, user ID
* Favorites
    * Foursquare ID, user ID
* Reviews
    * Foursquare ID, user ID, rating, price, comment
* Venue (front-end)
    * GEO: address, longitude, latitude, postal code
    * Venue: name, Foursquare ID, venue type, visit count, rating, price tier, comment, one photo
* Venue (own-tag, back-end)

* Friend
    * User id, user id

Relationships
* User has a setting
* User has many reviews
* User has many favorites

* User has many own venue (later)


Project Management  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
Available days:
* Week 1: 0.5, 0.5, 0.5, 1, 1
* Week 2: 1, ............, 1
* Week 3: 1, 1, 0.5
Timeline:
* Wireframe and planning, setups: 1 day
* Non-AR features and connecting to back-end: 2 days
* AR features: 3 days
* AR add-on features (new venue): 1 day
* Front-end improvement: 1.5 days
* Presentation: 0.5 day
* Refractor code and buffer : 2 days

Key risks:
* Quality of Zoopla API data return (Exploded - switch to Foursquare)
* Accuracy of AR rendering based on longitude and latitude
* React Native being naughty and hard to pick up
