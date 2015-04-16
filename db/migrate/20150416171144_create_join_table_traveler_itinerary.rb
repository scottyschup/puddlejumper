class CreateJoinTableTravelerItinerary < ActiveRecord::Migration
  def change
    create_table :traveler_itinerary do |t|
      t.integer :traveler_id, null: false, index: true
      t.integer :itinerary_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
