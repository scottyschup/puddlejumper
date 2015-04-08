class ChangeGateTripsToTrips < ActiveRecord::Migration
  def change
    rename_table :gate_trips, :trips
  end
end
