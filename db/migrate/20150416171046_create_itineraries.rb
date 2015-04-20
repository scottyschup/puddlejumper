class CreateItineraries < ActiveRecord::Migration
  def change
    create_table :itineraries do |t|
      t.integer :traveler_id
      t.integer :itinerary_traveler_id
      t.integer :trip_itinerary_id

      t.timestamps null: false
    end

    add_index :itineraries, :traveler_id
  end
end
