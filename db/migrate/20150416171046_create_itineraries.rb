class CreateItineraries < ActiveRecord::Migration
  def change
    create_table :itineraries do |t|
      t.integer :traveler_id, null: false
      t.integer :departure_id, null: false
      t.integer :arrival_id
      t.integer :itineraries_traveler_id, index: true

      t.timestamps null: false
    end
  end
end
