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
  before_save :assign_new_sgtid
  validates_presence_of :name, :sgtid
  validates :password, length: {minimum: 6, allow_nil: true }

  attr_reader :password

  has_and_belongs_to_many(:companions,
    join_table: :companionships,
    foreign_key: :reserver_id,
    association_foreign_key: :companion_id
  )

  has_and_belongs_to_many :itineraries

  def assign_new_sgtid
    self.sgtid ||= SecureRandom.urlsafe_base64(10)
  end

end
