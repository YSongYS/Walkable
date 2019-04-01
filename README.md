# Walkable
Home Search On the Go. Powered by Augmented Reality x Zoopla


Front-end User Feature List - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Non-AR features:
* Search listing of home available nearby through Zoopla API
    * Configure Zoopla API
* Filter listing based on user inputed criteria
    * Build user selection form
    * Filter Zoopla API
* Click to see listing details
    * Render simple list
* Save favoriates
    * Edit/create own record
* Contact and reach out option  
    * Add contact button

AR:
* Render search result accurately with viewable range and in accurate position
    * Import 3D marker from Google AR
    * Write camera function and render 3D marker
    * AR SDK (maybe) 
    * Calculate what’s within range and should be render
    * Calculate size of render
* Provide indicator on direction of walk
    * Left or Right? Calculate based on list filter
    * Define area limit of the whole walk


Backend Models - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
Classes and Models:
* User
    * Name,  email address
* Property
    * Name, address, number of rooms, number of bathrooms, floor area, price, price unit, rent/sale, longitude, latitude
* Search Criteria  
    * Current location, area range, min max room, min max price, rent/sale, User ID
* Search Result
    * Area range, min max room, min max price, rent/sale, Search Criteria ID, Property ID
* Favoriate
    * Property ID, user ID
* Photo gallery
    * Property ID
    *
Relationships
* Property has many Photos
* User has many Search Criteria
* Search Criteria is many to many with Property, through Search Result
* User has many Property through Favorite
* User (theoretically) is many to many with Property through Searches (Criteria and Result), however this is a relationship that will not be built


Project Management  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
Timeline:
* Non-AR features: 3 days
* Connecting to backend: 1 day
* AR features: 3 days
* AR add-on features: 1 day
* Front-end improvement: 2 days
* Presentation: 1 day
* Refractor code and buffer : 3 days

Key risks:
* Quality of Zoopla API data return
* Accuracy of AR rendering based on longitude and latitude
* React Native being naughty and hard to pick up
