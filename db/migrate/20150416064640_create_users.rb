class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null: false, index: true
      t.string :email
      t.string :password_digest, index: true
      t.string :session_token, nidex: true
      t.string :sgtid, index: { unique: true }
      t.integer :clearance, default: 4

      t.timestamps null: false
    end
  end
end
