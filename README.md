# Headsup
Look up instead of look down.
Headsup is a street explorer powered by Augmented Reality. With Headsup, you can access information (such as rating, reviews, comments) of a venue through AR on your screen without looking down on the phone. It guides you towards direction with more probability of finding a venue you want. And you can label places with your own custom message that only your friends can see.


**Front-end User Feature List - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -**  

**Non-AR features:**
* Search listing of venues available nearby through Foursquare API
    * √ Configure Foursquare API
    * √ Search on the go (fetch small radius data per location move)
    * √ Navigate me (fetch custom radius data to guide direction)
* Filter listing based on user inputed criteria
    * x Build user selection form (only category filter for now)
    * x Filter Foursquare API
* Click to see venue details
    * √ Render venue details tab
    * √ save favorites button
* Check-in and review
    * √ Edit/create own record

**AR:**
* Render info 3D
    * √ Integrate AR SDK
    * √ Simple 3D render (text and basic geometries)
    * x Integrate suitable 3D object library
* Pin result accurately in the right position with the right size
    * √ Write algorithm on what to show
    * √ ... where to show
    * √ ... on size and camera angle
* Provide indicator on direction of walk
    * √ Left or Right? Calculate based on list filter
    * √ Define area limit of the whole walk
* Add new venue (personal tagging)
    * √ Create personalize tags for friends only


**Backend Models - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -**  
**Classes and Models:**
* User
    * Name,  email address
* Search setting
    * Category filter, user ID
* Favorites
    * Foursquare ID, user ID
* Venue (front-end)
    * GEO: address, longitude, latitude, postal code
    * Venue: name, Foursquare ID, venue type, visit count, rating, price tier, comment, one photo
* Venue (own-tag, back-end)
* Reviews (no need)
    * Foursquare ID, user ID, rating, price, comment

**Relationships**
* User has a setting
* User has many reviews
* User has many favorites
* User has many own venue (later)


Project Management  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
**Available working days (12 days):**
* Week 1: 0.5, 1, 1, 1, 1
* Week 2: 1, ............, 1
* Week 3: 1, 1, 0.5
**Timeline (10 days):**
* Wireframe and planning, setups: 1 day (0.5)
* Non-AR features and connecting to back-end: 2 days (2.5)
* AR features: 3.5 days (3)
* AR add-on features (new venue): 1.5 day (1)
* Front-end improvement: 1.5 days (1)
* Presentation and video: 0.5 day (1)
* Refractor code and buffer : 2 days (1)

**Key risks:**
* Quality of Zoopla API data return
    * Zoopla API deprecated (without public announcement, how annoying)
    * Going for Foursquare
* AR package for render
    * React-native-ARkit (version issue, too many dependencies)
    * ViroReact (too large of a package, required xcode mobile setup, and has to use its own testbed)
    * Expo-three (dependency issue solved, now working)
* Accuracy of rendering based on longitude and latitude
    * Location inaccuracy with wifi
    * Heading inaccuracy of mobile phone
