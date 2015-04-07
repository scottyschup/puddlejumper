# == Schema Information
#
# Table name: gates
#
#  id         :integer          not null, primary key
#  address    :string           not null
#  planet_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class GateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
