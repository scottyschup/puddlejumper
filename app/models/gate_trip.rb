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
#  datetime        :datetime         not null
#

class GateTrip < ActiveRecord::Base
  validates_presence_of :origin_id, :destination_id

  belongs_to :origin, class_name: :Gate, foreign_key: :origin_id
  belongs_to :destination, class_name: :Gate, foreign_key: :destination_id
end
