class CreateGates < ActiveRecord::Migration
  def change
    create_table :gates do |t|
      t.string :address, null: false
      t.integer :planet_id, null: false

      t.timestamps null: false
    end
    add_index :gates, :address
    add_index :gates, :planet_id
  end
end
