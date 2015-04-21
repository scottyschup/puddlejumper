class CreateJoinTableTravelerItinerary < ActiveRecord::Migration
  def change
    create_join_table :travelers, :itineraries do |t|
      t.index [:traveler_id, :itinerary_id]
      t.index [:itinerary_id, :traveler_id]
    end
  end
end
