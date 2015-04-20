# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150416171159) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companionships", force: :cascade do |t|
    t.integer  "reserver_id",  null: false
    t.integer  "companion_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "companionships", ["companion_id"], name: "index_companionships_on_companion_id", using: :btree
  add_index "companionships", ["reserver_id"], name: "index_companionships_on_reserver_id", using: :btree

  create_table "itineraries", force: :cascade do |t|
    t.integer  "traveler_itinerary_id", null: false
    t.integer  "trip_itinerary_id",     null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "planets", force: :cascade do |t|
    t.string   "name",                                 null: false
    t.string   "desc"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "galaxy",                               null: false
    t.string   "race"
    t.boolean  "protected",    default: false
    t.integer  "clearance",                            null: false
    t.string   "gate_address", default: "0-0-0-0-0-0", null: false
    t.string   "alias"
  end

  add_index "planets", ["alias"], name: "index_planets_on_alias", using: :btree
  add_index "planets", ["clearance"], name: "index_planets_on_clearance", using: :btree
  add_index "planets", ["name"], name: "index_planets_on_name", using: :btree

  create_table "traveler_itinerary", force: :cascade do |t|
    t.integer  "traveler_id",  null: false
    t.integer  "itinerary_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "traveler_itinerary", ["itinerary_id"], name: "index_traveler_itinerary_on_itinerary_id", using: :btree
  add_index "traveler_itinerary", ["traveler_id"], name: "index_traveler_itinerary_on_traveler_id", using: :btree

  create_table "travelers", force: :cascade do |t|
    t.string   "name",                   null: false
    t.string   "email"
    t.string   "sgtid"
    t.integer  "clearance",  default: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "travelers", ["name"], name: "index_travelers_on_name", using: :btree
  add_index "travelers", ["sgtid"], name: "index_travelers_on_sgtid", unique: true, using: :btree

  create_table "trip_itinerary", force: :cascade do |t|
    t.integer  "trip_id",      null: false
    t.integer  "itinerary_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "trip_itinerary", ["itinerary_id"], name: "index_trip_itinerary_on_itinerary_id", using: :btree
  add_index "trip_itinerary", ["trip_id"], name: "index_trip_itinerary_on_trip_id", using: :btree

  create_table "trips", force: :cascade do |t|
    t.integer  "origin_id"
    t.integer  "destination_id"
    t.integer  "remaining_space"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.datetime "datetime",        null: false
  end

  add_index "trips", ["destination_id"], name: "index_trips_on_destination_id", using: :btree
  add_index "trips", ["origin_id", "destination_id"], name: "index_trips_on_origin_id_and_destination_id", using: :btree
  add_index "trips", ["origin_id"], name: "index_trips_on_origin_id", using: :btree

end
