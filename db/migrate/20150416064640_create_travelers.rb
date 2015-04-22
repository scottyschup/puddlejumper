class CreateTravelers < ActiveRecord::Migration
  def change
    create_table :travelers do |t|
      t.string :name, null: false, index: true
      t.string :email
      t.string :sgtid
      t.integer :clearance, default: 4

      t.timestamps null: false
    end
  end
end
