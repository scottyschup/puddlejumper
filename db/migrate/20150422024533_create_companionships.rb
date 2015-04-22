class CreateCompanionships < ActiveRecord::Migration
  def change
    create_table :companionships do |t|
      t.integer :traveler_id, null: false
      t.integer :itinerary_id, null: false
    end
    add_index :companionships, :traveler_id
    add_index :companionships, :itinerary_id
  end
end
