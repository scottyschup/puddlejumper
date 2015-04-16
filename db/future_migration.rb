
    create_table :companionships do |t|
      t.integer :primary_id
      t.integer :companion_id

      t.timestamps null: false
    end

    add_index :companionships, :primary_id
    add_index :companionships, :companion_id

    create_table :itineraries do |t|
      t.integer :user_id, null: false
      t.integer :trip_id, null: false

      t.timestamps null: false
    end

    add_index :itineraries, :user_id
    add_index :itineraries, :trip_id

    create_table :users_itineraries do |t|
      t.belongs_to :user, index: true
      t.belongs_to :itinerary, index: true
    end

    create_table :trips_itineraries do |t|
      t.belongs_to :trip, index: true
      t.belongs_to :itinerary, index: true
    end
    
