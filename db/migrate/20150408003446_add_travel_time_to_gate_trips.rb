class AddTravelTimeToGateTrips < ActiveRecord::Migration
  def change
    add_column :gate_trips, :datetime, :datetime, null: false
  end
end
