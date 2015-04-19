class TripItinerary < ActiveRecord::Base
  belongs_to :trip
  belongs_to :itinerary
end
