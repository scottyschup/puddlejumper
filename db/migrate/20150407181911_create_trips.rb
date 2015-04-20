class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.integer :origin_id, null: false
      t.integer :destination_id, null: false
      t.integer :remaining_space
      t.datetime :datetime, null: false

      t.timestamps null: false
    end
    add_index :trips, :origin_id
    add_index :trips, :destination_id
    add_index :trips, [:origin_id, :destination_id]
  end
end
