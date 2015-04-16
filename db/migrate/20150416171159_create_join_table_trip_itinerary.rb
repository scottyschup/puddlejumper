class CreateJoinTableTripItinerary < ActiveRecord::Migration
  def change
    create_table :tripitinerary do |t|
      t.integer :trip_id, null: false, index: true
      t.integer :itinerary_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
