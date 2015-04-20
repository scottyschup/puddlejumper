class CreateItineraryTraveler < ActiveRecord::Migration
  def change
    create_table :itinerary_travelers do |t|
      t.integer :traveler_id
      t.integer :itinerary_id
    end
    add_index :itinerary_travelers, :traveler_id
    add_index :itinerary_travelers, :itinerary_id
  end
end
