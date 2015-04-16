class CreateCompanionships < ActiveRecord::Migration
  def change
    create_table :companionships do |t|
      t.integer :reserver_id, null: false, index: true
      t.integer :companion_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
