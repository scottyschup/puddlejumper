# == Schema Information
#
# Table name: companionships
#
#  id           :integer          not null, primary key
#  traveler_id  :integer          not null
#  itinerary_id :integer          not null
#

class Companionship < ActiveRecord::Base
  belongs_to :traveler
  belongs_to :itinerary
end
