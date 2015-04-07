# == Schema Information
#
# Table name: gate_trips
#
#  id              :integer          not null, primary key
#  origin_id       :integer
#  destination_id  :integer
#  remaining_space :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class GateTripTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
