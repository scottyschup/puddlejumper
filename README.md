# PuddleJumper

[Heroku link][heroku]

[heroku]: http://puddlejumper.herokuapp.com

## Minimum Viable Product
PuddleJumper is a clone of Kayak for the Stargate universe, built on Rails and Backbone. Users can:

- [x] Search for available Stargate transit schedules
- [ ] Sort results by date/time
- [x] View individual trip details
- [ ] Receive Stargate Traveler ID number
- [ ] Reserve transit spots
- [ ] Provide tooltips for first time users
- [ ] Search for spaceship rentals
- [ ] Sort rentals by price, capacity
- [ ] View individual spaceship details
- [ ] Reserve spaceship rentals
- [ ] Search for off-planet lodging
- [ ] Sort room rentals by price, user review
- [ ] View individual lodging details
- [ ] Reserve room rentals


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Rails Setup/Database Seed (~1 day)
Because logging in is not a prerequisite to searching, I will begin with creating the gate travel seed data for the search form and getting all of the initialization preliminaries done. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Search form for gate travel (~2 days)
I will add API routes to serve gate travel data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to enter origin and destination points and travel dates and see a list of results. Because this phase will include most of the Backbone setup, it may take up to 2 days.

[Details][phase-two]

### Phase 3: Reserving gate travel (~2 days)
Although Gate Travel is free, priority is given to SGC personnel, IOA diplomats, and others representing Earth's interests abroad. For that reason visitors to the site will be required to provide their Stargate Traveler Identification Number, or will be assigned one if they do not yet have one. This number will be used to determine whether the reservation is successful

[Details][phase-three]

### Phase 4: Spaceship Search and reservation (~2 days)
I'll add the ability to search for and rent a variety of spaceships based on the user's rental location. An image and a description of each ship will be available. Payment will be made using a Galactic Monetary Account. If they do not have one, a new account will be opened for them through PuddleJumper's galactic banking division.

[Details][phase-four]

### Phase 5: Lodging Search and reservation (~2 days)
I'll add the ability to search for and book a room based on the user's destination location. An image and other user reviews will be available. Payment will be made using a Galactic Monetary Account. If they do not have one, a new account will be opened for them through PuddleJumper's galactic banking division.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Gate Search by Stargate glyph through interactive DHD
- [ ] "Write Review" feature for spaceship rentals/lodging
- [ ] Destination packages for popular planets (like Kayak has below the search form)


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
