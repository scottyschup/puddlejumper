class CreateGateTrips < ActiveRecord::Migration
  def change
    create_table :gate_trips do |t|
      t.integer :origin_id
      t.integer :destination_id
      t.integer :max_travelers

      t.timestamps null: false
    end
    add_index :gate_trips, :origin_id
    add_index :gate_trips, :destination_id
    add_index :gate_trips, [:origin_id, :destination_id]
  end
end
