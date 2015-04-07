# == Schema Information
#
# Table name: planets
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  desc       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  galaxy     :string           not null
#  race       :string
#  protected  :boolean          default(FALSE)
#  clearance  :integer          not null
#

require 'test_helper'

class PlanetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
