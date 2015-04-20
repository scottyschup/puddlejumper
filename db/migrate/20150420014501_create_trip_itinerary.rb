class CreateTripItinerary < ActiveRecord::Migration
  def change
    create_table :trip_itineraries do |t|
      t.integer :trip_id
      t.integer :itinerary_id
    end
    add_index :trip_itineraries, :trip_id
    add_index :trip_itineraries, :itinerary_id
  end
end
