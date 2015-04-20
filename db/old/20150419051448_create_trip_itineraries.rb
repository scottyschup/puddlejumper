class CreateTripItineraries < ActiveRecord::Migration
  def change
    create_table :trip_itineraries do |t|
      t.belongs_to :trip, index: true, null: false
      t.belongs_to :itinerary, index: true, null: false

      t.timestamps null: false
    end
    add_foreign_key :trip_itineraries, :trips
    add_foreign_key :trip_itineraries, :itineraries
  end
end
