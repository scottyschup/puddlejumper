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

class Gate < ActiveRecord::Base
  validates_presence_of :address, :planet_id
  
  belongs_to :planet
  has_many :trips_to, class_name: :GateTrip, foreign_key: :destination_id
  has_many :trips_from, class_name: :GateTrip, foreign_key: :origin_id
end
