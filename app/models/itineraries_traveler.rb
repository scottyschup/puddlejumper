# == Schema Information
#
# Table name: itineraries_travelers
#
#  traveler_id  :integer          not null
#  itinerary_id :integer          not null
#

class ItinerariesTraveler < ActiveRecord::Base
  belongs_to :traveler
  belongs_to :itinerary
end
