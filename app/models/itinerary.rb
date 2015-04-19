# == Schema Information
#
# Table name: itineraries
#
#  id                    :integer          not null, primary key
#  traveler_itinerary_id :integer          not null
#  trip_itinerary_id     :integer          not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Itinerary < ActiveRecord::Base
  has_many :travelers, through: :traveler
  has_and_belongs_to_many :trips

  accepts_nested_attributes_for :travelers
  accepts_nested_attributes_fot :trips
end
