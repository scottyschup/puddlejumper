# == Schema Information
#
# Table name: itineraries
#
#  id           :integer          not null, primary key
#  traveler_id  :integer          not null
#  departure_id :integer          not null
#  arrival_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Itinerary < ActiveRecord::Base
  validates_associated :traveler, :departure, :arrival

  belongs_to :traveler
  belongs_to :departure, class_name: :Trip, foreign_key: :departure_id
  belongs_to :arrival, class_name: :Trip, foreign_key: :arrival_id

  has_many :companionships, inverse_of: :itinerary
  has_many(
    :companions,
    through: :companionships,
    class_name: "Traveler",
    source: :traveler
  )

  accepts_nested_attributes_for :companions
  accepts_nested_attributes_for :traveler

  def traveler_attributes=(trav_attrs)
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

  def companions_attrs=(comp_attrs)
    comp_attrs.length.times do |i|
      this_companion = Traveler.where({ name: comp_attrs[i.to_s][:name] })
                               .first_or_create!
      this_companion.update(comp_attrs[i.to_s])
      self.companions << this_companion
    end

  end
end
