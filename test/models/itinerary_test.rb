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

require 'test_helper'

class ItineraryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
