class CreatePlanets < ActiveRecord::Migration
  def change
    create_table :planets do |t|
      t.string :name, null: false
      t.string :alias
      t.string :desc
      t.string :gate_address, null: false, default: "0-0-0-0-0-0"
      t.string :galaxy, null: false
      t.string :race
      t.boolean :protected, default: false
      t.integer :clearance, null: false
      
      t.timestamps null: false
    end
    add_index :planets, :name
    add_index :planets, :alias
    add_index :planets, :clearance
  end
end
