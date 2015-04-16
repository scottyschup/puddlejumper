# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email           :string
#  password_digest :string
#  session_token   :string
#  sgtid           :string
#  clearance       :integer          default(4)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates_presence_of :name, :sgtid
  validates :password, length: {minimum: 6, allow_nil: true }

  attr_reader :password

  has_and_belongs_to_many(:companions,
    join_table: :companionships,
    foreign_key: :primary_id,
    association_foreign_key: :companion_id
  )

  has_and_belongs_to_many :itineraries

end
