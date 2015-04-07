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

class Planet < ActiveRecord::Base
  validates_presence_of :name, :galaxy, :clearance
  validates_uniqueness_of :name

  has_one :gate
end
