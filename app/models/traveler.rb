# == Schema Information
#
# Table name: travelers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  email      :string
#  sgtid      :string
#  clearance  :integer          default(4)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Traveler < ActiveRecord::Base
  before_validation :ensure_sgtid
  validates_presence_of :name, :sgtid

  has_many :itineraries

  def ensure_sgtid
    self.sgtid ||= SecureRandom.urlsafe_base64(10)
  end

end
