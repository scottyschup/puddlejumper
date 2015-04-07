class AddColumnsToPlanets < ActiveRecord::Migration
  def change
    add_column :planets, :galaxy, :string, null: false
    add_column :planets, :race, :string
    add_column :planets, :protected, :boolean, default: false
    add_column :planets, :clearance, :integer, null: false
    add_index :planets, :clearance
  end
end
