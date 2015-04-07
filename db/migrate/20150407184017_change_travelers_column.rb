class ChangeTravelersColumn < ActiveRecord::Migration
  def change
    rename_column :gate_trips, :max_travelers, :remaining_space
  end
end
