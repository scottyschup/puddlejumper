class CreateItineraries < ActiveRecord::Migration
  def change
    create_table :itineraries do |t|
      t.integer :traveler_itinerary_id, null: false
      t.integer :trip_itinerary_id, null: false

      t.timestamps null: false
    end
  end
end
