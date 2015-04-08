class AddAliasColToPlanets < ActiveRecord::Migration
  def change
    add_column :planets, :alias, :string
    add_index :planets, :alias
  end
end
