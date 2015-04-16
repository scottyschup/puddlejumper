# == Schema Information
#
# Table name: trips
#
#  id              :integer          not null, primary key
#  origin_id       :integer
#  destination_id  :integer
#  remaining_space :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  datetime        :datetime
#

class Trip < ActiveRecord::Base
  validates_presence_of :origin_id, :destination_id

  belongs_to :origin, class_name: :Planet, foreign_key: :origin_id
  belongs_to :destination, class_name: :Planet, foreign_key: :destination_id

  has_and_belongs_to_many :itineraries
end
