# == Schema Information
#
# Table name: itineraries
#
#  id                      :integer          not null, primary key
#  traveler_id             :integer          not null
#  departure_id            :integer          not null
#  arrival_id              :integer
#  itineraries_traveler_id :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#

class Itinerary < ActiveRecord::Base
  belongs_to :traveler
  belongs_to :departure, class_name: :Trip, foreign_key: :departure_id
  belongs_to :arrival, class_name: :Trip, foreign_key: :arrival_id

  # has_and_belongs_to_many :companions, class_name: 'Traveler', foreign_key: :itineraries_traveler_id
  has_many :itineraries_travelers
  has_many(
    :companions,
    through: :itineraries_travelers,
    source: :traveler
  )

  def traveler_attrs=(trav_attrs)
    self.traveler = Traveler.where({ name: trav_attrs[:name] })
                            .first_or_create
    self.traveler.update(trav_attrs)
  end

  def departure_id=(dep_id)
    self.departure = Trip.find(dep_id)
  end

  def arrival_id=(arr_id)
    self.arrival = Trip.find(arr_id)
  end

  def companion_attrs=(comp_attrs)
    self.companions ||= []
    comp_attrs.each do |c_attrs|
      this_companion = Traveler.where({ name: c_attrs[:name] })
                               .first_or_create
      if this_companion.update(c_attrs)
        self.companions << this_companion
      end
    end
  end
end
