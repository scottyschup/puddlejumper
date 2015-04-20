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
  belongs_to :traveler

  def travelers=(traveler_params)
  end
end
