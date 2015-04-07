class CreatePlanets < ActiveRecord::Migration
  def change
    create_table :planets do |t|
      t.string :name, null: false
      t.string :desc

      t.timestamps null: false
    end
    add_index :planets, :name
  end
end
