# == Schema Information
#
# Table name: itineraries
#
#  id                    :integer          not null, primary key
#  traveler_id           :integer          not null
#  itinerary_traveler_id :integer          not null
#  trip_itinerary_id     :integer          not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Itinerary < ActiveRecord::Base
  belongs_to :traveler
  # has_and_belongs_to_many :trips
  # has_and_belongs_to_many :travelers
  #
  # accepts_nested_attributes_for :travelers
  # accepts_nested_attributes_for :trips
  # accepts_nested_attributes_for :traveler

  def traveler_attributes=(t_attrs)
    self.traveler = Traveler.where(t_attrs).first_or_create
  end

  def departure_id=(id_attrs)
    self.departure = Trip.where(id_attrs).first_or_create
  end


end
