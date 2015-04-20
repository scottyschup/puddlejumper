class ItineraryTraveler < ActiveRecord::Base
  belongs_to :traveler
  belongs_to :itinerary
end
