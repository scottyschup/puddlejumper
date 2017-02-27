# PuddleJumper
This site is no longer maintained, but the code base is left here for reference purposes. This is the first major project I completed in Rails as part of a 3-month intensive coding bootcamp called App Academy. I attended from February 2015 to May 2015. 

## The basics
PuddleJumper is a clone of Kayak flight search for the Stargate universe, built with Rails and Backbone. Features:

- [x] Search for available Stargate transit schedules
- [x] Choose origin/destination from typeahead list
- [x] View individual trip details
- [x] Create itineraries with multiple travelers
- [x] Create new users if necessary on reservation submission
- [x] Reuse or clear previous search parameters

## Noteworthy features
In order to reduce the amount of JSON data transmitted, I created a server-side search service to parse the JSON search parameters and return all valid trip legs. On the frontend, the Backbone [trip_search model][trip_search_bb_model] parses the returned data and in the case of roundtrip searches, assembles the individual legs into valid round trips.

During the reservation stage, I wanted users to be able to add travel companions to their itinerary, regardless of whether those users were already registered with the site. To accomplish this, I used the ActiveRecord `accepts_nested_params_for` method in conjunction with the `first_or_initialize` method in my [Itinerary model][itinerary_model]. In this way Rails was able to accept user information for an undetermined number of travelers, look for them in the database, and if they were not found, create a new user from the information.

Because this is a single page Backbone app, and my results_index view contains multiple subviews, I implemented a [composite view utility][comp_view_util] to prevent the accumulation of zombie views.

The site features database-populated typeahead for origin and destination fields (since not all users are familiar with the planets accessible through the Stargate network), as well as a "Surprise Me" button that autocompletes the form, for the more spontaneous traveler.

[trip_search_bb_model]: ./app/assets/javascripts/models/trip_search.js
[itinerary_model]: ./app/models/itinerary.rb
[comp_view_util]: ./app/assets/javascripts/util/composite_view.js

## Next Steps
Because searching for trips doesn't necessarily require a secure login, I saved User Auth for a later stage, and only just began to implement it when I ran out of time and had to push to production. Because I was adhering to an Agile development methodology, I already had a working minimum viable product and put finishing User Auth on the to-do list. Much of the boilerplate code is already there, I just need to add password hashing and create the frontend views and routes for new user and new session.

I also saved form validations for a later time so that users could test the reservation portion of the site with minimal hassle. A final product would of course inlcude several validations both at the database level and the Rails and Backbone model levels. Backbone.validation is the plugin I'm leaning towards using for frontend validation.

## Special Notes
The "long" search time between submitting the search form and receiving results is an illusion. I added a setTimeout call in order to display the Stargate spinner long enough to really appreciate it. The actual search takes less time than the spinner needs to display.
