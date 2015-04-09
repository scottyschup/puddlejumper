# == Schema Information
#
# Table name: planets
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  desc         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  galaxy       :string           not null
#  race         :string
#  protected    :boolean          default(FALSE)
#  clearance    :integer          not null
#  gate_address :string           default("0-0-0-0-0-0"), not null
#  alias        :string
#

class Planet < ActiveRecord::Base
  validates_presence_of :name, :galaxy, :clearance, :gate_address
  validates_uniqueness_of :name

  has_many :departures, class_name: :Trip, foreign_key: :origin_id
  has_many :arrivals, class_name: :Trip, foreign_key: :destination_id

  def departures_to(other_planet)
    departures.where("destination_id = #{other_planet.id}")
  end

  def arrivals_from(other_planet)
    arrivals.where("origin_id = #{other_planet.id}")
  end
end
