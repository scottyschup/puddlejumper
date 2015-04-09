class SplitDatetimeToDateAndTime < ActiveRecord::Migration
  def up
    remove_column :trips, :datetime
    add_column :trips, :trip_date, :date
    add_column :trips, :trip_time, :time
    add_index :trips, :trip_date
    add_index :trips, :trip_time
  end

  def down
    remove_column :trips, :trip_date
    remove_column :trips, :trip_time
    add_column :trips, :datetime, :datetime
    add_index :trips, :datetime
  end
end
