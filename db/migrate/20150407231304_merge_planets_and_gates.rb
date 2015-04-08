class MergePlanetsAndGates < ActiveRecord::Migration
  def up
    drop_table :gates
    add_column :planets, :gate_address, :string, null: false,
                                                 default: "0-0-0-0-0-0"
  end

  def down
    create_table :gates do |t|
      t.string :address, null: false
      t.integer :planet_id, null: false

      t.timestamps null: false
    end
    add_index :gates, :address
    add_index :gates, :planet_id

    remove_column :planets, :gate_address
  end
end
