# Phase 2:Search form for gate travel

## Rails
### Models
* Gate
* GateTrip
* Planet

### Controllers
* Api::GateTripsController (index, show)
* Api::GatesController (index)
* Api::PlanetsController (index, show)

### Views
* .json.jbuilder for indices and shows

## Backbone
### Models
* Planet
* Gate
* GateTrip

### Collections
* Planets
* Gates
* GateTrips

### Views
* Travel/SearchForm
* Travel/SearchResults

## Gems/Libraries
* serializeJSON
